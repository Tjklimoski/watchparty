import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";

export const config: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'your Email and Password',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        // Logic to take the credentials that were submitted and return either:
        // 1. a user object representing the user
        // 2. fasle/null if credentials are invalid
        return null;
      }
    }),
    GoogleProvider({
      id: 'google',
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    FacebookProvider({
      id: 'facebook',
      clientId: process.env.FB_APP_ID ?? '',
      clientSecret: process.env.FB_APP_SECRET ?? '',
    }),
    GitHubProvider({
      id: 'github',
      clientId: process.env.GH_CLIENT_ID ?? '',
      clientSecret: process.env.GH_CLIENT_SECRET ?? '',
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth',
    error: '/auth',
  },
  debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(config)

export { handler as GET, handler as POST }

"use server";

import { getServerSession } from "next-auth";
import { config } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { User } from "@/types";

// Return the logged in user, or null if not logged in
export default async function auth() {
  // session contains name, email, & image fields by default from nextAuth.
  const session = await getServerSession(config);
  const email = session?.user?.email;

  if (!email) return null;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) return null;

  return user;
}

export async function getIsAuth() {
  const user = await auth();
  return !!user;
}

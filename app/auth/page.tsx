// is handling the errors returned by NextAuth too.
// will be sent as a url query param:
// ex. http://localhost:3000/auth?error=Configuration
// Read what values can be sent for error here: https://next-auth.js.org/configuration/pages
// Setup this page to handle both user sign in and sign up, along with handling errors being sent back by next auth.
// Also use url query params to determine if coming for sign in or sign up.
// for credential login, will need to pass a csrf Token with the login info: https://next-auth.js.org/configuration/pages

"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";
import OAuthProviderBtn from "@/components/OAuthProviderBtn";
import PageContainer from "@/components/PageContainer";
import PrimaryBtn from "@/components/PrimaryBtn";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Input from "@/components/Input";
import axios from "axios";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(() => {
    // values returned by searchParams are all strings
    if (searchParams.get("signin") === "true") return true;
    return false;
  });

  // update isSignin if searchParams change
  useEffect(() => {
    setIsSignIn(() => {
      if (searchParams.get("signin") === "true") return true;
      return false;
    });
  }, [searchParams]);

  async function login(e: FormEvent) {
    e.preventDefault();
    console.log("event: ", e);

    try {
      // await signIn('credentials')
    } catch (err) {
      console.log("Login Error: ", err);
    }
  }

  async function register(e: FormEvent) {
    e.preventDefault();

    try {
      if (!email || !password || !confirmPassword)
        throw new Error(
          "Requested information missing, please fill out all fields"
        );

      if (password !== confirmPassword)
        throw new Error("Passwords do not match");

      if (password.length <= 5)
        throw new Error("Password must be longer than 5 characters");

      const newUser = await axios.post("/api/register", {
        email,
        password,
      });

      // user succefully registered, start login automatically
      return login(e);
    } catch (err) {
      // err can be a standard Error, or an Axios Error.
      // Get these error messages to the user
      console.log("Register Error: ", err);
      // err.response.data.error
    }
  }

  return (
    <PageContainer styles="-mt-20 sm:-mt-24 h-screen">
      <div className="h-full grid place-items-center">
        {/* margin top on this div to prevent it from going behind the navbar on smaller screens */}
        <div className="bg-base-100 bg-opacity-80 backdrop-blur-md w-full md:w-2/3 lg:w-1/2 rounded-lg py-4 sm:py-8 px-5 sm:px-10 shadow-primary/10 shadow-2xl max-w-xl mt-20 sm:mt-24">
          <h2 className="font-semibold text-3xl sm:text-5xl text-center">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h2>
          <form
            className="flex flex-col gap-4 my-6 sm:my-10"
            onSubmit={isSignIn ? login : register}
          >
            <Input
              label="Email"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <Input
              label="Password"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            {!isSignIn && (
              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                required={!isSignIn}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            )}
            <PrimaryBtn type="submit">
              {isSignIn ? "Sign In" : "Sign Up"}
            </PrimaryBtn>
          </form>
          <hr className="border-secondary" />
          <div className="flex flex-col items-center justify-center gap-2 my-6 sm:my-10">
            <OAuthProviderBtn provider="Google" />
            <OAuthProviderBtn provider="Facebook" />
            <OAuthProviderBtn provider="Github" />
          </div>
          <div className="mt-6 sm:mt-10 text-center text-sm sm:text-md">
            {isSignIn ? (
              <p>
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth?signin=false"
                  className="underline text-primary hover:text-primary/90"
                >
                  Sign up
                </Link>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <Link
                  href="/auth?signin=true"
                  className="underline text-primary hover:text-primary/90"
                >
                  Sign in
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

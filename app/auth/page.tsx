// errors sent by NextAuth will be sent as a URL query param:
// ex. http://localhost:3000/auth?error=Configuration
// The values that can be sent for error: https://next-auth.js.org/configuration/pages

// This page handles both user sign in & sign up
// Also use url query params to determine if coming for sign in or sign up.

"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";
import OAuthProviderBtn from "@/components/util/OAuthProviderBtn";
import Container from "@/components/util/Container";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Input from "@/components/form/Input";
import { API } from "@/lib/APIFetcher";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(() => searchParams.has("error"));
  const [errorMsg, setErrorMsg] = useState(
    () => searchParams.get("error") ?? ""
  );
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

  const login = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(false);

      const signedIn = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/media",
      });
      // errors thrown in signIn redirect the user to the
      // auth page with an added 'error' url search param

      if (signedIn) setLoading(false);
    },
    [email, password]
  );

  const register = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(false);

      try {
        if (!email || !password || !confirmPassword)
          throw new Error(
            "Requested information missing, please fill out all fields"
          );

        if (password !== confirmPassword)
          throw new Error("Passwords do not match");

        if (password.length <= 5)
          throw new Error("Password must be longer than 5 characters");

        API;
        await API.post("/auth/register", {
          email,
          password,
        })
          .then(res => res.data)
          .catch(error => {
            throw new Error(error.response.data);
          });

        // user succefully registered, start login automatically
        login(e);
      } catch (err: Error | any) {
        setError(true);
        if (err?.message !== undefined) {
          setErrorMsg(err.message);
        } else {
          setErrorMsg("Error, try again");
        }
        setLoading(false);
      }
    },
    [email, password, confirmPassword, login]
  );

  return (
    <main className="-mt-16 sm:-mt-20">
      <Container>
        <div className="min-h-screen grid place-items-center">
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
                onChange={e => setEmail(e.target.value)}
                value={email}
                required
                disabled={loading}
              />
              <Input
                label="Password"
                type="password"
                name="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                required
                disabled={loading}
              />
              {!isSignIn && (
                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  required={!isSignIn}
                  onChange={e => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  disabled={loading}
                />
              )}
              {error && (
                <p className="text-sm text-error transition duration-300">
                  {errorMsg}
                </p>
              )}
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner text-primary"></span>
                ) : isSignIn ? (
                  "Sign In"
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
            <hr className="border-secondary" />
            <div className="flex flex-col items-center justify-center gap-2 my-6 sm:my-10">
              <OAuthProviderBtn provider="Google" disabled={loading} />
              {/* <OAuthProviderBtn provider="Facebook" disabled={loading} /> */}
              <OAuthProviderBtn provider="Github" disabled={loading} />
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
      </Container>
    </main>
  );
}

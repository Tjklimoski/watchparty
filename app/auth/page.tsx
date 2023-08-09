// is handling the errors returned by NextAuth too.
// will be sent as a url query param:
// ex. http://localhost:3000/auth?error=Configuration
// Read what values can be sent for error here: https://next-auth.js.org/configuration/pages
// Setup this page to handle both user sign in and sign up, along with handling errors being sent back by next auth.
// Also use url query params to determine if coming for sign in or sign up.
// for credential login, will need to pass a csrf Token with the login info: https://next-auth.js.org/configuration/pages

"use client";

import PageContainer from "@/components/PageContainer";
import PrimaryBtn from "@/components/PrimaryBtn";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthPage() {
  const searchParams = useSearchParams();
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

  return (
    <PageContainer styles="-mt-20 sm:-mt-24 h-screen border border-cyan-400">
      <div className="h-full grid place-items-center">
        <div className="bg-base-100 bg-opacity-80 backdrop-blur-md z-20 w-full md:w-2/3 lg:w-1/2 rounded-lg py-8 px-10">
          <h2 className="mb-4 font-semibold text-5xl">Sign In</h2>
          <form className="flex flex-col gap-2">
            <input type="email" placeholder="Email"></input>
            <input type="password" placeholder="Password"></input>
            <PrimaryBtn type="submit">Sign In</PrimaryBtn>
          </form>
        </div>
      </div>
    </PageContainer>
  );
}

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
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import OAuthProviderBtn from "@/components/OAuthProviderBtn";

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
    <PageContainer styles="-mt-20 sm:-mt-24 h-screen">
      <div className="h-full grid place-items-center">
        <div className="bg-base-100 bg-opacity-80 backdrop-blur-md z-20 w-full md:w-2/3 lg:w-1/2 rounded-lg py-8 px-10 shadow-primary/10 shadow-2xl">
          <h2 className="font-semibold text-5xl text-center">Sign In</h2>
          <form className="flex flex-col gap-4 my-10">
            <label htmlFor="Email" className="sr-only">
              Email:
            </label>
            <input
              className="bg-neutral text-xl rounded-md px-6 py-3 focus:outline outline-primary outline-offset-0 outline-2"
              id="Email"
              type="email"
              placeholder="Email"
              required
            ></input>
            <label htmlFor="Password" className="sr-only">
              Password:
            </label>
            <input
              className="bg-neutral text-xl rounded-md px-6 py-3 focus:outline outline-primary outline-offset-0 outline-2"
              id="Password"
              type="password"
              placeholder="Password"
              required
            ></input>
            <PrimaryBtn type="submit">Sign In</PrimaryBtn>
          </form>
          <hr className="border-secondary" />
          <div className="flex flex-col items-center justify-center gap-2 mt-10">
            <OAuthProviderBtn provider="Google" />
            <OAuthProviderBtn provider="Facebook" />
            <OAuthProviderBtn provider="Github" />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

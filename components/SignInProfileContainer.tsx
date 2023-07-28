"use client";

import { useState } from "react";
import PrimaryBtn from "./PrimaryBtn";
import AccentBtn from "./AccentBtn";
import NavbarProfileContainer from "./NavbarProfileContainer";

export default function SignInProfileContainer() {
  // temporary - to see the changes on the apge
  const [isAuth, setIsAuth] = useState(false);

  function login() {
    setIsAuth(true);
  }

  // Sign in & sign up button if logged out
  // Profile avatar and profile menu if logged in
  return (
    <>
      {isAuth ? (
        <NavbarProfileContainer />
      ) : (
        // ml-auto in order to keep auth buttons on the right of navbar
        // since user isn't authenticated, main menu will not be present
        <div className="flex gap-2 items-center ml-auto">
          <PrimaryBtn onClick={login}>Sign In</PrimaryBtn>
          <AccentBtn>Sign Up</AccentBtn>
        </div>
      )}
    </>
  );
}

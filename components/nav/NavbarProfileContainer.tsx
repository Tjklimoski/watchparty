"use client";

import useUser from "@/hooks/useUser";
import ProfileIcon from "../util/ProfileIcon";
import ProfileMenu from "./ProfileMenu";
import { useState } from "react";

export default function NavbarProfileContainer() {
  const [isOpen, setIsOpen] = useState(false);
  // Fetch current user data to pass user id to ProfileIcon
  const { user } = useUser();

  function toggleOpen() {
    setIsOpen(current => !current);
  }

  // set ProfileMenu to close if loses focus
  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div onBlur={closeMenu} className="flex gap-2 items-center group relative">
      <button
        onClick={isOpen ? closeMenu : toggleOpen}
        className="grid place-items-center rounded-full group-hover:ring group-focus-within:ring ring-primary ring-offset-base-100 ring-offset-2"
        aria-controls="profile-menu"
        aria-label="Profile Menu"
        aria-expanded={isOpen}
      >
        <ProfileIcon id={user?.id} />
      </button>

      <div
        id="profile-menu"
        className={`bg-neutral rounded-md group-hover:cursor-default absolute right-0 top-full mt-5 z-30 transistion duration-100 scale-0 origin-top-right focus-within:scale-100 ${
          isOpen ? "scale-100" : ""
        }`}
      >
        <ProfileMenu />
      </div>
    </div>
  );
}

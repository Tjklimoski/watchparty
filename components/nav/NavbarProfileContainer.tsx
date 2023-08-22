"use client";

import ProfileIcon from "../util/ProfileIcon";
import ProfileMenu from "./ProfileMenu";
import { useState } from "react";

export default function NavbarProfileContainer() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    setIsOpen((current) => !current);
  }

  // set ProfileMenu to close if loses focus
  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div onBlur={closeMenu} className="flex gap-2 items-center group relative">
      <button
        onClick={toggleOpen}
        className="grid place-items-center rounded-full group-hover:ring group-focus-within:ring ring-primary ring-offset-base-100 ring-offset-2"
      >
        <ProfileIcon />
      </button>

      <div
        className={`bg-neutral rounded-md group-hover:cursor-default absolute right-0 top-full mt-5 z-30 transistion duration-100 scale-0 origin-top-right ${
          isOpen ? "scale-100" : ""
        }`}
      >
        <ProfileMenu size="lg" />
      </div>
    </div>
  );
}

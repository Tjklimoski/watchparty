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
    <div
      onClick={toggleOpen}
      onBlur={closeMenu}
      className="flex gap-2 items-center group hover:cursor-pointer outline-none relative"
      tabIndex={0}
    >
      <ProfileIcon />
      <div
        className={`bg-neutral rounded-md group-hover:cursor-default absolute right-0 top-full mt-5 z-30 transistion duration-100 scale-0 origin-top-right ${
          isOpen && "scale-100"
        }`}
      >
        <ProfileMenu size="lg" />
      </div>
    </div>
  );
}

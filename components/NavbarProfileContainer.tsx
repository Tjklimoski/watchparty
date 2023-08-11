"use client";

import { User } from "@/types";
import ProfileIcon from "./ProfileIcon";
import ProfileMenu from "./ProfileMenu";
import { useState } from "react";

interface NavbarProfileContainerProps {
  user: User;
}

export default function NavbarProfileContainer({
  user,
}: NavbarProfileContainerProps) {
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
      <ProfileIcon user={user} />
      {/* Pass isOpen value as prop to trigger transition on ProfileMenu */}
      <div
        className={`bg-neutral rounded-md group-hover:cursor-default absolute right-0 top-full mt-3 z-30 transistion duration-100 scale-0 origin-top-right ${
          isOpen && "scale-100"
        }`}
      >
        <ProfileMenu />
      </div>
    </div>
  );
}

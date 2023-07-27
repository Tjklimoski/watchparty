"use client";

import { BsFillCaretDownFill } from "react-icons/bs";
import ProfileIcon from "./ProfileIcon";
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
      <BsFillCaretDownFill className={`transition ${isOpen && "rotate-180"}`} />
      <ProfileIcon />
      {/* Pass isOpen value as prop to trigger transition on ProfileMenu */}
      <ProfileMenu show={isOpen} />
    </div>
  );
}

"use client";

import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import ProfileIcon from "./ProfileIcon";
import ProfileMenu from "./ProfileMenu";
import MainMenu from "./MainMenu";
import PrimaryBtn from "./PrimaryBtn";
import AccentBtn from "./AccentBtn";
import { useState } from "react";
import AuthBtns from "./AuthBtns";
import { User } from "@/types";

interface MobileMenuProps {
  isAuth: boolean;
  user: User;
}

export default function MobileMenu({ isAuth, user }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    setIsOpen((current) => !current);
  }

  return (
    <>
      <div onClick={toggleOpen} className="hover:cursor-pointer z-30">
        {isOpen ? (
          <IoClose size={40} className="w-6 h-6 sm:w-10 sm:h-10" />
        ) : (
          <FiMenu size={40} className="w-6 h-6 sm:w-10 sm:h-10" />
        )}
      </div>

      {/* Container that slides out */}
      <div
        className={`absolute top-20 sm:top-24 right-0 pt-1 z-20 transition duration-300  ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="w-full h-full bg-base-100 bg-opacity-75 backdrop-blur-md rounded-s-xl flex flex-col items-center p-4">
          {isAuth ? (
            <>
              <div className="p-2 bg-neutral rounded-md flex flex-col items-center">
                <ProfileIcon user={user} />
                <ProfileMenu />
              </div>
              <div className="w-full">
                <MainMenu />
              </div>
            </>
          ) : (
            <div className="flex gap-2 items-center">
              <AuthBtns />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

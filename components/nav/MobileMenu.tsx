"use client";

import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import ProfileIcon from "../util/ProfileIcon";
import ProfileMenu from "./ProfileMenu";
import MainMenu from "./MainMenu";
import { useState } from "react";
import AuthBtns from "./AuthBtns";
import useUser from "@/hooks/useUser";

interface MobileMenuProps {
  isAuth: boolean;
}

export default function MobileMenu({ isAuth }: MobileMenuProps) {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  function toggleOpen() {
    setIsOpen(current => !current);
  }

  return (
    <>
      <button
        onClick={toggleOpen}
        className="z-30"
        aria-label="full menu"
        aria-controls="mobile-menu"
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <IoClose size={40} className="w-6 h-6 sm:w-10 sm:h-10" />
        ) : (
          <FiMenu size={40} className="w-6 h-6 sm:w-10 sm:h-10" />
        )}
      </button>

      {/* Container that slides out */}
      <div
        id="mobile-menu"
        className={`absolute top-16 sm:top-20 right-0 pt-1 z-20 transition duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } `}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      >
        <div className="w-full h-full bg-base-100 bg-opacity-75 backdrop-blur-2xl rounded-l-xl flex flex-col items-center py-4 px-2">
          {isAuth ? (
            <>
              {/*  calculating width as 100%-1rem in order to have edges of div line up with hover on MainMenu items below. MainMenu has a class of 'menu' that adds a padding inline of .5rem */}
              <div className="p-2 bg-neutral rounded-md flex flex-col items-center w-[calc(100%-1rem)]">
                <ProfileIcon id={user?.id} />
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

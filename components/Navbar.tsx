import MainMenu from "./MainMenu";
import NavbarLogo from "./NavbarLogo";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import ProfileIcon from "./ProfileIcon";
import ProfileMenu from "./ProfileMenu";
import PrimaryBtn from "./PrimaryBtn";
import AccentBtn from "./AccentBtn";
import NavbarProfileContainer from "./NavbarProfileContainer";
import auth from "@/lib/authenticate";

export default async function Navbar() {
  const isAuth = await auth(true);

  return (
    <div className="fixed top-0 w-full max-w-screen-2xl h-20 sm:h-24 px-6 py-2 md:px-12 md:py-4 flex items-center gap-4 md:gap-6 bg-base-100 bg-opacity-75 backdrop-blur-md z-20">
      <NavbarLogo />

      {/* Menu container */}
      <div className="hidden lg:flex flex-1 justify-between items-center">
        {isAuth ? (
          <>
            <MainMenu />
            <NavbarProfileContainer />
          </>
        ) : (
          // ml-auto in order to keep auth buttons on the right of navbar
          // since user isn't authenticated, main menu will not be present
          <div className="flex gap-2 items-center ml-auto">
            {/* Pass link to direct user to /auth */}
            <PrimaryBtn>Sign In</PrimaryBtn>
            <AccentBtn>Sign Up</AccentBtn>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      <div className="lg:hidden ml-auto">
        <div className="hover:cursor-pointer z-30">
          {/* <FiMenu size={40} className="w-6 h-6 sm:w-10 sm:h-10" /> */}
          <IoClose size={40} className="w-6 h-6 sm:w-10 sm:h-10" />
        </div>
        {/* slide out container */}
        <div className="absolute top-20 sm:top-24 right-0 z-20 translate-x-0 transition duration-200 pt-1">
          <div className="w-full h-full bg-base-100 bg-opacity-75 backdrop-blur-md rounded-s-xl flex flex-col items-center p-4">
            {isAuth ? (
              <>
                <div className="p-2 bg-neutral rounded-md flex flex-col items-center">
                  <ProfileIcon />
                  <ProfileMenu />
                </div>
                <div className="w-full">
                  <MainMenu />
                </div>
              </>
            ) : (
              <div className="flex gap-2 items-center">
                {/* Pass link to direct user to /auth */}
                <PrimaryBtn>Sign In</PrimaryBtn>
                <AccentBtn>Sign Up</AccentBtn>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

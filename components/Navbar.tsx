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
import MobileMenu from "./MobileMenu";

export default async function Navbar() {
  const isAuth = await auth();

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
        <MobileMenu isAuth={isAuth} />
      </div>
    </div>
  );
}

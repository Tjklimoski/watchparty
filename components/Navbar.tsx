import PrimaryBtn from "./PrimaryBtn";
import AccentBtn from "./AccentBtn";
import MainMenu from "./MainMenu";
import Image from "next/image";
import NavbarProfileContainer from "./NavbarProfileContainer";
import SignInProfileContainer from "./SignInProfileContainer";
import NavbarLogo from "./NavbarLogo";

export default function Navbar() {
  return (
    <div className="fixed top-0 w-full max-w-screen-2xl h-24 px-6 py-2 md:px-12 md:py-4 flex items-center gap-4 md:gap-6 bg-base-100 bg-opacity-75 backdrop-blur-md z-20">
      <NavbarLogo />

      {/* Menu container */}
      <div className="flex flex-1 justify-between items-center">
        <MainMenu />
        <div className="ml-auto">
          <SignInProfileContainer />
        </div>
      </div>
    </div>
  );
}

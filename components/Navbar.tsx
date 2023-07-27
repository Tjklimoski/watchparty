import PrimaryBtn from "./PrimaryBtn";
import AccentBtn from "./AccentBtn";
import MainMenu from "./MainMenu";
import Image from "next/image";
import NavbarProfileContainer from "./NavbarProfileContainer";
import SignInProfileContainer from "./SignInProfileContainer";

export default function Navbar() {
  return (
    <div className="fixed top-0 w-full max-w-screen-2xl h-24 px-6 py-2 md:px-12 md:py-4 flex items-center gap-4 md:gap-6 bg-base-100 bg-opacity-75 backdrop-blur-md z-20">
      <div className="flex items-center gap-2 group/logo hover:cursor-pointer">
        <Image
          src="watchparty-logo.svg"
          alt="WatchParty Icon"
          height={40}
          width={40}
          priority
          className="object-contain bg-gradient-to-tr from-primary to-accent p-1 rounded-full transition rotate-0 scale-100 duration-500 group-hover/logo:rotate-12 group-hover/logo:scale-110"
        />
        <h1 className="text-4xl">
          Watch
          <span className="text-primary">Party</span>
        </h1>
      </div>

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

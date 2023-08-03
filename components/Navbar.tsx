import MainMenu from "./MainMenu";
import NavbarLogo from "./NavbarLogo";
import PrimaryBtn from "./PrimaryBtn";
import AccentBtn from "./AccentBtn";
import NavbarProfileContainer from "./NavbarProfileContainer";
import auth from "@/lib/authenticate";
import MobileMenu from "./MobileMenu";
import PageContainer from "./PageContainer";

export default async function Navbar() {
  const isAuth = await auth();

  return (
    <PageContainer
      type="nav"
      styles="sticky top-0 h-20 sm:h-24 bg-base-100 bg-opacity-75 backdrop-blur-md z-20"
    >
      <div className="flex items-center gap-4 md:gap-6">
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
            // because if a user isn't authenticated main menu will not be present
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
    </PageContainer>
  );
}

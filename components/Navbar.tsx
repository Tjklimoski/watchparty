import MainMenu from "./MainMenu";
import NavbarLogo from "./NavbarLogo";
import NavbarProfileContainer from "./NavbarProfileContainer";
import { getIsAuth } from "@/lib/authenticate";
import MobileMenu from "./MobileMenu";
import PageContainer from "./PageContainer";
import AuthBtns from "./AuthBtns";
import { User } from "@/types";

export default async function Navbar() {
  const isAuth: boolean = await getIsAuth();

  return (
    <PageContainer
      type="nav"
      styles="sticky top-0 h-16 sm:h-20 bg-base-100 bg-opacity-75 backdrop-blur-md z-20 flex items-center"
    >
      <div className="flex h-full items-center gap-4 md:gap-6 grow">
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
              <AuthBtns />
            </div>
          )}
        </div>

        {/* Mobile menu */}
        <div className="lg:hidden ml-auto grid place-items-center">
          <MobileMenu isAuth={isAuth} />
        </div>
      </div>
    </PageContainer>
  );
}

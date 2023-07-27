import Image from "next/image";
import {
  BsFillCaretDownFill,
  BsFillGearFill,
  BsBellFill,
} from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { IoExit } from "react-icons/io5";

export default function Navbar() {
  return (
    <div className="sticky top-0 w-full max-w-screen-2xl h-24 px-6 py-2 md:px-12 md:py-4 flex items-center gap-4 md:gap-6 bg-base-100 bg-opacity-75 backdrop-blur-md z-20">
      <div>
        <h1 className="text-4xl">
          Watch<span className="text-primary">Party</span>
        </h1>
      </div>

      {/* Menu container */}
      <div className="flex flex-1 justify-between items-center">
        <div className="flex-grow">
          <ul className="menu md:menu-horizontal rounded-box">
            <li className="text-lg">
              <a>🎬 My Movies</a>
            </li>
            <li className="text-lg">
              <a>
                🎉 Watch Parties
                <span className="badge badge-sm badge-accent">5+</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Sign in, sign up -- or profile image with account menu drop down if logged in */}
        <div className="transition">
          {/* <div className="flex gap-2 items-center">
            <button className="btn btn-primary">Sign In</button>
            <button className="btn btn-accent btn-outline">Sign Up</button>
          </div> */}

          <div
            className="flex gap-2 items-center group hover:cursor-pointer outline-none relative"
            tabIndex={0}
          >
            <BsFillCaretDownFill className="group-hover:text-primary transition" />
            <div className="avatar">
              <div className="rounded-full group-focus:ring group-hover:ring ring-primary ring-offset-base-100 ring-offset-2 hover:cursor-pointer transition">
                <Image
                  width={55}
                  height={55}
                  src="/profile_img/profile.jpg"
                  alt="profile image"
                />
              </div>
            </div>
            <div className="bg-neutral rounded-md group-hover:cursor-default absolute right-0 top-full mt-3 z-30">
              <ul className="menu menu-md">
                <li>
                  <a>
                    <BsBellFill size={18} />
                    Notifications
                    <span className="badge badge-sm badge-accent">5+</span>
                  </a>
                </li>
                <li>
                  <a>
                    <BsFillGearFill size={18} />
                    Settings
                  </a>
                </li>
                <li className="text-secondary">
                  <a>
                    <BiLogOut size={18} />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

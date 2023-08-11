import { signOut } from "next-auth/react";
import { BiLogOut, BiSolidParty } from "react-icons/bi";
import { BsBellFill, BsFillGearFill } from "react-icons/bs";
import { RiMovieFill } from "react-icons/ri";

interface ProfileMenuProps {
  size?: "xs" | "sm" | "md" | "lg";
}

export default function ProfileMenu({ size = "md" }: ProfileMenuProps) {
  return (
    <ul className={`menu menu-${size} w-full`}>
      <li>
        <a>
          <BsBellFill size={18} />
          Notifications
          <span className="badge badge-sm badge-accent">5+</span>
        </a>
      </li>
      <li>
        <a>
          <BiSolidParty size={18} />
          My Parties
        </a>
      </li>
      <li>
        <a>
          <RiMovieFill size={18} />
          My List
        </a>
      </li>
      <li>
        <a>
          <BsFillGearFill size={18} />
          Settings
        </a>
      </li>
      <li className="text-secondary">
        <a onClick={() => signOut()}>
          <BiLogOut size={18} />
          Logout
        </a>
      </li>
    </ul>
  );
}

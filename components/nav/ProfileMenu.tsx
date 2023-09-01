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
        <button>
          <BsBellFill size={18} />
          Notifications
          <span className="badge badge-sm badge-accent">5+</span>
        </button>
      </li>
      <li>
        <button>
          <BiSolidParty size={18} />
          My Parties
        </button>
      </li>
      <li>
        <button>
          <RiMovieFill size={18} />
          My List
        </button>
      </li>
      <li>
        <button>
          <BsFillGearFill size={18} />
          Settings
        </button>
      </li>
      <li className="text-secondary">
        <button onClick={() => signOut()}>
          <BiLogOut size={18} />
          Logout
        </button>
      </li>
    </ul>
  );
}

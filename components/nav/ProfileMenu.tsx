import { signOut } from "next-auth/react";
import { BiLogOut, BiSolidParty } from "react-icons/bi";
import { BsFillGearFill } from "react-icons/bs";
import { RiMovieFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa6";

interface ProfileMenuProps {
  size?: "xs" | "sm" | "md" | "lg";
}

export default function ProfileMenu({ size = "md" }: ProfileMenuProps) {
  return (
    <ul className={`w-full menu menu-${size} whitespace-nowrap`}>
      <li>
        <button>
          <FaUser size={18} />
          My Profile
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

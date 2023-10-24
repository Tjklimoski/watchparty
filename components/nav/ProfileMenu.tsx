"use client";

import { signOut } from "next-auth/react";
import { BiLogOut, BiSolidParty } from "react-icons/bi";
import { BsFillGearFill } from "react-icons/bs";
import { RiMovieFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";

export default function ProfileMenu() {
  const router = useRouter();
  const { user } = useUser();

  return (
    // using '&_button' for chromium based browsers
    <ul className={`w-full menu menu-md [&_button]:whitespace-nowrap`}>
      <li>
        <button
          onClick={e => {
            if (!user) return;
            e.currentTarget.blur();
            router.push(`/user/${user.id}`);
          }}
        >
          <FaUser size={18} />
          My Profile
        </button>
      </li>
      <li>
        <button
          onClick={e => {
            router.push("/user/myparties");
            e.currentTarget.blur();
          }}
        >
          <BiSolidParty size={18} />
          My Parties
        </button>
      </li>
      <li>
        <button
          onClick={e => {
            router.push("/user/mylist");
            e.currentTarget.blur();
          }}
        >
          <RiMovieFill size={18} />
          My List
        </button>
      </li>
      <li>
        <button
          onClick={e => {
            router.push("/user/settings");
            e.currentTarget.blur();
          }}
        >
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

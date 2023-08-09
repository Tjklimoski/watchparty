"use client";

import Image from "next/image";
import { FaUser } from "react-icons/fa6";

export default function ProfileIcon() {
  const user = false;

  return (
    <div className="avatar">
      <div className="rounded-full group-focus:ring group-hover:ring ring-primary ring-offset-base-100 ring-offset-2 hover:cursor-pointer transition">
        {user ? (
          <Image
            width={40}
            height={40}
            src="/img/profile/avatar.jpg"
            alt="profile image"
          />
        ) : (
          <FaUser size={30} />
        )}
      </div>
    </div>
  );
}

"use client";

import { User } from "@/types";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";

interface ProfileIconProps {
  user: User;
}

export default function ProfileIcon({ user }: ProfileIconProps) {
  // Since user is an async function, need to make sure the data
  // has been fetched before trying to access a field
  const userImage = (user && user.image) ?? "";

  return (
    <div className="avatar">
      <div className="rounded-full group-focus:ring group-hover:ring ring-primary ring-offset-base-100 ring-offset-2 hover:cursor-pointer transition">
        {userImage ? (
          <Image width={40} height={40} src={userImage} alt="profile image" />
        ) : (
          <FaUser size={30} />
        )}
      </div>
    </div>
  );
}

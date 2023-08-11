"use client";

import useUser from "@/hooks/useUser";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";

const SIZE = 40;

export default function ProfileIcon() {
  // Since user is an async function, need to make sure the data
  // has been fetched before trying to access a field
  const { user, isLoading } = useUser();
  const userImage = user?.image ?? "";

  return (
    <div className="avatar">
      <div className="rounded-full group-focus:ring group-hover:ring ring-primary ring-offset-base-100 ring-offset-2 hover:cursor-pointer transition">
        {isLoading ? (
          <FaUser size={SIZE} />
        ) : userImage ? (
          <Image
            width={SIZE}
            height={SIZE}
            src={userImage}
            alt="profile image"
          />
        ) : (
          <FaUser size={SIZE} />
        )}
      </div>
    </div>
  );
}

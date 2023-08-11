"use client";

import useUser from "@/hooks/useUser";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";

interface ProfileIconProps {
  id?: string;
  size?: number;
}

export default function ProfileIcon({ id, size = 35 }: ProfileIconProps) {
  // Since user is an async function, need to make sure the data
  // has been fetched before trying to access a field
  const { user, isLoading } = useUser(id);
  const userImage = user?.image ?? "";

  return (
    <div className="avatar">
      <div className="rounded-full group-focus:ring group-hover:ring ring-primary ring-offset-base-100 ring-offset-2 hover:cursor-pointer transition">
        {isLoading ? (
          <FaUser size={size} />
        ) : userImage ? (
          <Image
            width={size}
            height={size}
            src={userImage}
            alt="profile image"
          />
        ) : (
          <FaUser size={size} />
        )}
      </div>
    </div>
  );
}

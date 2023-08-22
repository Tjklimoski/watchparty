"use client";

import useUser from "@/hooks/useUser";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";

interface ProfileIconProps {
  id?: string;
  size?: number;
}

export default function ProfileIcon({ id, size = 36 }: ProfileIconProps) {
  // Since user is an async function, need to make sure the data
  // has been fetched before trying to access a field
  const { user, isLoading } = useUser(id);
  const userImage = user?.image ?? "";

  return (
    <div className="avatar">
      <div className="rounded-full">
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

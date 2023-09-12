"use client";

import useUser from "@/hooks/useUser";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";

interface ProfileIconProps {
  id?: string;
  size?: number;
}

export default function ProfileIcon({ id, size = 38 }: ProfileIconProps) {
  // Since user is an async function, need to make sure the data
  // has been fetched before trying to access a field
  const { user, isLoading } = useUser(id);
  const userImage = user?.image ?? "";

  return isLoading ? (
    <FaUser size={size} className="rounded-full" />
  ) : userImage ? (
    <Image
      width={size}
      height={size}
      src={userImage}
      alt="profile image"
      className="rounded-full"
    />
  ) : (
    <FaUser size={size} className="rounded-full" />
  );
}

"use client";

import useUser from "@/hooks/useUser";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";

interface ProfileIconProps {
  id?: string;
  size?: number;
  group?: boolean;
}

export default function ProfileIcon({
  id,
  size = 38,
  group,
}: ProfileIconProps) {
  // Since user is an async function, need to make sure the data
  // has been fetched before trying to access a field
  const { user, isLoading } = useUser(id);
  const userImage = user?.image ?? "";

  return isLoading ? (
    <FaUser
      size={size}
      className={`rounded-full bg-neutral/60 ${
        group && "outline"
      } outline-2 outline-primary group-focus:outline-primary-focus group-hover:outline-accent-focus p-1 text-base-content`}
    />
  ) : userImage ? (
    <Image
      width={size}
      height={size}
      src={userImage}
      alt="profile image"
      className={`rounded-full ${
        group && "outline"
      } outline-2 outline-accent group-focus:outline-primary-focus group-hover:outline-accent-focus`}
    />
  ) : (
    <FaUser
      size={size}
      className={`rounded-full bg-neutral/60 ${
        group && "outline"
      } outline-2 outline-accent group-focus:outline-primary-focus group-hover:outline-accent-focus p-1 text-base-content`}
    />
  );
}

"use client";

import APIFetcher from "@/lib/APIFetcher";
import { LimitedUser } from "@/types";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";
import useSWR from "swr";

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
  const { data: user, isLoading } = useSWR<LimitedUser>(
    id && `/users/${id}`,
    APIFetcher
  );
  const userImage = user?.image;

  return isLoading ? (
    <FaUser
      size={size}
      className={`rounded-full ${
        group ? "bg-neutral outline" : "bg-neutral/60"
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
      className={`rounded-full ${
        group ? "bg-neutral outline" : "bg-neutral/60"
      } outline-2 outline-accent group-focus:outline-primary-focus group-hover:outline-accent-focus p-1 text-base-content`}
    />
  );
}

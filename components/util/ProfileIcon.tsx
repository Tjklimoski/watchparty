"use client";

import APIFetcher from "@/lib/APIFetcher";
import { LimitedUser } from "@/types";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";
import useSWR from "swr";

interface ProfileIconProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string | undefined;
  group?: boolean;
}

export default function ProfileIcon({
  id,
  group,
  className,
}: ProfileIconProps) {
  const { data: user, isLoading } = useSWR<LimitedUser>(
    id && `/users/${id}`,
    APIFetcher
  );
  const userImage = user?.image;

  return (
    <div className={`${className ?? "w-[38px]"} aspect-square`}>
      {isLoading ? (
        <FaUser
          className={`rounded-full ${
            group ? "bg-neutral outline" : "bg-neutral/60"
          } outline-2 outline-primary group-focus:outline-primary-focus group-hover:outline-accent-focus p-1 text-base-content w-full h-full`}
        />
      ) : userImage ? (
        <div className="relative w-full h-full">
          <Image
            fill
            sizes="100%"
            src={userImage}
            alt="profile image"
            className={`rounded-full ${
              group && "outline"
            } outline-2 outline-accent group-focus:outline-primary-focus group-hover:outline-accent-focus`}
          />
        </div>
      ) : (
        <FaUser
          className={`rounded-full ${
            group ? "bg-neutral outline" : "bg-neutral/60"
          } outline-2 outline-accent group-focus:outline-primary-focus group-hover:outline-accent-focus p-1 text-base-content w-full h-full`}
        />
      )}
    </div>
  );
}

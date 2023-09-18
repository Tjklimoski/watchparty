import Link from "next/link";
import React from "react";
import ProfileIcon from "../util/ProfileIcon";
import useSWR from "swr";
import APIFetcher from "@/lib/APIFetcher";
import Skeleton from "../util/Skeleton";
import { getFirstName } from "@/lib/stringModifications";

interface UserListItemProps {
  id: string | undefined;
}

export default function UserListItem({ id }: UserListItemProps) {
  const { data: user, error } = useSWR(id && `/users/${id}`, APIFetcher);

  if (!user && !error)
    return (
      <li className="py-1">
        <div className="flex items-center px-4 sm:px-8 py-2 sm:py-4">
          <Skeleton className="rounded-full h-10 sm:h-12 w-10 sm:w-12" />
          <Skeleton className="w-1/4 min-w-[150px] ms-2 sm:ms-4" />
        </div>
      </li>
    );

  if (!id || error) return null;

  return (
    // A border size / location is added conditionally on the li from the parent
    <li className="border-base-100 py-1">
      <Link
        href={`/user/${id}`}
        className="flex items-center hover:bg-white/20 px-4 sm:px-8 py-2 sm:py-4 rounded-md"
      >
        {/* ProfileIcon wrapped in div to allow for size changes at breakpoints */}
        <div className="w-10 sm:w-12">
          <ProfileIcon id={id} size={48} />
        </div>
        <span className="font-semibold text-md sm:text-lg ms-4">
          {getFirstName(user.name)}
        </span>
      </Link>
    </li>
  );
}

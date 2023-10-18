import React from "react";
import Skeleton from "../util/Skeleton";
import useSWR from "swr";
import APIFetcher from "@/lib/APIFetcher";
import { LimitedUser, User } from "@/types";
import Link from "next/link";
import ProfileIcon from "../util/ProfileIcon";
import { getFirstName } from "@/lib/stringModifications";
import useUser from "@/hooks/useUser";

interface HostProps {
  hostId: string | undefined;
}

export default function Host({ hostId }: HostProps) {
  // fetch current user to check if current user is also the host
  const { user } = useUser();
  const { data: host, error: hostError } = useSWR<LimitedUser>(
    hostId && `/users/${hostId}`,
    APIFetcher
  );

  if (hostError) throw new Error("Invalid host id");

  return !hostId || !user || !host ? (
    <Skeleton className="max-w-[18ch]" />
  ) : hostId === user.id ? (
    <p className="ms-2 text-center sm:text-right">Hosted by you</p>
  ) : (
    <Link
      href={`/user/${hostId}`}
      className="grid grid-flow-col place-items-center gap-2 group ms-2 text-center sm:text-right"
    >
      <p>
        Hosted by{" "}
        <span className="group-hover:text-primary group-focus:text-primary">
          {getFirstName(host.name ?? "")}
        </span>
      </p>
      <ProfileIcon id={hostId} className="w-8" />
    </Link>
  );
}

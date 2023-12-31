import React from "react";
import Skeleton from "../util/Skeleton";
import EditBtn from "./EditBtn";
import InterestedBtn from "./InterestedBtn";
import AttendBtn from "./AttendBtn";
import useSWR from "swr";
import APIFetcher from "@/lib/APIFetcher";
import { User, WatchParty } from "@/types";

interface ActionBtnsProps {
  watchPartyId: string | undefined;
  hostId: string | undefined;
  updateWatchPartyData: (data: WatchParty) => void;
}

export default function ActionBtns({
  watchPartyId,
  hostId,
  updateWatchPartyData,
}: ActionBtnsProps) {
  // fetch current user
  const { data: user, error } = useSWR<User>("/user", APIFetcher);

  if (error) throw new Error("no current user");

  return (
    <div className="flex gap-4 ms-4 items-center">
      {!watchPartyId || !hostId || !user ? (
        <>
          <Skeleton className="w-12 h-12 rounded-full" />
          <Skeleton className="w-12 h-12 rounded-full" />
        </>
      ) : user.id === hostId ? (
        <EditBtn watchPartyId={watchPartyId} />
      ) : (
        <>
          <InterestedBtn
            watchPartyId={watchPartyId}
            updateWatchPartyData={updateWatchPartyData}
            tooltip
          />
          <AttendBtn
            watchPartyId={watchPartyId}
            updateWatchPartyData={updateWatchPartyData}
            tooltip
          />
        </>
      )}
    </div>
  );
}

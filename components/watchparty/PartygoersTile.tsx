import React from "react";
import ProfileIconGroup from "../util/ProfileIconGroup";

interface PartygoersTileProps {
  partygoerIds: string[] | undefined;
  color: "primary" | "secondary";
}

export default function PartygoersTile({
  partygoerIds,
  color,
}: PartygoersTileProps) {
  return (
    <div>
      <div className={`font-semibold py-1 px-2 rounded-md mb-2 bg-${color}/40`}>
        Partygoers
      </div>
      <ProfileIconGroup title="Partygoers" userIds={partygoerIds} iconSize={50}>
        {/* Children are the fallback if userIds array is empty */}
        Be the first Partygoer!
      </ProfileIconGroup>
    </div>
  );
}

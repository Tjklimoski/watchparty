import React, { useEffect, useState } from "react";
import Skeleton from "../util/Skeleton";
import { getUserDistanceFrom } from "@/lib/Geocode";
import useUser from "@/hooks/useUser";

interface DistanceProps {
  watchPartyCoords: [number, number] | undefined;
}

export default function Distance({ watchPartyCoords }: DistanceProps) {
  const [distance, setDistance] = useState(-1);
  const [loading, setLoading] = useState(true);
  // Fetch current user data
  const { user } = useUser();

  // highlight distance in warning color if distance is -1 (unavailable) or outside user's radius
  const warnDistance = distance === -1 || (user && distance > user.radius);

  // fetch and set the distance the user is from the WatchParty
  useEffect(() => {
    if (!watchPartyCoords) return;
    getUserDistanceFrom(watchPartyCoords)
      .then((miles) => setDistance(miles))
      .catch((err: Error | any) => {
        console.error(err?.message ?? err);
      })
      .finally(() => setLoading(false));
  }, [watchPartyCoords]);

  return loading ? (
    <Skeleton className="max-w-[12ch]" />
  ) : (
    <p
      className={`font-semibold ${
        warnDistance ? "text-warning" : "text-success"
      } text-center sm:text-left`}
    >
      {distance === -1 ? "NA" : distance} {distance === 1 ? "mile" : "miles"}{" "}
      away
    </p>
  );
}

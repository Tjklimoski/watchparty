import React, { useEffect, useState } from "react";
import Skeleton from "../util/Skeleton";
import { getUserDistanceFrom } from "@/lib/Geocode";
import useUser from "@/hooks/useUser";

interface DistanceProps {
  watchPartyCoords?: [number, number];
  knownDistance?: number;
}

export default function Distance({
  watchPartyCoords,
  knownDistance,
}: DistanceProps) {
  const [loading, setLoading] = useState(true);
  const [distance, setDistance] = useState(() => {
    if (knownDistance) {
      setLoading(false);
      return knownDistance;
    } else {
      return -1;
    }
  });
  // Fetch current user data
  const { user } = useUser();

  // highlight distance in warning color if distance is -1 (unavailable) or outside user's radius
  const warnDistance = distance === -1 || (user && distance > user.radius);

  // fetch and set the distance the user is from the WatchParty
  useEffect(() => {
    if (!watchPartyCoords || knownDistance) return;

    // Create abort controller
    const controller = new AbortController();

    // request data
    getUserDistanceFrom(watchPartyCoords, { controller })
      .then(miles => setDistance(miles))
      .catch((err: Error | any) => {
        console.error(err?.message ?? err);
      })
      .finally(() => setLoading(false));

    // On unmount of useEffect call abort on currently running abort controller
    return () => {
      controller.abort();
    };
  }, [watchPartyCoords, knownDistance]);

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

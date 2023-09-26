"use client";

import React, { useEffect, useState } from "react";
import Carousel from "../util/Carousel";
import getCarouselHeading from "@/lib/getCarouselHeading";
import { WatchParty } from "@/types";
import Skeleton from "../util/Skeleton";
import { API } from "@/lib/APIFetcher";
import WatchPartyCard from "./WatchPartyCard";
import useUser from "@/hooks/useUser";
import { getUserCoord } from "@/lib/Geocode";

interface WatchPartyCarouselProps {
  endpoint: string;
}

export default function WatchPartyCarousel({
  endpoint,
}: WatchPartyCarouselProps) {
  const { user } = useUser();
  const [watchParties, setWatchParties] = useState<WatchParty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!user) return;
    async function getWatchParties() {
      try {
        const params = {
          radius: user!.radius,
          coordinates: await getUserCoord(),
        };

        const filteredWatchParties = await API.get<WatchParty[]>(endpoint, {
          params,
        }).then((res) => res.data);

        if (!filteredWatchParties) throw new Error("Invalid request");

        setWatchParties(filteredWatchParties);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getWatchParties();
  }, [user, endpoint]);

  const CardSkeletons = Array(6)
    .fill(null)
    .map((item, i) => (
      <div key={i} className="h-full flex flex-col">
        <Skeleton className="w-48 h-full @lg:w-52 @3xl:w-64 @5xl:w-72 aspect-video rounded-sm mb-1" />
        <Skeleton className="w-4/5 h-3 mb-1" />
        <Skeleton className="w-1/2 h-6" />
      </div>
    ));

  if (!loading && error)
    return <p className="text-error font-semibold">{`ERROR ${endpoint}`}</p>;

  return watchParties.length === 0 && loading ? (
    <>
      <Skeleton className="h-8 w-1/6 min-w-[150px]" />
      <Carousel tight>{CardSkeletons}</Carousel>
    </>
  ) : (
    <>
      <h3 className="text-xl sm:text-2xl mb-2 font-bold break-balance">
        {getCarouselHeading(endpoint)}
      </h3>
      <Carousel tight>
        {watchParties.map((watchParty) => (
          <WatchPartyCard key={watchParty.id} watchParty={watchParty} />
        ))}
      </Carousel>
    </>
  );
}

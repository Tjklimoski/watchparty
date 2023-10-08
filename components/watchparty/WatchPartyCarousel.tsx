"use client";

import React, { useEffect, useState } from "react";
import Carousel from "../util/Carousel";
import getCarouselHeading from "@/lib/getCarouselHeading";
import { WatchParty } from "@/types";
import Skeleton from "../util/Skeleton";
import APIFetcher, { API } from "@/lib/APIFetcher";
import WatchPartyCard from "./WatchPartyCard";
import useUser from "@/hooks/useUser";
import { getUserCoord } from "@/lib/Geocode";
import NoWatchPartiesCard from "./NoWatchPartiesCard";
import useSWR from "swr";

interface WatchPartyCarouselProps {
  endpoint: string;
}

interface APIParams {
  radius: number;
  coordinates: [number, number];
  query?: string;
  page?: string;
}

export default function WatchPartyCarousel({
  endpoint,
}: WatchPartyCarouselProps) {
  const { user } = useUser();
  const [params, setParams] = useState<APIParams | undefined>();
  const {
    data: watchParties,
    isLoading,
    error,
  } = useSWR<WatchParty[]>(params && { url: endpoint, params }, APIFetcher);

  // build and set params from user data.
  useEffect(() => {
    async function buildParams() {
      try {
        if (!user) return;

        const myParams = {
          radius: user.radius,
          coordinates: await getUserCoord(),
        };

        setParams(myParams);
      } catch (err) {
        console.error(err);
      }
    }

    buildParams();
  }, [user]);

  const CardSkeletons = Array(6)
    .fill(null)
    .map((item, i) => (
      <div key={i} className="h-full flex flex-col">
        <Skeleton className="w-1/2 h-6 max-w-[14ch]" />
        <Skeleton className="w-48 h-full @lg:w-52 @3xl:w-64 @5xl:w-72 aspect-video rounded-sm mb-1" />
        <Skeleton className="w-3/5 h-3 mb-1" />
      </div>
    ));

  if (!isLoading && error)
    return <p className="text-error font-semibold">{`ERROR ${endpoint}`}</p>;

  return !watchParties ? (
    <>
      <Skeleton className="h-8 w-1/6 min-w-[150px]" />
      <Carousel tight>{CardSkeletons}</Carousel>
    </>
  ) : (
    <section>
      <h3 className="text-xl sm:text-2xl mb-2 font-bold break-balance">
        {getCarouselHeading(endpoint)}
      </h3>
      <Carousel tight>
        {watchParties.length === 0 && <NoWatchPartiesCard />}
        {watchParties.map(watchParty => (
          <WatchPartyCard key={watchParty.id} watchParty={watchParty} />
        ))}
      </Carousel>
    </section>
  );
}

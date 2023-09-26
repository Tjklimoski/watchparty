"use client";

import React from "react";
import Carousel from "../util/Carousel";
import getCarouselHeading from "@/lib/getCarouselHeading";
import { WatchParty } from "@/types";
import Skeleton from "../util/Skeleton";
import useSWR from "swr";
import APIFetcher from "@/lib/APIFetcher";
import WatchPartyCard from "./WatchPartyCard";

interface WatchPartyCarouselProps {
  endpoint: string;
}

export default function WatchPartyCarousel({
  endpoint,
}: WatchPartyCarouselProps) {
  const {
    data: WatchParties,
    isLoading,
    error,
  } = useSWR<WatchParty[]>(endpoint, APIFetcher);
  const CardSkeletons = Array(6)
    .fill(null)
    .map((item, i) => (
      <div key={i}>
        <Skeleton className="h-full w-48 @lg:w-52 @3xl:w-64 @5xl:w-72 aspect-video rounded-sm mb-1" />
        <Skeleton className="w-4/5 h-2 mb-1" />
        <Skeleton className="w-1/2" />
      </div>
    ));

  if (!isLoading && error)
    return <p className="text-error font-semibold">{`ERROR ${endpoint}`}</p>;

  return !WatchParties ? (
    <>
      <Skeleton className="h-8 w-1/6" />
      <Carousel tight>{CardSkeletons}</Carousel>
    </>
  ) : (
    <>
      <h3 className="text-xl sm:text-2xl mb-2 font-bold">
        {getCarouselHeading(endpoint)}
      </h3>
      <Carousel tight>
        {WatchParties.map((watchParty) => (
          <WatchPartyCard key={watchParty.id} watchParty={watchParty} />
        ))}
      </Carousel>
    </>
  );
}

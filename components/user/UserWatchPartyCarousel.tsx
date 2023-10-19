"use client";

import React from "react";
import Carousel from "../util/Carousel";
import Skeleton from "../util/Skeleton";
import EmptyListCard from "../util/EmptyListCard";
import { WatchParty } from "@/types";
import WatchPartyCard from "../watchparty/WatchPartyCard";

interface MyListCarouselProps {
  list: WatchParty[] | undefined;
  title?: string;
}

export default function MyListCarousel({
  list,
  title = "WatchParties",
}: MyListCarouselProps) {
  const CardSkeletons = Array(6)
    .fill(null)
    .map((item, i) => (
      <Skeleton
        key={i}
        className="h-full w-48 @lg:w-52 @3xl:w-64 @5xl:w-72 aspect-video rounded-sm"
      />
    ));

  return !list ? (
    <>
      <Skeleton className="h-8 w-1/6 min-w-[180px]" />
      <Carousel tight>{CardSkeletons}</Carousel>
    </>
  ) : (
    <>
      <h3 className="text-xl sm:text-2xl mb-2 font-bold break-balance">
        {title}
      </h3>
      <Carousel tight>
        {list.length === 0 && <EmptyListCard message="No WatchParties" />}
        {list.slice(0, 20).map(watchParty => (
          <WatchPartyCard key={watchParty.id} watchParty={watchParty} />
        ))}
      </Carousel>
    </>
  );
}

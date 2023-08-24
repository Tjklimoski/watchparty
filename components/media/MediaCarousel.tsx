"use client";

import React from "react";
import Carousel from "../util/Carousel";
import MediaCard from "./MediaCard";
import fetcher from "@/lib/TMDBFetcher";
import useSWRImmutable from "swr/immutable";
import getCarouselHeading from "@/lib/getCarouselHeading";
import { Movie, TVShow } from "@/types";
import Skeleton from "../util/Skeleton";

interface MediaCarouselProps {
  endpoint: string;
}

export default function MediaCarousel({ endpoint }: MediaCarouselProps) {
  const { data, isLoading, error } = useSWRImmutable<Movie[] | TVShow[]>(
    endpoint,
    fetcher
  );
  const MediaCardSkeletons = Array(6)
    .fill(null)
    .map((item, i) => (
      <Skeleton
        key={i}
        className="h-full w-48 @lg:w-52 @3xl:w-64 @5xl:w-72 aspect-video rounded-sm"
      />
    ));

  if (!isLoading && error)
    return <p className="text-error font-semibold">{`ERROR ${endpoint}`}</p>;

  return !data ? (
    <>
      <Skeleton className="h-8 w-1/6" />
      <Carousel tight>{MediaCardSkeletons}</Carousel>
    </>
  ) : (
    <>
      <h3 className="text-xl sm:text-2xl mb-2 font-bold">
        {getCarouselHeading(endpoint)}
      </h3>
      <Carousel tight>
        {data.map((media) => (
          <MediaCard key={media.id} media={media} />
        ))}
      </Carousel>
    </>
  );
}

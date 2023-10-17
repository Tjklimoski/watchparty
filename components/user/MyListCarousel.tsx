"use client";

import React from "react";
import Carousel from "../util/Carousel";
import fetcher from "@/lib/TMDBFetcher";
import useSWRImmutable from "swr/immutable";
import { Movie, MyListItem, TVShow } from "@/types";
import Skeleton from "../util/Skeleton";
import MediaCard from "../media/MediaCard";

interface MediaCarouselProps {
  list: MyListItem[];
}

interface FetchMediaContainerProps {
  myListItem: MyListItem;
}

export default function MediaCarousel({ list }: MediaCarouselProps) {
  return (
    <>
      <h3 className="text-xl sm:text-2xl mb-2 font-bold">
        Recently Added to My List
      </h3>
      <Carousel tight>
        {list.map(listItem => (
          <FetchMediaContainer key={listItem.id} myListItem={listItem} />
        ))}
      </Carousel>
    </>
  );
}

// Placed in seperate component in order to utalise useSWR
function FetchMediaContainer({ myListItem }: FetchMediaContainerProps) {
  const { data: media, isLoading } = useSWRImmutable<Movie | TVShow>(
    `/${myListItem.media_type}/${myListItem.id}`,
    fetcher
  );

  if (!media) return null;

  return isLoading ? (
    <Skeleton className="h-full w-48 @lg:w-52 @3xl:w-64 @5xl:w-72 aspect-video rounded-sm" />
  ) : (
    <MediaCard media={media} />
  );
}

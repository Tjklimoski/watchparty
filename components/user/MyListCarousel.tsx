"use client";

import React from "react";
import Carousel from "../util/Carousel";
import { MyListItem } from "@/types";
import Skeleton from "../util/Skeleton";
import EmptyListCard from "../util/EmptyListCard";
import MyListItemCard from "./MyListItemCard";

interface MyListCarouselProps {
  list: MyListItem[] | undefined;
}

export default function MyListCarousel({ list }: MyListCarouselProps) {
  const MediaCardSkeletons = Array(6)
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
      <Carousel tight>{MediaCardSkeletons}</Carousel>
    </>
  ) : (
    <>
      <h3 className="text-xl sm:text-2xl mb-2 font-bold break-balance">
        Recently Added to My List
      </h3>
      <Carousel tight>
        {list.length === 0 && <EmptyListCard message="No Movies or TV Shows" />}
        {list.map(listItem => (
          <MyListItemCard key={listItem.id} myListItem={listItem} />
        ))}
      </Carousel>
    </>
  );
}

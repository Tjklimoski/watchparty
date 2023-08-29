"use client";

import Image from "next/image";
import type { Movie, TVShow } from "@/types";
import WatchPartyBtn from "./WatchPartyBtn";
import MyListBtn from "./MyListBtn";
import Skeleton from "../util/Skeleton";
import Link from "next/link";

interface MediaCardProps {
  media: Movie | TVShow | undefined;
}

export default function MediaCard({ media }: MediaCardProps) {
  //check the media_type field on media object for accurate typescript checking
  const baseImgPath = "https://image.tmdb.org/t/p/";
  const imgSize = "w780";
  const title = media?.media_type === "movie" ? media?.title : media?.name;

  return !media ? (
    <Skeleton className="h-full w-48 @lg:w-52 @3xl:w-64 @5xl:w-72 aspect-video rounded-sm" />
  ) : (
    <div className="relative w-48 @lg:w-52 @3xl:w-64 @5xl:w-72 aspect-video rounded-sm drop-shadow-lg snap-center @lg:snap-start group overflow-hidden">
      <Image
        className="object-cover brightness-90 group-hover:brightness-100 group-focus-within:brightness-100 rounded-sm transition duration-150"
        src={
          media.backdrop_path
            ? baseImgPath + imgSize + media.backdrop_path
            : "/img/placeholder-md.jpg"
        }
        alt={`${title} Billboard`}
        fill
      />

      {/* Title and Interaction Buttons container */}
      <div className="absolute left-0 bottom-0 right-0 h-1/2 bg-gradient-to-t from-black via-black via-45% to-transparent p-1 @lg:p-2 flex justify-between items-end select-none">
        <h3 className="font-semibold text-md @lg:text-lg @3xl:text-xl break-balance webkit-truncate">
          {title}
        </h3>

        <div className="flex gap-2 z-10 ml-1">
          <WatchPartyBtn
            mediaId={media.id.toString()}
            media_type={media.media_type}
            season={media.media_type === "tv" ? 1 : undefined}
            episode={media.media_type === "tv" ? 1 : undefined}
            sm
          />
          <MyListBtn
            mediaId={media.id.toString()}
            media_type={media.media_type}
            sm
          />
        </div>
      </div>

      {/* Link positioned and styled here to prevent navigation to page when interacting with MyList and WatchParty buttons */}
      <Link
        href={`/media/${media.media_type}/${media.id}`}
        tabIndex={0}
        className="absolute block inset-0"
      />
    </div>
  );
}

// tmdb poster sizes:
// "w92",
// "w154",
// "w185",
// "w342",
// "w500",
// "w780",
// "original"

// tmdb backdrop sizes:
// "w300",
// "w780",
// "w1280",
// "original"

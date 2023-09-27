import TMDBfetcher from "@/lib/TMDBFetcher";
import { WatchParty } from "@/types";
import React from "react";
import useSWR from "swr";
import Skeleton from "../util/Skeleton";
import Link from "next/link";
import Image from "next/image";
import Distance from "./Distance";
import { formatDate, formatTime } from "@/lib/format";

interface WatchPartyCardProps {
  watchParty: WatchParty | undefined;
}

export default function WatchPartyCard({ watchParty }: WatchPartyCardProps) {
  const { data: media, error: mediaError } = useSWR(
    watchParty && `/${watchParty.mediaType}/${watchParty.mediaId}`,
    TMDBfetcher
  );
  const baseImgPath = "https://image.tmdb.org/t/p/";
  const imgSize = "w780";

  return !media || !watchParty ? (
    <Skeleton className="h-full w-48 @lg:w-52 @3xl:w-64 @5xl:w-72 aspect-video rounded-sm" />
  ) : (
    <div className="group snap-center @lg:snap-start">
      {/* User's distance from event above card */}
      <div className="px-1 @lg:px-2 mb-1 flex justify-start">
        <Distance knownDistance={watchParty.dist?.calculated} />
      </div>

      <div className="relative w-48 @lg:w-52 @3xl:w-64 @5xl:w-72 mb-1 aspect-video rounded-sm drop-shadow-lg overflow-hidden">
        <Image
          className="object-cover brightness-90 group-hover:brightness-100 group-focus-within:brightness-100 rounded-sm transition duration-150"
          src={
            media.backdrop_path
              ? baseImgPath + imgSize + media.backdrop_path
              : "/img/placeholder-md.jpg"
          }
          alt={`${watchParty.title} Billboard`}
          fill
          sizes="500px"
        />

        {/* tv show season and episode number */}
        {watchParty.mediaType === "tv" && (
          <div className="absolute top-0 left-0 px-1 font-semibold bg-secondary bg-opacity-75 rounded-br-sm select-none">
            S{watchParty.season}E{watchParty.episode}
          </div>
        )}

        {/* Title container */}
        <div className="absolute left-0 bottom-0 right-0 h-1/2 bg-gradient-to-t from-black via-black via-45% to-transparent p-1 @lg:p-2 flex items-end select-none">
          <h3 className="font-semibold text-md @lg:text-lg @3xl:text-xl break-balance webkit-truncate">
            {watchParty.title}
          </h3>
        </div>

        <Link
          href={`/watchparty/${watchParty.id}`}
          className="absolute block inset-0 focus:border-2 border-primary"
        />
      </div>

      {/* Date and Time of Event below card */}
      <p className="text-xs sm:text-sm px-1 @lg:px-2 text-neutral-500 group-hover:text-neutral-300 group-focus-within:text-neutral-300 transition duration-200">
        {formatDate(watchParty.date)} at {formatTime(watchParty.date)}
      </p>
    </div>
  );
}
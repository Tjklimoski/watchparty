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

export default function WatchPartySearchResult({
  watchParty,
}: WatchPartyCardProps) {
  const { data: media } = useSWR(
    watchParty && `/${watchParty.mediaType}/${watchParty.mediaId}`,
    TMDBfetcher
  );
  const baseImgPath = "https://image.tmdb.org/t/p/";
  const imgSize = "w780";

  const passed = new Date(watchParty?.date ?? "").getTime() < Date.now();

  return !media || !watchParty ? (
    <div className="h-full flex flex-col">
      <Skeleton className="w-1/2 h-6 max-w-[14ch]" />
      <Skeleton className="h-full aspect-video rounded-sm mb-1" />
      <Skeleton className="w-3/5 h-3 mb-1" />
    </div>
  ) : (
    <div className={`group ${passed && "brightness-50"} @container`}>
      {/* User's distance from event above card */}
      <div className="px-1 @xs:px-2 mb-1 flex justify-start">
        <Distance knownDistance={watchParty.dist?.calculated} />
      </div>

      <div className="relative mb-1 aspect-video rounded-sm drop-shadow-lg overflow-hidden">
        <Image
          className={`object-cover ${
            passed
              ? "brightness-50"
              : "brightness-90 group-hover:brightness-100 group-focus-within:brightness-100"
          } rounded-sm transition duration-150`}
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
          <div className="absolute top-0 left-0 px-1 font-semibold bg-secondary bg-opacity-90 rounded-br-sm select-none text-base-100 text-sm @xs:text-base">
            S{watchParty.season} E{watchParty.episode}
          </div>
        )}

        {/* Title container */}
        <div className="absolute left-0 bottom-0 right-0 h-3/5 @xs:h-1/2 bg-gradient-to-t from-black via-black via-45% to-transparent p-1 @xs:p-2 flex items-end select-none">
          <h3 className="font-semibold text-lg @xs:text-xl break-balance webkit-truncate">
            {watchParty.title}
          </h3>
        </div>

        {!passed && (
          <Link
            href={`/watchparty/${watchParty.id}`}
            className="absolute block inset-0 focus:border-2 border-primary"
          />
        )}
      </div>

      {/* Date and Time of event below card */}
      <p
        className={`text-xs @xs:text-sm px-1 @xs:px-2 ${
          passed ? "text-neutral-300" : "text-neutral-500"
        } group-hover:text-neutral-300 group-focus-within:text-neutral-300 transition duration-200`}
      >
        {passed
          ? "Event Passed"
          : `${formatDate(watchParty.date)} at ${formatTime(watchParty.date)}`}
      </p>
    </div>
  );
}

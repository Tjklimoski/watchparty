import TMDBfetcher from "@/lib/TMDBFetcher";
import { WatchParty } from "@/types";
import React from "react";
import useSWR from "swr";
import Skeleton from "../util/Skeleton";
import Link from "next/link";
import Image from "next/image";

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
    <div className="relative w-48 @lg:w-52 @3xl:w-64 @5xl:w-72 aspect-video rounded-sm drop-shadow-lg snap-center @lg:snap-start group overflow-hidden">
      <Image
        className="object-cover brightness-90 group-hover:brightness-100 group-focus-within:brightness-100 rounded-sm transition duration-150"
        src={
          media.backdrop_path
            ? baseImgPath + imgSize + media.backdrop_path
            : "/img/placeholder-md.jpg"
        }
        alt={`${watchParty.title} Billboard`}
        fill
      />

      {/* Title and Interaction Buttons container */}
      <div className="absolute left-0 bottom-0 right-0 h-1/2 bg-gradient-to-t from-black via-black via-45% to-transparent p-1 @lg:p-2 flex justify-between items-end select-none">
        <h3 className="font-semibold text-md @lg:text-lg @3xl:text-xl break-balance webkit-truncate">
          {/* WatchParty event title */}
        </h3>
      </div>

      <Link
        href={`/watchparty/${watchParty.id}`}
        className="absolute block inset-0 focus:border-2 border-primary"
      />
    </div>
  );
}

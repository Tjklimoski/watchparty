"use client";

import Image from "next/image";
import Skeleton from "../util/Skeleton";
import { Episode, MovieDetails, TVShowDetails } from "@/types";
import Link from "next/link";

interface BillboardProps {
  media: MovieDetails | TVShowDetails | undefined;
  watchparty?: boolean;
  episode?: Episode;
}

export default function Billboard({
  media,
  watchparty,
  episode,
}: BillboardProps) {
  const baseImgPath = "https://image.tmdb.org/t/p/";
  const imgSize = "original";
  const imageUrl = media?.backdrop_path
    ? `${baseImgPath}${imgSize}${
        media?.media_type === "tv" && watchparty && episode?.still_path
          ? episode.still_path
          : media.backdrop_path
      }`
    : "/img/placeholder-lg.jpg";
  const mediaTitle = media?.media_type === "movie" ? media.title : media?.name;

  return (
    <div className="absolute top-0 left-0 w-full h-[35svh] sm:h-[45svh] min-h-[180px] sm:min-h-[220px]">
      {media && (
        <Image
          src={imageUrl}
          alt={`${mediaTitle} billboard`}
          fill
          className="object-cover object-top brightness-75"
          priority
          sizes="100vw"
        />
      )}

      <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 py-4 min-h-[14svh] flex items-end bg-gradient-to-t from-black via-black/75 via-30% to-transparent">
        {!media ? (
          <div className="mx-auto w-full max-w-[1440px]">
            <Skeleton className="w-1/2 h-8 sm:h-12 md:h-16" />
          </div>
        ) : (
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold break-balance webkit-truncate w-full max-w-[1440px] mx-auto">
            {!watchparty
              ? mediaTitle
              : episode && (
                  <Link href={`/media/${media.media_type}/${media.id}`}>
                    {`${mediaTitle} S${episode.season_number}E${episode.episode_number} - ${episode.name} `}
                    Watch
                    <span className="bg-gradient-to-tr from-primary to-accent via-secondary bg-clip-text text-transparent">
                      Party
                    </span>
                  </Link>
                )}
          </h2>
        )}
      </div>
    </div>
  );
}

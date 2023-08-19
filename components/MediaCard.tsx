"use client";

import Image from "next/image";
import type { Movie, TVShow } from "@/types";
import { useRouter } from "next/navigation";

interface MediaCardProps {
  media: Movie | TVShow;
}

export default function MediaCard({ media }: MediaCardProps) {
  //check the media_type field on media object for accurate typescript checking
  const router = useRouter();

  const baseImgPath = "https://image.tmdb.org/t/p/";
  const imgSize = "w300";

  // REDEISGN MOVIE CARD - USE BACKDROP PATH. OVERLAY TITLE ON TOP OF BOTTOM THIRD OF IMAGE. CARD MORE WIDE THAN TALL. NETFLIX STYLE-ish
  return (
    <div
      onClick={() => router.push(`/media/${media.media_type}/${media.id}`)}
      className="p-2 bg-primary bg-opacity-20 rounded-md shadow-md snap-start w-48"
    >
      <Image
        className="aspect-poster object-cover w-full rounded-sm"
        src={
          media.poster_path
            ? baseImgPath + imgSize + media.poster_path
            : "/img/placeholder-poster-md.jpg"
        }
        alt={`${
          media.media_type === "movie" ? media.title : media.name
        } poster`}
        width={256}
        height={384}
      />
      <p className="font-semibold text-lg my-2">
        {media.media_type === "movie" ? media.title : media.name}
      </p>
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

// auto-cols-[42%] sm:auto-cols-[29%] md:auto-cols-[22%] lg:auto-cols-[18%] xl:auto-cols-[min(14%,_220px)]

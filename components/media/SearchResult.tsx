"use client";

import { Movie, TVShow } from "@/types";
import Image from "next/image";
import WatchPartyBtn from "./WatchPartyBtn";
import MyListBtn from "./MyListBtn";
import { formatYear } from "@/lib/format";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

interface SearchResultProps {
  media: Movie | TVShow;
}

export default function SearchResult({ media }: SearchResultProps) {
  const container = useRef<HTMLDivElement | null>(null);
  const baseImgPath = "https://image.tmdb.org/t/p/";
  const imgSize = "w780";
  const title = media?.media_type === "movie" ? media?.title : media?.name;
  const year =
    media?.media_type === "movie"
      ? formatYear(media.release_date)
      : formatYear(media.first_air_date);
  const [isSmall, setIsSmall] = useState(true);

  // event listener for window resize to get current container width, set isSmall value
  useEffect(() => {
    if (!container.current) return;

    function setSize() {
      setIsSmall(() => {
        // 336 is equal to @xs (20rem -- 20 x 16px = 320 + 16px of padding x)
        if (container.current!.clientWidth > 336) return false;
        return true;
      });
    }

    window.addEventListener("resize", setSize);

    return () => {
      window.removeEventListener("resize", setSize);
    };
  }, [container]);

  return (
    <div
      ref={container}
      className="relative rounded-sm p-2 aspect-video group overflow-hidden @container"
    >
      <Image
        className="object-cover brightness-90 group-hover:brightness-100 group-focus-within:brightness-100 transition duration-150"
        src={
          media.backdrop_path
            ? `${baseImgPath}${imgSize}${media.backdrop_path}`
            : "/img/placeholder-md.jpg"
        }
        alt={`${title} billboard`}
        fill
      />

      {/* Top Bar Info */}
      <div className="absolute top-0 left-0 p-1 flex gap-2 items-center bg-base-100 bg-opacity-80 backdrop-blur-md rounded-br-md">
        <span
          className={`badge badge-sm @xs:badge-md ${
            media.media_type === "movie" ? "badge-primary" : "badge-secondary"
          } select-none`}
        >
          {media.media_type}
        </span>
        <span className="font-semibold select-none text-sm @xs:text-lg">
          {year}
        </span>
      </div>

      {/* Bottom Bar Info */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent via-black via-35% h-1/2 @xs:h-1/3 p-2 @xs:p-4 flex justify-between items-end">
        <h3 className="font-semibold text-lg @xs:text-xl break-balance webkit-truncate">
          {title}
        </h3>
        <div className="flex gap-2 z-10 ml-1">
          <WatchPartyBtn mediaId={media.id.toString()} sm={isSmall} />
          <MyListBtn
            mediaId={media.id.toString()}
            media_type={media.media_type}
            sm={isSmall}
          />
        </div>
      </div>

      <Link
        href={`/media/${media.media_type}/${media.id}`}
        tabIndex={0}
        className="absolute block inset-0"
      />
    </div>
  );
}

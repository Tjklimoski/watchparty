import React from "react";
import Carousel from "../util/Carousel";
import fetcher from "@/lib/TMDBFetcher";
import useSWR from "swr";
import { Episode } from "@/types";
import Image from "next/image";
import WatchPartyBtn from "./WatchPartyBtn";
import MyListBtn from "./MyListBtn";

interface EpisodeCarouselProps {
  id: number;
  season: number;
}

export default function EpisodeCarousel({ id, season }: EpisodeCarouselProps) {
  const baseImgPath = "https://image.tmdb.org/t/p/";
  const imgSize = "w300";
  const { data } = useSWR<{ episodes: Episode[] }>(
    `/tv/${id}/season/${season}`,
    fetcher
  );

  return (
    <Carousel heading="" tight>
      {data?.episodes &&
        data.episodes.map((episode) => (
          <div
            key={episode.id}
            className="relative w-48 @lg:w-52 @3xl:w-64 @5xl:w-72 aspect-video rounded-sm drop-shadow-lg snap-center @lg:snap-start group overflow-hidden"
          >
            <Image
              className="object-cover brightness-90 group-hover:brightness-100 group-focus-within:brightness-100 rounded-sm transition duration-150"
              src={
                episode.still_path
                  ? baseImgPath + imgSize + episode.still_path
                  : "/img/placeholder-md.jpg"
              }
              alt={`${episode.name} Billboard`}
              fill
            />

            {/* Episode number */}
            <div className="absolute top-0 left-0 px-1 font-semibold text-xl bg-base-100 bg-opacity-75 rounded-br-sm">
              {episode.episode_number}
            </div>

            {/* Title and Interaction Buttons container */}
            <div className="absolute left-0 bottom-0 right-0 h-1/2 bg-gradient-to-t from-black via-black via-45% to-transparent p-1 @lg:p-2 flex justify-between items-end select-none">
              <h3 className="font-semibold text-md @lg:text-lg @3xl:text-xl break-balance webkit-truncate">
                {episode.name}
              </h3>

              <div className="flex gap-2 z-10 ml-1">
                {/* HOW DOES THE WATCH PARTY AND MYLIST BUTTON WORK? Which id, episode or series, or BOTH? */}
                <WatchPartyBtn mediaId={episode.id.toString()} sm />
                <MyListBtn mediaId={episode.id.toString()} media_type="tv" sm />
              </div>
            </div>
          </div>
        ))}
    </Carousel>
  );
}

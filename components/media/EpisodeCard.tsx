import { Episode } from "@/types";
import Image from "next/image";
import WatchPartyBtn from "./WatchPartyBtn";
import { useEffect, useRef } from "react";

interface EpisodeCardProps {
  episode: Episode;
  isSelect?: boolean;
  selected?: boolean;
  setEpisode?: (episodeNumber: number) => void;
}

export default function EpisodeCard({
  episode,
  isSelect = false,
  selected = false,
  setEpisode,
}: EpisodeCardProps) {
  const selectedEpisodeCard = useRef<HTMLDivElement>(null);
  const baseImgPath = "https://image.tmdb.org/t/p/";
  const imgSize = "w300";

  // Bring the selected episode card into view in the carousel when in /watchparty/create
  useEffect(() => {
    if (!selectedEpisodeCard.current) return;
    selectedEpisodeCard.current.scrollIntoView({
      behavior: "instant",
      block: "nearest",
      inline: "center",
    });
  }, [selectedEpisodeCard]);

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!setEpisode) return;
    setEpisode(episode.episode_number);
    const card = e.target as HTMLDivElement;
    card.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  return (
    <div
      ref={selected ? selectedEpisodeCard : null}
      key={episode.id}
      tabIndex={isSelect ? 0 : undefined}
      className={`relative w-48 @lg:w-52 @3xl:w-64 @5xl:w-72 aspect-video rounded-sm drop-shadow-lg snap-center @lg:snap-start group overflow-hidden focus:outline-none ${
        isSelect ? "hover:cursor-pointer" : ""
      }`}
      onClick={isSelect ? handleClick : undefined}
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
      <div className="absolute top-0 left-0 px-1 font-semibold text-xl bg-base-100 bg-opacity-75 rounded-br-sm select-none">
        {episode.episode_number}
      </div>

      {/* Title and Interaction Buttons container */}
      <div className="absolute left-0 bottom-0 right-0 h-1/2 bg-gradient-to-t from-black via-black via-45% to-transparent p-1 @lg:p-2 flex justify-between items-end select-none">
        <h3 className="font-semibold text-md @lg:text-lg @3xl:text-xl break-balance webkit-truncate">
          {episode.name}
        </h3>

        {!isSelect && (
          <div className="z-10 ml-1">
            <WatchPartyBtn
              mediaId={episode.show_id.toString()}
              media_type="tv"
              season={episode.season_number}
              episode={episode.episode_number}
              sm
            />
          </div>
        )}
      </div>

      {/* Div to set borders to without shifting content inside episodeCard. Can't set outlines due to overflow hidden on parent element */}
      {isSelect && (
        <div
          className={`absolute inset-0 group-focus:border-2 border-primary ${
            selected ? "border-2" : ""
          }`}
        />
      )}
    </div>
  );
}

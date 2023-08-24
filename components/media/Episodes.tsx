import { TVShowDetails } from "@/types";
import { ChangeEvent, useEffect, useState } from "react";
import EpisodeCarousel from "./EpisodeCarousel";
import Skeleton from "../util/Skeleton";

interface EpisodesProps {
  media: TVShowDetails | undefined;
}

export default function Episodes({ media }: EpisodesProps) {
  const seasons = media?.seasons;
  // First set requestedSeason to the most recent season
  const [requestedSeason, setRequestedSeason] = useState<number>(() =>
    !seasons ? 1 : seasons[seasons.length - 1].season_number
  );

  useEffect(() => {
    if (!seasons) return;
    setRequestedSeason(seasons[seasons.length - 1].season_number);
  }, [seasons]);

  function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
    setRequestedSeason(parseInt(e.target.value));
  }

  return (
    <div>
      {!media ? (
        <Skeleton className="h-8 w-1/6" />
      ) : (
        <h3 className="text-xl sm:text-2xl mb-2 font-bold">Episodes</h3>
      )}

      <select
        onChange={handleSelect}
        className="select select-primary w-full max-w-xs mb-2"
        disabled={!media}
        value={requestedSeason}
      >
        {seasons?.map((season) => (
          <option
            key={season.id}
            selected={season.season_number === requestedSeason}
            value={season.season_number}
          >
            {season.name}
          </option>
        ))}
      </select>

      <EpisodeCarousel
        key={requestedSeason}
        id={media?.id || 0}
        season={requestedSeason || 0}
      />
    </div>
  );
}

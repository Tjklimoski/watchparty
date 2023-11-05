import { TVShowDetails } from "@/types";
import { ChangeEvent, useEffect, useState } from "react";
import EpisodeCarousel from "./EpisodeCarousel";
import Skeleton from "../util/Skeleton";
import Select from "../form/Select";

interface EpisodesProps {
  media: TVShowDetails | undefined;
}

export default function Episodes({ media }: EpisodesProps) {
  const seasons = media?.seasons;
  // First set requestedSeason to the most recent season
  const [requestedSeason, setRequestedSeason] = useState<number | undefined>(
    undefined
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

      <Select
        className="w-full max-w-xs mb-2"
        onChange={handleSelect}
        value={requestedSeason}
        disabled={!media}
      >
        {seasons?.map(season => (
          <option
            key={season.id}
            selected={season.season_number === requestedSeason}
            value={season.season_number}
          >
            {season.name}
          </option>
        ))}
      </Select>

      <EpisodeCarousel
        key={requestedSeason}
        id={media?.id}
        season={requestedSeason}
      />
    </div>
  );
}

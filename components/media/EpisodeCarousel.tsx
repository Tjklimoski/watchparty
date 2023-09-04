import React from "react";
import Carousel from "../util/Carousel";
import fetcher from "@/lib/TMDBFetcher";
import useSWR from "swr";
import { Episode } from "@/types";
import EpisodeCard from "./EpisodeCard";

interface EpisodeCarouselProps {
  id: number;
  season: number;
  selectedEpisodeNumber?: number;
  isSelect?: boolean;
  setEpisode?: (episodeNumber: number) => void;
}

export default function EpisodeCarousel({
  id,
  season,
  selectedEpisodeNumber,
  isSelect = false,
  setEpisode,
}: EpisodeCarouselProps) {
  const baseImgPath = "https://image.tmdb.org/t/p/";
  const imgSize = "w300";
  const { data } = useSWR<{ episodes: Episode[] }>(
    `/tv/${id}/season/${season}`,
    fetcher
  );

  return (
    <Carousel tight>
      {data?.episodes &&
        data.episodes.map((episode) => (
          <EpisodeCard
            key={episode.id}
            episode={episode}
            isSelect={isSelect}
            selected={episode.episode_number === selectedEpisodeNumber}
            setEpisode={setEpisode}
          />
        ))}
    </Carousel>
  );
}

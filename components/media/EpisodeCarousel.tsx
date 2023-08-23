import React from "react";
import Carousel from "../util/Carousel";
import fetcher from "@/lib/TMDBFetcher";
import useSWR from "swr";
import { Episode } from "@/types";

interface EpisodeCarouselProps {
  id: number;
  season: number;
}

export default function EpisodeCarousel({ id, season }: EpisodeCarouselProps) {
  const { data } = useSWR<{ episodes: Episode[] }>(
    `/tv/${id}/season/${season}`,
    fetcher
  );

  return (
    <>
      <p>current season is: {season}</p>
      <Carousel heading="">
        {data?.episodes &&
          data.episodes.map((episode) => (
            <div key={episode.id}>
              {episode.name}, {episode.season_number}, {episode.episode_number},{" "}
              {episode.air_date}
            </div>
          ))}
      </Carousel>
    </>
  );
}

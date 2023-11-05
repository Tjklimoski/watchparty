"use client";

import React from "react";
import Carousel from "../util/Carousel";
import fetcher from "@/lib/TMDBFetcher";
import useSWR from "swr";
import { Episode } from "@/types";
import EpisodeCard from "./EpisodeCard";
import Skeleton from "../util/Skeleton";

interface EpisodeCarouselProps {
  id: number | undefined;
  season: number | undefined;
  selectedEpisodeNumber?: number;
  isSelect?: boolean;
  setEpisode?: (episodeNumber: number) => void;
  disabled?: boolean;
}

export default function EpisodeCarousel({
  id,
  season,
  selectedEpisodeNumber,
  isSelect = false,
  setEpisode,
  disabled,
}: EpisodeCarouselProps) {
  const { data } = useSWR<{ episodes: Episode[] }>(
    !!id && !!season && `/tv/${id}/season/${season}`,
    fetcher
  );

  const MediaCardSkeletons = Array(6)
    .fill(null)
    .map((item, i) => (
      <Skeleton
        key={i}
        className="h-full w-48 @lg:w-52 @3xl:w-64 @5xl:w-72 aspect-video rounded-sm"
      />
    ));

  return (
    <Carousel tight>
      {data?.episodes
        ? data.episodes.map(episode => (
            <EpisodeCard
              key={episode.id}
              episode={episode}
              isSelect={isSelect}
              selected={episode.episode_number === selectedEpisodeNumber}
              setEpisode={setEpisode}
              disabled={disabled}
            />
          ))
        : MediaCardSkeletons}
    </Carousel>
  );
}

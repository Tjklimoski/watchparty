import fetcher from "@/lib/TMDBFetcher";
import useSWR from "swr";
import { Video } from "@/types";
import Skeleton from "../util/Skeleton";
import { useEffect, useState } from "react";

interface TrailerProps {
  id: string;
  media_type: "movie" | "tv" | undefined;
  seasons?: number | undefined;
}

export default function Trailer({ id, media_type, seasons }: TrailerProps) {
  const { data: videos, isLoading } = useSWR<Video[]>(
    media_type && `/${media_type}/${id}/videos`,
    fetcher
  );
  const { data: recentSeasonVideos, isLoading: recentSeasonVideosIsLoading } =
    useSWR<Video[]>(
      seasons !== undefined && `/tv/${id}/season/${seasons}/videos`,
      fetcher
    );
  const [trailerKey, setTrailerKey] = useState("");

  useEffect(() => {
    setTrailerKey(() => {
      if (!videos || videos.length === 0) return "";

      // If tv show, get trailer from most recent season if available
      if (media_type === "tv" && recentSeasonVideos) {
        for (let i = recentSeasonVideos?.length - 1; i >= 0; i--) {
          const { type, key, site } = recentSeasonVideos[i];
          if (key && type === "Trailer" && site === "YouTube") {
            return key;
          }
        }
      }

      // Get first posted trailer video for the movie or tvShow
      for (let i = videos?.length - 1; i >= 0; i--) {
        const { type, key, site, official } = videos[i];
        if (key && type === "Trailer" && site === "YouTube" && official) {
          return key;
        }
      }

      // no video matched the above criteria - return the key of the last video in array.
      return videos[videos.length - 1].key;
    });
  }, [videos, media_type, recentSeasonVideos]);

  return isLoading || recentSeasonVideosIsLoading ? (
    <>
      <Skeleton className="h-8 w-1/6" />
      <div className="w-full aspect-video">
        <Skeleton className="h-full" />
      </div>
    </>
  ) : trailerKey ? (
    <>
      <h3 className="text-xl sm:text-2xl mb-2 font-semibold">Trailer</h3>
      <iframe
        className="w-full aspect-video rounded-md sm:rounded-xl outline-none mb-8"
        src={`https://www.youtube.com/embed/${trailerKey}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </>
  ) : null;
}

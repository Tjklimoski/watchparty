import fetcher from "@/lib/TMDBFetcher";
import useSWR from "swr";
import { Video } from "@/types";

interface TrailerProps {
  id: string;
}

export default function Trailer({ id }: TrailerProps) {
  const {
    data: videos,
    isLoading,
    error,
  } = useSWR<Video[]>(`/movie/${id}/videos`, fetcher);

  const trailerKey: () => string = () => {
    if (!videos) return "";

    for (let i = videos?.length - 1; i >= 0; i--) {
      const { type, key, site, official } = videos[i];
      if (key && type === "Trailer" && site === "YouTube" && official) {
        return key;
      }
    }

    // no video matched the above criteria - return the key of the last video in array.
    return videos[videos.length - 1].key;
  };

  if ((!isLoading && error) || !trailerKey()) return null;

  return (
    <>
      <h3 className="text-xl sm:text-2xl mb-2 font-semibold">Trailer</h3>
      <iframe
        className="w-full aspect-[16/9] rounded-md sm:rounded-xl outline-none mb-8"
        src={`https://www.youtube.com/embed/${trailerKey()}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </>
  );
}

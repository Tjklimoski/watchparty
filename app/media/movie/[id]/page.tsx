import useSWR from "swr";
import fetcher from "@/lib/TMDBFetcher";
import { MovieDetails } from "@/types";

export default function MovieIdPage({ params }: { params: { id: string } }) {
  // making request for movie it's /movie/mediaid
  // making request for tv it's /tv/mediaid
  const { id } = params;
  const { data, isLoading, error } = useSWR<MovieDetails>(
    `/movie/${id}`,
    fetcher
  );

  return <div>Movie Id Page</div>;
}
import useSWR from "swr";
import fetcher from "@/lib/TMDBFetcher";
import { Movie, TVShow } from "@/types";

export default function MediaIdPage({
  params,
}: {
  params: { mediaId: string };
}) {
  // making request for movie it's /movie/mediaid
  // making request for tv it's /tv/mediaid
  const { data, isLoading, error } = useSWR<Movie | TVShow>(``);
  console.log(params);

  return <div>Media Id Page</div>;
}

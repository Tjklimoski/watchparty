import useSWR from "swr";
import fetcher from "@/lib/TMDBFetcher";
import { TVShowDetails } from "@/types";

export default function TvIdPage({ params }: { params: { id: string } }) {
  // making request for movie it's /movie/mediaid
  // making request for tv it's /tv/mediaid
  const { id } = params;
  const { data, isLoading, error } = useSWR<TVShowDetails>(`/tv/${id}`);

  return <div>TV Id Page</div>;
}

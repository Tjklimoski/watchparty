import fetcher from "@/lib/TMDBFetcher";
import { Movie, MyListItem, TVShow } from "@/types";
import useSWRImmutable from "swr/immutable";
import Skeleton from "../util/Skeleton";
import MediaCard from "../media/MediaCard";
import SearchResult from "../media/SearchResult";

interface MyListItemCardProps {
  myListItem: MyListItem;
  page?: boolean;
}

export default function MyListItemCard({
  myListItem,
  page,
}: MyListItemCardProps) {
  const {
    data: media,
    isLoading,
    error,
  } = useSWRImmutable<Movie | TVShow>(
    `/${myListItem.media_type}/${myListItem.id}`,
    fetcher
  );

  if (!isLoading && error) return null;

  return !page ? (
    <MediaCard media={media} />
  ) : !media ? (
    <Skeleton className="w-full h-full aspect-video" />
  ) : (
    <SearchResult media={media as TVShow | Movie} />
  );
}

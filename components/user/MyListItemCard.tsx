import fetcher from "@/lib/TMDBFetcher";
import { Movie, MyListItem, TVShow } from "@/types";
import useSWRImmutable from "swr/immutable";
import Skeleton from "../util/Skeleton";
import MediaCard from "../media/MediaCard";

interface MyListItemCardProps {
  myListItem: MyListItem;
}

export default function MyListItemCard({ myListItem }: MyListItemCardProps) {
  const { data: media, isLoading } = useSWRImmutable<Movie | TVShow>(
    `/${myListItem.media_type}/${myListItem.id}`,
    fetcher
  );

  if (!media) return null;

  return isLoading ? (
    <Skeleton className="h-full w-48 @lg:w-52 @3xl:w-64 @5xl:w-72 aspect-video rounded-sm" />
  ) : (
    <MediaCard media={media} />
  );
}

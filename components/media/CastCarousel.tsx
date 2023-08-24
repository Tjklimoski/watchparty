import Carousel from "../util/Carousel";
import ActorCard from "./ActorCard";
import useSWR from "swr";
import fetcher from "@/lib/TMDBFetcher";
import { CastCredit } from "@/types";
import Skeleton from "../util/Skeleton";

interface CastCarouselProps {
  id: string | number;
  media_type: "movie" | "tv" | undefined;
}

export default function CastCarousel({ id, media_type }: CastCarouselProps) {
  const { data: credits, isLoading: creditsIsLoading } = useSWR<{
    cast: CastCredit[];
  }>(media_type && `/${media_type}/${id}/credits`, fetcher);

  if (credits?.cast.length === 0) return null;

  const CastSkeletonArray = Array(9)
    .fill(null)
    .map((item, i) => (
      <Skeleton key={i} className="w-28 sm:w-36 h-full aspect-[1/1.8]" />
    ));

  return !credits ? (
    <>
      <Skeleton className="h-8 w-1/6" />
      <Carousel tight>{CastSkeletonArray}</Carousel>
    </>
  ) : (
    <>
      <h3 className="text-xl sm:text-2xl mb-2 font-bold">Cast</h3>
      <Carousel tight>
        {credits.cast.map((actor, index) => {
          // Only show up to the first 10 cast memebers in the list
          if (index > 9) return null;
          return <ActorCard key={index} actor={actor} />;
        })}
      </Carousel>
    </>
  );
}

"use client";

import useSWR from "swr";
import fetcher from "@/lib/TMDBFetcher";
import { useRouter } from "next/navigation";
import { CastCredit, MovieDetails, MyListItem, User, Video } from "@/types";
import PageContainer from "@/components/PageContainer";
import { FaChevronLeft } from "react-icons/fa6";
import Trailer from "@/components/Trailer";
import ActorCard from "@/components/ActorCard";
import Carousel from "@/components/Carousel";
import Skeleton from "@/components/Skeleton";
import MediaDetails from "@/components/MediaDetails";
import Billboard from "@/components/Billboard";
import WatchPartyBtn from "@/components/WatchPartyBtn";
import MyListBtn from "@/components/MyListBtn";

export default function MovieIdPage({ params }: { params: { id: string } }) {
  // making request for movie it's /movie/mediaid
  // making request for tv it's /tv/mediaid
  const { id } = params;
  const router = useRouter();
  const {
    data: movie,
    isLoading: movieIsLoading,
    error: movieError,
  } = useSWR<MovieDetails>(`/movie/${id}`, fetcher);

  const { data: credits, isLoading: creditsIsLoading } = useSWR<{
    cast: CastCredit[];
  }>(`/movie/${id}/credits`, fetcher);

  if (!movieIsLoading && movieError) throw new Error("Invliad Movie Id");

  return (
    // margin-top on PageContainer is to push the content down
    // to leave the space for the billboard image at the top.
    // 4rem and 5rem come from the height of the navbar at those sizes.
    <PageContainer styles="mt-[max(calc(180px-4rem),_calc(35svh-4rem))] sm:mt-[calc(45svh-5rem)] mb-10">
      <Billboard media={movie} />

      <section>
        <div className="flex justify-between mb-4 sm:mb-8">
          <button
            className="btn btn-neutral btn-outline border-2 rounded-full aspect-square grid place-items-center tooltip normal-case"
            data-tip="Back"
            aria-label="Back"
            onClick={() => router.back()}
          >
            <FaChevronLeft size={25} />
          </button>

          <div className="flex gap-4 ms-4">
            <WatchPartyBtn mediaId={id} />
            <MyListBtn mediaId={id} media_type={movie?.media_type} />
          </div>
        </div>

        <div className="flex md:flex-row flex-col-reverse gap-4">
          <MediaDetails media={movie} />

          {/* min-w-0 to stop the flex item from spilling out of it's parent container when the carousel renders */}
          <article className="flex-grow min-w-0">
            {movieIsLoading ? (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton className="w-2/5 mb-4 sm:mb-8" />
              </>
            ) : (
              movie && (
                <p className="mb-4 md:mb-8 text-md sm:text-lg leading-relaxed">
                  {movie.overview}
                </p>
              )
            )}

            <Carousel heading={creditsIsLoading ? "" : "Cast"} tight>
              {creditsIsLoading
                ? Array(9)
                    .fill(null)
                    .map((item, i) => (
                      <Skeleton
                        key={i}
                        className="w-28 sm:w-36 h-full aspect-[1/1.85]"
                      />
                    ))
                : credits &&
                  credits?.cast.map((actor, index) => {
                    // Only show up to the first 10 cast memebers in the list
                    if (index > 9) return null;
                    return <ActorCard key={index} actor={actor} />;
                  })}
            </Carousel>

            <Trailer id={id} />
          </article>
        </div>
      </section>
    </PageContainer>
  );
}

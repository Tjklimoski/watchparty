"use client";

import useSWR from "swr";
import fetcher from "@/lib/TMDBFetcher";
import { MovieDetails } from "@/types";
import Container from "@/components/Container";
import Trailer from "@/components/Trailer";
import MediaDetails from "@/components/MediaDetails";
import Billboard from "@/components/Billboard";
import WatchPartyBtn from "@/components/WatchPartyBtn";
import MyListBtn from "@/components/MyListBtn";
import BackBtn from "@/components/BackBtn";
import MediaOverview from "@/components/MediaOverview";
import CastCarousel from "@/components/CastCarousel";

export default function MovieIdPage({ params }: { params: { id: string } }) {
  // making request for movie it's /movie/mediaid
  // making request for tv it's /tv/mediaid
  const { id } = params;
  const {
    data: movie,
    isLoading: movieIsLoading,
    error: movieError,
  } = useSWR<MovieDetails>(`/movie/${id}`, fetcher);

  if (!movieIsLoading && movieError) throw new Error("Invliad Movie Id");

  return (
    // margin-top on PageContainer is to push the content down
    // to leave the space for the billboard image at the top.
    // 4rem and 5rem come from the height of the navbar at those sizes.
    <main className="mt-[max(calc(180px-4rem),_calc(35svh-4rem))] sm:mt-[calc(45svh-5rem)] mb-10">
      <Container>
        <Billboard media={movie} />

        <section>
          <div className="flex justify-between mb-4 sm:mb-8">
            <BackBtn />
            <div className="flex gap-4 ms-4">
              <WatchPartyBtn mediaId={id} />
              <MyListBtn
                mediaId={id}
                media_type={movie?.media_type}
                disabled={movieIsLoading}
              />
            </div>
          </div>

          <div className="flex md:flex-row flex-col-reverse gap-4">
            <MediaDetails media={movie} />

            {/* min-w-0 to stop the flex item from spilling out of it's parent container when the carousel renders */}
            <article className="flex-grow min-w-0">
              <MediaOverview media={movie} />
              <CastCarousel id={id} media_type={movie?.media_type} />
              <Trailer id={id} />
            </article>
          </div>
        </section>
      </Container>
    </main>
  );
}

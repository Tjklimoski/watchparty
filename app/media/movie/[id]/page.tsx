"use client";

import useSWR from "swr";
import fetcher from "@/lib/TMDBFetcher";
import { MovieDetails } from "@/types";
import Container from "@/components/util/Container";
import Trailer from "@/components/media/Trailer";
import MediaDetails from "@/components/media/MediaDetails";
import Billboard from "@/components/media/Billboard";
import WatchPartyBtn from "@/components/media/WatchPartyBtn";
import MyListBtn from "@/components/media/MyListBtn";
import BackBtn from "@/components/util/BackBtn";
import MediaOverview from "@/components/media/MediaOverview";
import CastCarousel from "@/components/media/CastCarousel";
import { useEffect } from "react";

export default function MovieIdPage({ params }: { params: { id: string } }) {
  useEffect(() => window.scrollTo({ top: 0 }), []);

  // making request for a movie: /movie/mediaid
  // making request for a tv show: /tv/mediaid
  const { id } = params;
  const {
    data: movie,
    isLoading,
    error,
  } = useSWR<MovieDetails>(`/movie/${id}`, fetcher);

  if (!isLoading && error) throw new Error("Invalid movie ID");

  return (
    // margin-top on main element is to push the content down
    // to leave the space for the billboard image at the top. px sizes are the min-h
    // 4rem and 5rem come from the height of the navbar at those sizes.
    <main className="mt-[max(calc(180px-4rem),_calc(35svh-4rem))] sm:mt-[max(calc(220px-5rem),_calc(45svh-5rem))] mb-10">
      <Container>
        <Billboard media={movie} />

        <section>
          <div className="flex justify-between mb-4 sm:mb-8">
            <BackBtn />
            <div className="flex gap-4 ms-4">
              <WatchPartyBtn mediaId={id} media_type="movie" tooltip />
              <MyListBtn
                mediaId={id}
                media_type={movie?.media_type}
                disabled={isLoading}
                tooltip
              />
            </div>
          </div>

          <div className="flex md:flex-row flex-col-reverse gap-4">
            <MediaDetails media={movie} />

            {/* min-w-0 to stop the flex item from spilling out of it's parent container when the carousel renders */}
            <article className="flex-grow min-w-0">
              <MediaOverview media={movie} />
              <CastCarousel id={id} media_type={movie?.media_type} />
              <Trailer id={id} media_type={movie?.media_type} />
            </article>
          </div>
        </section>
      </Container>
    </main>
  );
}

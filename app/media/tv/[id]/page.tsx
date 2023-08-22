"use client";

import useSWR from "swr";
import fetcher from "@/lib/TMDBFetcher";
import { TVShowDetails } from "@/types";
import Container from "@/components/util/Container";
import Billboard from "@/components/media/Billboard";
import BackBtn from "@/components/util/BackBtn";
import WatchPartyBtn from "@/components/media/WatchPartyBtn";
import MyListBtn from "@/components/media/MyListBtn";
import MediaDetails from "@/components/media/MediaDetails";
import MediaOverview from "@/components/media/MediaOverview";
import CastCarousel from "@/components/media/CastCarousel";
import Trailer from "@/components/media/Trailer";

export default function TvIdPage({ params }: { params: { id: string } }) {
  // making request for movie it's /movie/mediaid
  // making request for tv it's /tv/mediaid
  const { id } = params;
  const {
    data: TVShow,
    isLoading,
    error,
  } = useSWR<TVShowDetails>(`/tv/${id}`, fetcher);

  if (!isLoading && error)
    return <p className="text-error">Invalid TV Show ID</p>;

  return (
    // margin-top on PageContainer is to push the content down
    // to leave the space for the billboard image at the top. px sizes are the min-h
    // 4rem and 5rem come from the height of the navbar at those sizes.
    <main className="mt-[max(calc(180px-4rem),_calc(35svh-4rem))] sm:mt-[max(calc(220px-5rem),_calc(45svh-5rem))] mb-10">
      <Container>
        <Billboard media={TVShow} />

        <section>
          <div className="flex justify-between mb-4 sm:mb-8">
            <BackBtn />
            <div className="flex gap-4 ms-4">
              <WatchPartyBtn mediaId={id} tooltip />
              <MyListBtn
                mediaId={id}
                media_type={TVShow?.media_type}
                disabled={isLoading}
                tooltip
              />
            </div>
          </div>

          <div className="flex md:flex-row flex-col-reverse gap-4">
            <MediaDetails media={TVShow} />

            {/* min-w-0 to stop the flex item from spilling out of it's parent container when the carousel renders */}
            <article className="flex-grow min-w-0">
              <MediaOverview media={TVShow} />
              {/* Season selector with episode carousel */}
              <CastCarousel id={id} media_type={TVShow?.media_type} />
              <Trailer
                id={id}
                media_type={TVShow?.media_type}
                seasons={TVShow?.number_of_seasons}
              />
            </article>
          </div>
        </section>
      </Container>
    </main>
  );
}

"use client";

import useSWR from "swr";
import fetcher from "@/lib/TMDBFetcher";
import { MovieDetails } from "@/types";
import PageContainer from "@/components/PageContainer";
import Image from "next/image";

export default function MovieIdPage({ params }: { params: { id: string } }) {
  // making request for movie it's /movie/mediaid
  // making request for tv it's /tv/mediaid
  const baseImgPath = "https://image.tmdb.org/t/p/";
  const imgSize = "original";

  const { id } = params;
  const {
    data: movie,
    isLoading,
    error,
  } = useSWR<MovieDetails>(`/movie/${id}`, fetcher);

  if (!isLoading && error) throw new Error("Invliad Movie Id");

  console.log(movie);

  return isLoading ? (
    // create loading skeleton
    <div>Loading...</div>
  ) : (
    movie !== undefined && (
      // margin-top on PageContainer is to push the content down
      // to leave the space for the billboard image at the top.
      // 4rem and 5rem come from the height of the navbar at those sizes.
      <PageContainer styles="mt-[calc(35svh-4rem)] sm:mt-[calc(45svh-5rem)]">
        <div className="absolute top-0 left-0 w-full h-[35svh] sm:h-[45svh]">
          <Image
            src={baseImgPath + imgSize + movie.backdrop_path}
            alt={`${movie.title} backdrop`}
            fill
            className="object-cover object-top brightness-75"
            priority
          />
        </div>
        <div className="relative">
          <h1>Test</h1>
          <p>MORE CONTENT</p>
        </div>
      </PageContainer>
    )
  );
}

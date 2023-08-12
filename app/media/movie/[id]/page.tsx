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
      <PageContainer>
        <div className="absolute top-0 left-0 w-full h-[35vh] md:h-[45vh]">
          <Image
            src={baseImgPath + imgSize + movie.backdrop_path}
            alt={`${movie.title} backdrop`}
            fill
            className="object-cover object-top brightness-75"
            priority
          />
        </div>
      </PageContainer>
    )
  );
}

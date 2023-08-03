"use client";

import axios from "axios";
import type { Movie } from "@/types";
import Image from "next/image";
import PageContainer from "@/components/PageContainer";
import useSWRImmutable from "swr/immutable";
import fetcher from "@/lib/mediaFetcher";

export default function MediaPage() {
  const baseImgPath = "https://image.tmdb.org/t/p/";
  const imgSize = "w500";

  const {
    data: popularMovies,
    isLoading: popularMoviesLoading,
    error: popularMoviesError,
  } = useSWRImmutable<Movie[]>("/movie/popular", fetcher);

  const {
    data: nowPlayingMovies,
    isLoading: nowPlayingMoviesLoading,
    error: nowPlayingMoviesError,
  } = useSWRImmutable<Movie[]>("/movie/now_playing", fetcher);

  return (
    <PageContainer>
      <div className="h-10 w-96 m-4 text-center bg-zinc-700 rounded-md">
        Search Bar
      </div>

      <h2 className="text-2xl font-semibold mb-2">Popular Movies</h2>
      <div className="grid gap-4 grid-flow-col auto-cols-[42%] sm:auto-cols-[29%] md:auto-cols-[22%] lg:auto-cols-[min(18%,_280px)] overflow-x-scroll overscroll-x-contain snap-mandatory snap-x">
        {popularMovies &&
          popularMovies.map((movie) => (
            <div
              key={movie.id}
              className="p-2 bg-primary bg-opacity-20 rounded-sm shadow-md snap-start"
            >
              <Image
                className="aspect-poster object-cover w-full rounded-sm"
                src={baseImgPath + imgSize + movie.poster_path}
                alt={`${movie.title} poster`}
                width={256}
                height={384}
              />
              <p className="font-semibold text-lg my-2">{movie.title}</p>
            </div>
          ))}
      </div>
    </PageContainer>
  );
}

// tmdb poster sizes:
// "w92",
// "w154",
// "w185",
// "w342",
// "w500",
// "w780",
// "original"

// tmdb backdrop sizes:
// "w300",
// "w780",
// "w1280",
// "original"

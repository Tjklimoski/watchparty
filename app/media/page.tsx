"use client";

import type { Movie } from "@/types";
import PageContainer from "@/components/PageContainer";
import useSWRImmutable from "swr/immutable";
import fetcher from "@/lib/mediaFetcher";
import MovieCard from "@/components/MovieCard";
import Carousel from "@/components/Carousel";

export default function MediaPage() {
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

      <Carousel heading="Popular Movies">
        {popularMovies &&
          popularMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </Carousel>
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

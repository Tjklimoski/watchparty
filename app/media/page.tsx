"use client";

import type { Movie } from "@/types";
import PageContainer from "@/components/PageContainer";
import useSWRImmutable from "swr/immutable";
import fetcher, { multiFetcher } from "@/lib/mediaFetcher";
import MovieCard from "@/components/MovieCard";
import Carousel from "@/components/Carousel";

export default function MediaPage() {
  const { data, isLoading, error } = useSWRImmutable(
    ["/movie/popula", "/movie/upcoming"],
    multiFetcher
  );

  console.log("LOADING: ", isLoading);
  console.log("ERROR: ", error);
  console.log("DATA: ", data);

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

  const {
    data: comingSoonMovies,
    isLoading: comingSoonMoviesLoading,
    error: comingSoonMoviesError,
  } = useSWRImmutable<Movie[]>("/movie/upcoming", fetcher);

  return (
    <PageContainer>
      <div className="h-10 w-96 m-4 text-center bg-zinc-700 rounded-md">
        Search Bar
      </div>

      <Carousel heading="Popular Movies">
        {popularMoviesLoading ? (
          // display Skeleton
          <div>LOADING...</div>
        ) : popularMoviesError ? (
          // display Error
          <div className="font-semibold text-error">
            {popularMoviesError.message}
          </div>
        ) : (
          // display content
          popularMovies &&
          popularMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
      </Carousel>

      <Carousel heading="Now Playing">
        {nowPlayingMoviesLoading ? (
          // display Skeleton
          <div>LOADING...</div>
        ) : nowPlayingMoviesError ? (
          // display Error
          <div className="font-semibold text-error">
            {nowPlayingMoviesError.message}
          </div>
        ) : (
          // display content
          nowPlayingMovies &&
          nowPlayingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
      </Carousel>

      <Carousel heading="Coming Soon">
        {comingSoonMoviesLoading ? (
          // display Skeleton
          <div>LOADING...</div>
        ) : comingSoonMoviesError ? (
          // display Error
          <div className="font-semibold text-error">
            {comingSoonMoviesError.message}
          </div>
        ) : (
          // display content
          comingSoonMovies &&
          comingSoonMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
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

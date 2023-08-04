"use client";

import type { Movie } from "@/types";
import PageContainer from "@/components/PageContainer";
import useSWRImmutable from "swr/immutable";
import fetcher from "@/lib/mediaFetcher";
import MovieCard from "@/components/MovieCard";
import Carousel from "@/components/Carousel";

interface MultiFetcherData {
  status: string;
  reason?: Error;
  value?: Movie[];
}

interface SWRResponse {
  data: MultiFetcherData[] | undefined;
  isLoading: boolean;
}

export default function MediaPage() {
  function multiFetcherClient(urls: string[]) {
    // Using allSettled so only the request that errors will fail,
    // the other request will still return the data.
    return Promise.allSettled(urls.map((url) => fetcher(url)));
  }

  // Not pulling error from useSWR becuase with using multiFetcher the data
  // variable holds a status in each response object, and will be set to
  // 'rejected' if there was an error. useSWR will never error itself.
  const { data, isLoading }: SWRResponse = useSWRImmutable(
    ["/movie/popula", "/movie/upcoming"],
    multiFetcherClient
  );

  console.log("LOADING: ", isLoading);
  console.log("DATA: ", data);

  return (
    <PageContainer>
      <div className="h-10 w-96 m-4 text-center bg-zinc-700 rounded-md">
        Search Bar
      </div>

      {isLoading ? (
        <div>LOADING...</div>
      ) : (
        data!.map((apiRes, index) => {
          if (apiRes.status === "rejected") {
            return (
              <div key={index} className="font-semibold text-error">
                {apiRes.reason!.message}
              </div>
            );
          } else {
            return (
              <Carousel key={index} heading="HEADING">
                {apiRes.value!.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </Carousel>
            );
          }
        })
      )}

      {/* <Carousel heading="Popular Movies">
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
      </Carousel> */}
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

// const {
//   data: popularMovies,
//   isLoading: popularMoviesLoading,
//   error: popularMoviesError,
// } = useSWRImmutable<Movie[]>("/movie/popular", fetcher);

// const {
//   data: nowPlayingMovies,
//   isLoading: nowPlayingMoviesLoading,
//   error: nowPlayingMoviesError,
// } = useSWRImmutable<Movie[]>("/movie/now_playing", fetcher);

// const {
//   data: comingSoonMovies,
//   isLoading: comingSoonMoviesLoading,
//   error: comingSoonMoviesError,
// } = useSWRImmutable<Movie[]>("/movie/upcoming", fetcher);

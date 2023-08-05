"use client";

import type { Movie, TVShow } from "@/types";
import PageContainer from "@/components/PageContainer";
import useSWRImmutable from "swr/immutable";
import fetcher from "@/lib/mediaFetcher";
import MovieCard from "@/components/MovieCard";
import Carousel from "@/components/Carousel";

interface MultiFetcherData {
  status: string;
  heading: string;
  reason?: Error;
  value?: Movie[] | TVShow[];
}

interface SWRResponse {
  data: MultiFetcherData[] | undefined;
  isLoading: boolean;
}

export default function MediaPage() {
  const APIEndpoints = [
    "/movie/popular",
    "/movie/now_playing",
    "/movie/upcoming",
    "/tv/popular",
    "/tv/on_the_air",
    "/tv/airing_today",
  ];

  function getCarouselHeading(url: string) {
    switch (url) {
      case "/movie/popular":
        return "Popular Movies";
      case "/movie/upcoming":
        return "Coming Soon";
      case "/movie/now_playing":
        return "Now Playing";
      case "/tv/popular":
        return "Popular TV Shows";
      case "/tv/on_the_air":
        return "TV Shows Airing this Week";
      case "/tv/airing_today":
        return "TV Shows Airing Today";
      default:
        return "Movies and TV Shows";
    }
  }

  async function multiFetcherClient(urls: string[]) {
    // Using allSettled so only the request that errors will fail,
    // the other request will still return the data.
    return Promise.allSettled(urls.map((url) => fetcher(url))).then((data) => {
      return data.map((apiRes, i) => ({
        ...apiRes,
        heading: getCarouselHeading(urls[i]),
      }));
    });
  }

  // Not pulling error from useSWR becuase using multiFetcher -- the data
  // variable holds a status in each response object, and will be set to
  // 'rejected' if there was an error. useSWR will not error itself.
  const { data, isLoading }: SWRResponse = useSWRImmutable(
    APIEndpoints,
    multiFetcherClient
  );

  return (
    <PageContainer>
      <div className="h-10 w-96 m-4 text-center bg-zinc-700 rounded-md">
        Search Bar
      </div>

      {isLoading ? (
        // DISPLAY SKELETON
        <div>LOADING...</div>
      ) : (
        data!.map((apiRes, index) => {
          if (apiRes.status === "rejected") {
            return (
              <div key={index} className="font-semibold text-error">
                {`${apiRes.heading} ${apiRes.reason!.message}`}
              </div>
            );
          } else {
            return (
              <Carousel key={apiRes.heading} heading={apiRes.heading}>
                {apiRes.value!.map((media) => (
                  <MovieCard key={media.id} media={media} />
                ))}
              </Carousel>
            );
          }
        })
      )}
    </PageContainer>
  );
}

"use client";

import type { MultiFetcherData } from "@/types";
import Container from "@/components/Container";
import useSWRImmutable from "swr/immutable";
import fetcher from "@/lib/TMDBFetcher";
import getCarouselHeading from "@/lib/getCarouselHeading";
import MediaCard from "@/components/MediaCard";
import Carousel from "@/components/Carousel";

export default function MediaPage() {
  const APIEndpoints = [
    "/movie/popular",
    "/movie/now_playing",
    "/movie/upcoming",
    "/tv/popular",
    "/tv/on_the_air",
    "/tv/airing_today",
  ];

  async function multiFetcherClient(urls: string[]) {
    // Using allSettled so only the request that errors will fail,
    // the other request will still return the data.
    return Promise.allSettled(urls.map((url) => fetcher(url))).then((data) => {
      return data.map((apiRes, i) => ({
        ...apiRes,
        // Add a heading field based on the url of the request
        heading: getCarouselHeading(urls[i]),
      }));
    });
  }

  // Not pulling error from useSWR becuase using multiFetcher -- the data
  // variable holds a status in each response object, and will be set to
  // 'rejected' if there was an error. useSWR will not error itself.
  const { data, isLoading } = useSWRImmutable<MultiFetcherData[]>(
    APIEndpoints,
    multiFetcherClient
  );

  return (
    <main>
      <Container>
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
                    <MediaCard key={media.id} media={media} />
                  ))}
                </Carousel>
              );
            }
          })
        )}
      </Container>
    </main>
  );
}

"use client";

import Container from "@/components/util/Container";
import MediaCarousel from "@/components/media/MediaCarousel";
import SearchBar from "@/components/util/SearchBar";
import { endOfDay, endOfWeek, startOfDay } from "@/lib/DateData";

export default function MediaPage() {
  const APIEndpoints = [
    "/movie/popular",
    "/movie/now_playing",
    "/movie/upcoming",
    // to get popular tv shows:
    "/discover/tv",
    // to get tv shows airing this week:
    `/discover/tv?air_date.lte=${endOfWeek}&air_date.gte=${startOfDay}`,
    // to get tv shows airing today:
    `/discover/tv?air_date.lte=${endOfDay}&air_date.gte=${startOfDay}`,
  ];

  return (
    <main>
      <Container>
        <SearchBar searchPath="/media/search" label="Search Movies & TV" />

        {APIEndpoints.map(endpoint => (
          <MediaCarousel key={endpoint} endpoint={endpoint} />
        ))}
      </Container>
    </main>
  );
}

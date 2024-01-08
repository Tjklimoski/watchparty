import Container from "@/components/util/Container";
import MediaCarousel from "@/components/media/MediaCarousel";
import SearchBar from "@/components/util/SearchBar";
import DateData from "@/lib/DateData";

// const today = new Date();
// const startOfDay = new Date(today.toDateString());
// // 24 hours in milliseconds = 1000 * 60 * 60 * 24
// const endOfDay = new Date(startOfDay.getTime() + 1000 * 60 * 60 * 24);
// const endOfWeek = new Date(startOfDay.getTime() + 1000 * 60 * 60 * 24 * 7);

export default function MediaPage() {
  const APIEndpoints = [
    "/movie/popular",
    "/movie/now_playing",
    "/movie/upcoming",
    // to get popular tv shows:
    "/discover/tv",
    // to get tv shows airing this week:
    `/discover/tv?air_date.lte=${DateData.endOfWeek}&air_date.gte=${DateData.startOfDay}`,
    // to get tv shows airing today:
    `/discover/tv?air_date.lte=${DateData.endOfDay}&air_date.gte=${DateData.startOfDay}`,
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

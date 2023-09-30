import Container from "@/components/util/Container";
import MediaCarousel from "@/components/media/MediaCarousel";
import SearchBar from "@/components/util/SearchBar";

export default function MediaPage() {
  const APIEndpoints = [
    "/movie/popular",
    "/movie/now_playing",
    "/movie/upcoming",
    "/tv/popular",
    "/tv/on_the_air",
    "/tv/airing_today",
  ];

  return (
    <main>
      <Container>
        <SearchBar searchPath="/media/search" label="Search Movies & TV" />

        {APIEndpoints.map((endpoint) => (
          <MediaCarousel key={endpoint} endpoint={endpoint} />
        ))}
      </Container>
    </main>
  );
}

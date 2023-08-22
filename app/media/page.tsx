import Container from "@/components/util/Container";
import MediaCarousel from "@/components/media/MediaCarousel";

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
        <div className="h-10 w-96 m-4 text-center bg-zinc-700 rounded-md">
          Search Bar
        </div>

        {APIEndpoints.map((endpoint) => (
          <MediaCarousel key={endpoint} endpoint={endpoint} />
        ))}
      </Container>
    </main>
  );
}

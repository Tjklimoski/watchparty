"use client";

import Container from "@/components/util/Container";
import SearchBar from "@/components/util/SearchBar";
import WatchPartyCarousel from "@/components/watchparty/WatchPartyCarousel";

export default function WatchPartyPage() {
  const APIEndpoints = [
    "/watchparties",
    "/watchparties/popular",
    "/watchparties/today",
    "/watchparties/new",
    "/watchparties/all",
  ];

  return (
    <div>
      <Container>
        {/* SearchBar just placeholder for now */}
        <SearchBar />
        {APIEndpoints.map((endpoint) => (
          <WatchPartyCarousel key={endpoint} endpoint={endpoint} />
        ))}
      </Container>
    </div>
  );
}

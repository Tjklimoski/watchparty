"use client";

import Billboard from "@/components/media/Billboard";
import Container from "@/components/util/Container";
import apiFetcher from "@/lib/APIFetcher";
import fetcher from "@/lib/TMDBFetcher";
import { MovieDetails, TVShowDetails, WatchParty } from "@/types";
import useSWR from "swr";

export default function EventPage({ params }: { params: { partyid: string } }) {
  const { partyid } = params;
  const { data: watchParty, error: watchPartyError } = useSWR<WatchParty>(
    `/watchparties/${partyid}`,
    apiFetcher
  );
  if (watchPartyError) throw new Error("No WatchParty found");
  const { data: media, error: mediaError } = useSWR<
    MovieDetails | TVShowDetails
  >(watchParty && `/${watchParty.mediaType}/${watchParty.mediaId}`, fetcher);
  if (mediaError) throw new Error("No media found");

  return (
    <main className="mt-[max(calc(180px-4rem),_calc(35svh-4rem))] sm:mt-[max(calc(220px-5rem),_calc(45svh-5rem))] mb-10">
      <Container>
        <Billboard media={media} title={watchParty?.title} />
      </Container>
    </main>
  );
}

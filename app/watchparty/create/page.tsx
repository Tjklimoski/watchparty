"use client";

import { useSearchParams } from "next/navigation";
import Container from "@/components/util/Container";
import WatchPartyForm from "@/components/form/WatchPartyForm";

export default function CreateWatchPartyPage() {
  const searchParams = useSearchParams();

  if (!searchParams.has("id") || !searchParams.has("media_type"))
    throw new Error("No valid media");

  const mediaId = searchParams.get("id") ?? "";
  const mediaType = searchParams.get("media_type") ?? "";
  const season = searchParams.get("season") ?? "";
  const episode = searchParams.get("episode") ?? "";
  const watchPartyFormProps = { mediaId, mediaType, season, episode };

  return (
    <main className="min-h-screen">
      <Container>
        <WatchPartyForm {...watchPartyFormProps} />
      </Container>
    </main>
  );
}

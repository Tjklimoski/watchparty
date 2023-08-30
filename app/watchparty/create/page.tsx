"use client";

import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { CreateWatchPartyData } from "@/types";
import { useState } from "react";
import fetcher from "@/lib/TMDBFetcher";

export default function CreateWatchPartyPage() {
  const searchParams = useSearchParams();

  if (!searchParams.has("id") || !searchParams.has("media_type"))
    throw new Error("No valid media");

  const [formData, setFormData] = useState<CreateWatchPartyData>(() => {
    const mediaId = searchParams.get("id") ?? "";
    const mediaType = searchParams.get("media_type") ?? "";
    const season = parseInt(searchParams.get("season") ?? "");
    const episode = parseInt(searchParams.get("episode") ?? "");
    return { mediaId, mediaType, season, episode };
  });

  const { data: media } = useSWR(
    `/${formData.mediaType}/${formData.mediaId}`,
    fetcher
  );

  return <div>{JSON.stringify(media)}</div>;
}

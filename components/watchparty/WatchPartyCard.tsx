import TMDBfetcher from "@/lib/TMDBFetcher";
import { WatchParty } from "@/types";
import React from "react";
import useSWR from "swr";

interface WatchPartyCardProps {
  watchParty: WatchParty;
}

export default function WatchPartyCard({ watchParty }: WatchPartyCardProps) {
  const { data: media, error: mediaError } = useSWR(
    `/${watchParty.mediaType}/${watchParty.mediaId}`,
    TMDBfetcher
  );
  const baseImgPath = "https://image.tmdb.org/t/p/";
  const imgSize = "w780";
  const title = media?.media_type === "movie" ? media?.title : media?.name;

  return <div>WatchPartyCard</div>;
}

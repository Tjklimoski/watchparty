"use client";

import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { CreateWatchPartyData, MovieDetails, TVShowDetails } from "@/types";
import { useState } from "react";
import fetcher from "@/lib/TMDBFetcher";
import Image from "next/image";
import Input from "@/components/form/Input";
import Container from "@/components/util/Container";
import EpisodeCarousel from "@/components/media/EpisodeCarousel";
import { stateAbrv } from "@/lib/stateAbrv";

export default function CreateWatchPartyPage() {
  const baseImgPath = "https://image.tmdb.org/t/p/";
  const imgSize = "w500";
  const searchParams = useSearchParams();

  if (!searchParams.has("id") || !searchParams.has("media_type"))
    throw new Error("No valid media");

  const [formData, setFormData] = useState<CreateWatchPartyData>(() => {
    const mediaId = searchParams.get("id") ?? "";
    const mediaType = searchParams.get("media_type") ?? "";
    const season = searchParams.has("season")
      ? // @ts-ignore
        parseInt(searchParams.get("season"))
      : undefined;
    const episode = searchParams.has("episode")
      ? // @ts-ignore
        parseInt(searchParams.get("episode"))
      : undefined;
    return { mediaId, mediaType, season, episode };
  });

  const { data: media } = useSWR<MovieDetails | TVShowDetails>(
    `/${formData.mediaType}/${formData.mediaId}`,
    fetcher
  );

  const title = media?.media_type === "movie" ? media?.title : media?.name;

  return (
    <main className="min-h-screen">
      <Container>
        <section className="mt-4 p-6 bg-primary/30 rounded-lg w-full max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-4xl font-semibold mb-6">{`Create WatchParty for ${title} ${
            formData.mediaType === "tv" && formData.season !== null
              ? `S${formData.season}E${formData.episode}`
              : ""
          }`}</h3>
          <div className="flex w-full gap-4">
            <div className="relative aspect-poster h-full w-full max-w-[290px] min-w-[125px] overflow-hidden rounded-sm drop-shadow-lg">
              <Image
                alt="Poster"
                src={
                  media
                    ? `${baseImgPath}${imgSize}${media.poster_path}`
                    : "/img/placeholder-poster-md.jpg"
                }
                fill
              />
            </div>

            <form className="w-full [&>*]:mb-4">
              <Input label="Event Title" />
              <textarea
                rows={8}
                className="w-full bg-neutral rounded-md px-4 sm:px-6 py-2 text-md sm:text-xl text-base-content"
                placeholder="Description"
              />

              {/* If tv show - display season and episode selector */}
              <select className="select bg-neutral">
                <option>Season</option>
              </select>
              <EpisodeCarousel id={parseInt(formData.mediaId)} season={1} />

              <span className="flex">
                <Input label="Date" type="date" className="max-w-min" />
                <Input label="Time" type="time" className="ml-2 max-w-min" />
              </span>
              <Input label="Location" />
              <Input label="Address" />
              <span className="flex">
                <Input label="City" />
                <select className="select bg-neutral ml-2 max-w-[150px]">
                  <span className="sr-only">State</span>
                  {stateAbrv.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </span>
              <Input label="Zip" className="max-w-[150px]" />
            </form>
          </div>
        </section>
      </Container>
    </main>
  );
}

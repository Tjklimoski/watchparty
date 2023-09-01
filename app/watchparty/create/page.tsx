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
import MediaDetails from "@/components/media/MediaDetails";

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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("SUBMIT");
    console.log("FORMDATA: ", formData);
    console.log("event object: ", e);
  }

  return (
    <main className="min-h-screen">
      <Container>
        <section className="mt-4 p-6 bg-primary/30 rounded-lg w-full max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-4xl font-semibold mb-6">{`Create WatchParty for ${title} ${
            formData.mediaType === "tv" && formData.season != null
              ? `S${formData.season}E${formData.episode}`
              : ""
          }`}</h3>
          <div className="flex flex-col md:flex-row w-full gap-4">
            <div className="hidden min-[460px]:block">
              <MediaDetails media={media} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-4 text-base-content"
            >
              <Input
                label="Event Title"
                onChange={(e) =>
                  setFormData((current) => ({
                    ...current,
                    title: e.target.value,
                  }))
                }
                value={formData.title}
              />
              <textarea
                rows={8}
                className="w-full bg-neutral rounded-md px-4 sm:px-6 py-2 text-md sm:text-xl"
                placeholder="Description"
                onChange={(e) =>
                  setFormData((current) => ({
                    ...current,
                    description: e.target.value,
                  }))
                }
                value={formData.description}
              />

              {formData.mediaType === "tv" ? (
                <>
                  <select
                    className="select bg-neutral max-w-min"
                    aria-label="TV Show Season Selector"
                    onChange={(e) =>
                      setFormData((current) => ({
                        ...current,
                        season: parseInt(e.target.value),
                      }))
                    }
                    value={formData.season}
                  >
                    <option>Season</option>
                  </select>
                  <EpisodeCarousel id={parseInt(formData.mediaId)} season={1} />
                </>
              ) : null}

              <div className="flex">
                <Input
                  label="Date"
                  type="date"
                  className="max-w-min"
                  onChange={(e) =>
                    setFormData((current) => ({
                      ...current,
                      date: e.target.value,
                    }))
                  }
                  value={formData.date}
                />
                <Input
                  label="Time"
                  type="time"
                  className="ml-2 max-w-min"
                  onChange={(e) =>
                    setFormData((current) => ({
                      ...current,
                      time: e.target.value,
                    }))
                  }
                  value={formData.time}
                />
              </div>
              <Input
                label="Address"
                onChange={(e) =>
                  setFormData((currentData) => ({
                    ...currentData,
                    address: e.target.value,
                  }))
                }
                value={formData.address}
              />
              <div className="flex">
                <Input
                  label="City"
                  onChange={(e) =>
                    setFormData((current) => ({
                      ...current,
                      city: e.target.value,
                    }))
                  }
                  value={formData.city}
                />
                <select
                  className="select bg-neutral ml-2 max-w-[150px]"
                  aria-label="State"
                  onChange={(e) =>
                    setFormData((current) => ({
                      ...current,
                      state: e.target.value,
                    }))
                  }
                  value={formData.state}
                >
                  {stateAbrv.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <Input
                label="Zip"
                className="max-w-[150px]"
                onChange={(e) =>
                  setFormData((current) => ({
                    ...current,
                    zip: parseInt(e.target.value),
                  }))
                }
                value={formData.zip}
              />
              <button type="submit" className="btn btn-accent mt-4">
                Create!
              </button>
            </form>
          </div>
        </section>
      </Container>
    </main>
  );
}

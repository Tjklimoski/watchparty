"use client";

import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { CreateWatchPartyData, MovieDetails, TVShowDetails } from "@/types";
import { useState } from "react";
import fetcher from "@/lib/TMDBFetcher";
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

  const [inputs, setInputs] = useState<CreateWatchPartyData>(() => {
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { data: media } = useSWR<MovieDetails | TVShowDetails>(
    `/${inputs.mediaType}/${inputs.mediaId}`,
    fetcher
  );

  const title = media?.media_type === "movie" ? media?.title : media?.name;

  function validateFormData(): boolean {
    if (!inputs.title) {
      setError("Please give your WatchParty a title");
    }

    if (!inputs.description) {
      setError("Please give your WatchParty a title");
    }

    if (!inputs.date || !inputs.time) {
      setError("Please give your WatchParty a date and time");
    }

    if (!inputs.address) {
      setError("Please provide an address for the WatchParty");
    }

    if (!inputs.city) {
      setError("Please provide a city for the WatchParty");
    }

    if (!inputs.state) {
      setError("Please provde a state for the WatchParty");
    }

    if (!inputs.zip) {
      setError("Please provide a numerical zip code for the WatchParty");
    }

    if (inputs.mediaType === "tv" && (!inputs.season || !inputs.episode)) {
      setError("Please select an episode for the WathParty");
    }

    // return true if inputs is valid
    if (error) {
      setLoading(false);
      return false;
    }
    return true;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    setError("");
    e.preventDefault();

    const isValid = validateFormData();

    if (!isValid) return;

    // turn date and time into DateTime ICO format in a single field called date.
    const dateTime = new Date(`${inputs.date}T${inputs.time}`).toISOString();

    // Check if dateTime is in the future of currentTime.

    if (!inputs.address) console.log("SUBMIT");
    console.log("FORMDATA: ", inputs);
    console.log("event object: ", e);

    setLoading(false);
  }

  return (
    <main className="min-h-screen">
      <Container>
        <section className="mt-4 p-6 bg-primary/30 rounded-lg w-full max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-4xl font-semibold mb-6">{`Create WatchParty for ${title} ${
            inputs.mediaType === "tv" && inputs.season != null
              ? `S${inputs.season}E${inputs.episode}`
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
                  setInputs((current) => ({
                    ...current,
                    title: e.target.value,
                  }))
                }
                value={inputs.title}
                required
              />
              <textarea
                rows={8}
                className="w-full bg-neutral rounded-md px-4 sm:px-6 py-2 text-md sm:text-xl"
                placeholder="Description"
                onChange={(e) =>
                  setInputs((current) => ({
                    ...current,
                    description: e.target.value,
                  }))
                }
                value={inputs.description}
                required
              />

              {inputs.mediaType === "tv" ? (
                <>
                  <select
                    className="select bg-neutral max-w-min"
                    aria-label="TV Show Season Selector"
                    onChange={(e) =>
                      setInputs((current) => ({
                        ...current,
                        season: parseInt(e.target.value),
                      }))
                    }
                    value={inputs.season}
                  >
                    <option>Season</option>
                  </select>
                  <EpisodeCarousel id={parseInt(inputs.mediaId)} season={1} />
                </>
              ) : null}

              <div className="flex">
                <Input
                  label="Date"
                  type="date"
                  className="max-w-min"
                  onChange={(e) =>
                    setInputs((current) => ({
                      ...current,
                      date: e.target.value,
                    }))
                  }
                  value={inputs.date || ""}
                  required
                />
                <Input
                  label="Time"
                  type="time"
                  className="ml-2 max-w-min"
                  onChange={(e) =>
                    setInputs((current) => ({
                      ...current,
                      time: e.target.value,
                    }))
                  }
                  value={inputs.time}
                  required
                />
              </div>
              <Input
                label="Address"
                onChange={(e) =>
                  setInputs((currentData) => ({
                    ...currentData,
                    address: e.target.value,
                  }))
                }
                value={inputs.address}
                required
              />
              <div className="flex">
                <Input
                  label="City"
                  onChange={(e) =>
                    setInputs((current) => ({
                      ...current,
                      city: e.target.value,
                    }))
                  }
                  value={inputs.city}
                  required
                />
                <select
                  className="select bg-neutral ml-2 max-w-[150px]"
                  aria-label="State"
                  onChange={(e) =>
                    setInputs((current) => ({
                      ...current,
                      state: e.target.value,
                    }))
                  }
                  value={inputs.state}
                  required
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
                type="number"
                className="max-w-[150px]"
                value={inputs.zip || ""}
                required
              />
              {error && (
                <p className="text-error font-semibold text-lg">{error}</p>
              )}
              <button
                type="submit"
                className="btn btn-accent mt-4"
                disabled={loading}
              >
                Create!
              </button>
            </form>
          </div>
        </section>
      </Container>
    </main>
  );
}

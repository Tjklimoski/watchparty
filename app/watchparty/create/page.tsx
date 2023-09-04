"use client";

import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { CreateWatchPartyData, MovieDetails, TVShowDetails } from "@/types";
import { useEffect, useState } from "react";
import fetcher from "@/lib/TMDBFetcher";
import Input from "@/components/form/Input";
import Container from "@/components/util/Container";
import EpisodeCarousel from "@/components/media/EpisodeCarousel";
import { stateAbrv } from "@/lib/stateAbrv";
import MediaDetails from "@/components/media/MediaDetails";
import Select from "@/components/form/Select";

export default function CreateWatchPartyPage() {
  const searchParams = useSearchParams();

  if (!searchParams.has("id") || !searchParams.has("media_type"))
    throw new Error("No valid media");

  const [inputs, setInputs] = useState<CreateWatchPartyData>(() => {
    const mediaId = searchParams.get("id") ?? "";
    const mediaType = searchParams.get("media_type") ?? "";
    const season = parseInt(searchParams.get("season") ?? "");
    const episode = parseInt(searchParams.get("episode") ?? "");
    if (mediaType === "movie") return { mediaId, mediaType };
    return { mediaId, mediaType, season, episode };
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { data: media } = useSWR<MovieDetails | TVShowDetails>(
    `/${inputs.mediaType}/${inputs.mediaId}`,
    fetcher
  );

  const title = media?.media_type === "movie" ? media.title : media?.name;

  // Add mediaTitle to inputs so it will be saved in the database
  useEffect(() => {
    setInputs((current) => ({ ...current, mediaTitle: title }));
  }, [title]);

  // Set a default value to season and episode if undefined and media_type is TV
  useEffect(() => {
    if (!media || media.media_type === "movie") return;
    if (isNaN(inputs.season ?? NaN) || isNaN(inputs.episode ?? NaN)) {
      setInputs((current) => ({
        ...current,
        season:
          media.next_episode_to_air?.season_number ||
          media.last_episode_to_air?.season_number ||
          1,
        episode:
          media.next_episode_to_air?.episode_number ||
          media.last_episode_to_air?.episode_number ||
          1,
      }));
    }
  }, [media, inputs]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    // Check if HTMLSelectElement sends value as string or int - specifically season field
    const field = e.target.name;
    const value =
      field === "season" ? parseInt(e.target.value) : e.target.value;
    setInputs((current) => ({ ...current, [field]: value }));
  }

  function validateFormData(): boolean {
    if (!inputs.title) {
      setError("Please provide a title for your WatchParty");
    }

    if (!inputs.description) {
      setError("Please provide a description for your WatchParty");
    }

    if (!inputs.date || !inputs.time) {
      setError("Please provide a date and time for your WatchParty");
    }

    if (!inputs.address) {
      setError("Please provide an address for your WatchParty");
    }

    if (!inputs.city) {
      setError("Please provide a city for your WatchParty");
    }

    if (!inputs.state) {
      setError("Please provde a state for your WatchParty");
    }

    if (!inputs.zip) {
      setError("Please provide a numerical zip code for your WatchParty");
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
            inputs.mediaType === "tv" &&
            inputs.season != null &&
            inputs.episode != null
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
                name="title"
                onChange={handleChange}
                value={inputs.title}
                disabled={loading}
                required
              />
              <textarea
                name="description"
                rows={8}
                className="w-full bg-neutral rounded-md px-4 sm:px-6 py-2 text-md sm:text-xl"
                placeholder="Description"
                onChange={handleChange}
                value={inputs.description}
                disabled={loading}
                required
              />

              {media?.media_type === "tv" &&
              inputs?.season &&
              inputs?.episode ? (
                <>
                  <Select
                    className="max-w-min"
                    aria-label="TV Show Season Selector"
                    name="season"
                    onChange={handleChange}
                    disabled={loading}
                    value={inputs.season}
                  >
                    {media.seasons.map((season) => (
                      <option key={season.id} value={season.season_number}>
                        {season.name}
                      </option>
                    ))}
                  </Select>
                  {/* Pass picked episode to and from EpisodeCarousel componenet. register when episode picked. */}
                  <EpisodeCarousel
                    id={parseInt(inputs.mediaId)}
                    season={inputs.season}
                  />
                </>
              ) : null}

              <div className="flex">
                <Input
                  label="Date"
                  type="date"
                  className="max-w-min"
                  name="date"
                  onChange={handleChange}
                  value={inputs.date}
                  disabled={loading}
                  required
                />
                <Input
                  label="Time"
                  type="time"
                  className="ml-2 max-w-min"
                  name="time"
                  onChange={handleChange}
                  value={inputs.time}
                  disabled={loading}
                  required
                />
              </div>
              <Input
                label="Address"
                name="address"
                onChange={handleChange}
                value={inputs.address}
                disabled={loading}
                required
              />
              <div className="flex">
                <Input
                  label="City"
                  name="city"
                  onChange={handleChange}
                  value={inputs.city}
                  disabled={loading}
                  required
                />
                <Select
                  className="ml-2"
                  aria-label="State"
                  name="state"
                  onChange={handleChange}
                  value={inputs.state}
                  disabled={loading}
                  required
                >
                  {stateAbrv.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </Select>
              </div>
              <Input
                label="Zip"
                type="text"
                className="max-w-[150px]"
                name="zip"
                onChange={handleChange}
                value={inputs.zip}
                disabled={loading}
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

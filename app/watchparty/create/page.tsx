"use client";

import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import {
  GeocodeZipResponse,
  MovieDetails,
  TVShowDetails,
  WatchPartyInputs,
} from "@/types";
import { useEffect, useState } from "react";
import fetcher from "@/lib/TMDBFetcher";
import Input from "@/components/form/Input";
import Container from "@/components/util/Container";
import EpisodeCarousel from "@/components/media/EpisodeCarousel";
import { stateAbrv } from "@/lib/stateAbrv";
import MediaDetails from "@/components/media/MediaDetails";
import Select from "@/components/form/Select";
import { formatFullDate } from "@/lib/format";
import geocodingFetcher from "@/lib/GeocodingFetcher";

export default function CreateWatchPartyPage() {
  const searchParams = useSearchParams();

  if (!searchParams.has("id") || !searchParams.has("media_type"))
    throw new Error("No valid media");

  const mediaId = searchParams.get("id") ?? "";
  const mediaType = searchParams.get("media_type") ?? "";
  const season = searchParams.get("season") ?? "";
  const episode = searchParams.get("episode") ?? "";

  const [inputs, setInputs] = useState<WatchPartyInputs>(() => {
    const defaultInputs = {
      title: "",
      description: "",
      date: "",
      time: "",
      address: "",
      city: "",
      state: "",
      zip: "",
    };
    const seasonValue = isNaN(parseInt(season)) ? undefined : parseInt(season);
    const episodeValue = isNaN(parseInt(episode))
      ? undefined
      : parseInt(episode);
    return { season: seasonValue, episode: episodeValue, ...defaultInputs };
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { data: media } = useSWR<MovieDetails | TVShowDetails>(
    `/${mediaType}/${mediaId}`,
    fetcher
  );

  const title = media?.media_type === "movie" ? media.title : media?.name;

  // Set a default value to season and episode if undefined and media_type is TV
  useEffect(() => {
    if (!media || media.media_type === "movie") return;
    if (inputs.season === undefined || inputs.episode === undefined) {
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
    const field = e.target.name;
    const value =
      field === "season" ? parseInt(e.target.value) : e.target.value;
    setInputs((current) => ({ ...current, [field]: value }));
  }

  function setEpisode(episodeNumber: number) {
    setInputs((current) => ({ ...current, episode: episodeNumber }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    setError("");
    e.preventDefault();

    console.log("FORMDATA: ", inputs);
    console.log("event object: ", e);

    // validateInputs returns false if an input is invalid.
    if (!validateInputs()) {
      setLoading(false);
      return;
    }

    // turn date and time into single ICO format dateTime.
    const dateTime = new Date(`${inputs.date} ${inputs.time}`).toISOString();

    // Get lat and lon data based off event zip code.
    try {
      const { lat, lon } = await geocodingFetcher<GeocodeZipResponse>("/zip", {
        zip: inputs.zip,
      });

      if (!lat || !lon) {
        throw new Error("Invalid zip code");
      }
    } catch (err) {
      setError("Invalid zip code");
      setLoading(false);
      return;
    }

    // move input values from inputs to watchPartyData object (exclude date and time field).
    // Add date field to watchPartyData that's the dateTime ISO string.
    // Add mediaId, mediaType, mediaTitle, and location (lat, lon) to watchPartyData.

    setLoading(false);
  }

  return (
    <main className="min-h-screen">
      <Container>
        <section className="mt-4 p-6 bg-primary/30 rounded-lg w-full max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-4xl font-semibold mb-6">{`Create WatchParty for ${title} ${
            inputs.season != null && inputs.episode != null
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
                className="w-full bg-neutral rounded-md px-4 sm:px-6 py-2 text-md sm:text-xl focus:outline outline-primary outline-offset-0 outline-2"
                placeholder="Description"
                onChange={handleChange}
                value={inputs.description}
                disabled={loading}
                required
              />

              {media?.media_type === "tv" &&
              inputs?.season != null &&
              inputs?.episode ? (
                <>
                  <Select
                    className="max-w-min"
                    aria-label="TV Show Season Selector"
                    name="season"
                    onChange={(e) => {
                      handleChange(e);
                      // When season changes, default episode to 1
                      setInputs((current) => ({
                        ...current,
                        episode: 1,
                      }));
                    }}
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
                    id={parseInt(mediaId)}
                    season={inputs.season}
                    selectedEpisodeNumber={inputs.episode}
                    isSelect={true}
                    setEpisode={setEpisode}
                  />
                </>
              ) : null}

              <div className="flex">
                <Input
                  label="Date"
                  type="date"
                  className="max-w-min"
                  name="date"
                  min={formatFullDate()}
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
                minLength={5}
                maxLength={5}
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

  function validateInputs(): boolean {
    // Check if the input year is more or less then 4 digits. if so error.
    if (inputs.date.split("-")[0].length !== 4) {
      setError("Please provide a valid year for your WatchParty");
      return false;
    }

    // Check if watchParty date + time are in the future of current time.
    if (Date.now() > new Date(`${inputs.date} ${inputs.time}`).getTime()) {
      setError("Please set the WatchParty date and time in the future");
      return false;
    }

    if (inputs.zip.length !== 5) {
      setError("Zip must be a valid, 5 digit long, US zip code");
      return false;
    }

    if (mediaType === "tv" && (!inputs.season || !inputs.episode)) {
      setError("Please select an episode for the WathParty");
      return false;
    }

    return true;
  }
}

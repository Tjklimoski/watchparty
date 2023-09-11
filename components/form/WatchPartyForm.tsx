import useUser from "@/hooks/useUser";
import fetcher from "@/lib/TMDBFetcher";
import {
  GeocodeZipResponse,
  MovieDetails,
  TVShowDetails,
  WatchPartyInputs,
} from "@/types";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Input from "./Input";
import Select from "./Select";
import { stateAbrv } from "@/lib/stateAbrv";
import EpisodeCarousel from "../media/EpisodeCarousel";
import MediaDetails from "../media/MediaDetails";
import geocodingFetcher from "@/lib/GeocodingFetcher";
import { API } from "@/lib/APIFetcher";
import { useRouter } from "next/navigation";
import { formatFullDate } from "@/lib/format";
import Skeleton from "../util/Skeleton";

interface WatchPartyFormProps {
  mediaId: string;
  mediaType: string;
  season?: string | number;
  episode?: string | number;
  update?: boolean;
  updateInputs?: WatchPartyInputs;
}

export default function WatchPartyForm({
  mediaId,
  mediaType,
  season = "",
  episode = "",
  update,
  updateInputs,
}: WatchPartyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState<WatchPartyInputs>(() => {
    // If form is being used to edit existing WatchParty data return those existing values.
    if (update && updateInputs) return updateInputs;

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
    const seasonValue =
      typeof season === "number"
        ? season
        : isNaN(parseInt(season))
        ? undefined
        : parseInt(season);
    const episodeValue =
      typeof episode === "number"
        ? episode
        : isNaN(parseInt(episode))
        ? undefined
        : parseInt(episode);
    return { season: seasonValue, episode: episodeValue, ...defaultInputs };
  });

  const { data: media } = useSWR<MovieDetails | TVShowDetails>(
    `/${mediaType}/${mediaId}`,
    fetcher
  );
  const { user } = useUser();

  const title =
    (media?.media_type === "movie" ? media.title : media?.name) ?? "";

  // Set a default value to season and episode if undefined and media_type is TV
  useEffect(() => {
    // don't set default values if form is being used to edit existing WatchParty
    if (update) return;
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
  }, [media, inputs, update]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    console.log("ON CHANGE CALLED");
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

    // validateInputs returns false if an input is invalid.
    if (!validateInputs()) {
      setLoading(false);
      return;
    }

    // Get lat and lon data based off event zip code.
    try {
      const { lat, lon } = await geocodingFetcher<GeocodeZipResponse>("/zip", {
        zip: inputs.zip,
      });

      if (!lat || !lon) {
        throw new Error("Invalid zip code");
      }

      // extract date and time fields from inputs
      const { date, time, ...data } = inputs;
      // create GeoJSON - mongodb requires lon first in the coordinates array
      const geo = { coordinates: [lon, lat] };
      const watchPartyData = {
        userId: user!.id,
        mediaId,
        mediaType,
        mediaTitle: title,
        geo,
        date: new Date(`${date} ${time}`).toISOString(),
        ...data,
      };

      // CHECK FOR IF THIS IS AN UPDATE, AND IF SO SEND APPRORIATE API REQ

      // Send watchparty data to database via API
      const watchParty = await API.post("/watchparties", watchPartyData).then(
        (res) => res.data
      );

      if (!watchParty) {
        setError("Failed to create watchParty, please try again");
        setLoading(false);
        return;
      }

      // If watchParty succesfully created or updated, redirect user to WatchParty page.
      router.push(`/watchparty/${watchParty.id}`);
    } catch (err) {
      setError("Invalid zip code");
      setLoading(false);
      return;
    }

    setLoading(false);
  }

  return (
    <section className="mt-4 p-6 bg-primary/20 rounded-lg w-full max-w-4xl mx-auto">
      {!title ? (
        <Skeleton className="w-5/6 h-8 sm:h-10 mb-6" />
      ) : (
        <h3 className="text-2xl sm:text-4xl font-semibold mb-6">{`${
          update ? "Update" : "Create"
        } WatchParty for ${title} ${
          inputs.season != null && inputs.episode != null
            ? `S${inputs.season}E${inputs.episode}`
            : ""
        }`}</h3>
      )}
      <div className="flex flex-col md:flex-row w-full gap-4">
        <div className="hidden xs:block">
          <MediaDetails media={media} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4 text-base-content"
        >
          {!media ? (
            <>
              <Skeleton className="h-10 sm:h-11 mb-0" />
              <Skeleton className="h-52 sm:h-60 mb-0" />
            </>
          ) : (
            <>
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
            </>
          )}

          {mediaType === "tv" &&
            (!media ? (
              <>
                <Skeleton className="h-8 sm:h-10 max-w-[144px] mb-0" />
                <Skeleton className="h-32 mb-4" />
              </>
            ) : (
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
                  {(media as TVShowDetails).seasons.map((season) => (
                    <option key={season.id} value={season.season_number}>
                      {season.name}
                    </option>
                  ))}
                </Select>
                {/* Pass picked episode to and from EpisodeCarousel componenet. register when episode picked. */}
                <EpisodeCarousel
                  id={parseInt(mediaId)}
                  season={inputs.season ?? 1}
                  selectedEpisodeNumber={inputs.episode ?? 1}
                  isSelect={true}
                  setEpisode={setEpisode}
                />
              </>
            ))}

          <div className="flex flex-col xs:flex-row gap-4 xs:gap-2">
            {!media ? (
              <>
                <Skeleton className="h-10 sm:h-11 mb-0 xs:max-w-[216px]" />
                <Skeleton className="h-10 sm:h-11 mb-0 xs:max-w-[150px]" />
              </>
            ) : (
              <>
                <Input
                  label="Date"
                  type="date"
                  className="w-full xs:max-w-min"
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
                  className="w-full xs:max-w-min"
                  name="time"
                  onChange={handleChange}
                  value={inputs.time}
                  disabled={loading}
                  required
                />
              </>
            )}
          </div>
          {!media ? (
            <Skeleton className="h-10 sm:h-11 mb-0" />
          ) : (
            <Input
              label="Address"
              name="address"
              onChange={handleChange}
              value={inputs.address}
              disabled={loading}
              required
            />
          )}
          <div className="flex flex-col xs:flex-row gap-4 xs:gap-2">
            {!media ? (
              <>
                <Skeleton className="h-10 sm:h-11 mb-0" />
                <Skeleton className="h-10 sm:h-11 mb-0 xs:max-w-[80px]" />
              </>
            ) : (
              <>
                <Input
                  label="City"
                  name="city"
                  onChange={handleChange}
                  value={inputs.city}
                  disabled={loading}
                  required
                />
                <Select
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
              </>
            )}
          </div>
          {!media ? (
            <Skeleton className="h-10 sm:h-11 mb-0 xs:max-w-[150px]" />
          ) : (
            <Input
              label="Zip"
              type="text"
              className="xs:max-w-[150px]"
              name="zip"
              minLength={5}
              maxLength={5}
              onChange={handleChange}
              value={inputs.zip}
              disabled={loading}
              required
            />
          )}
          {error && <p className="text-error font-semibold text-lg">{error}</p>}
          <button
            type="submit"
            className="btn btn-accent mt-4"
            disabled={loading || !media}
          >
            {loading ? (
              <span className="loading loading-primary loading-sm" />
            ) : update ? (
              "Update!"
            ) : (
              "Create!"
            )}
          </button>
        </form>
      </div>
    </section>
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
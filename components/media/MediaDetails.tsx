import {
  formatBudget,
  formatLanguage,
  formatDate,
  formatRuntime,
} from "@/lib/format";
import { MovieDetails, TVShowDetails } from "@/types";
import React from "react";
import Skeleton from "../util/Skeleton";
import { Image } from "next/dist/client/image-component";

interface MediaDetailsProps {
  media: MovieDetails | TVShowDetails | undefined;
}

export default function MediaDetails({ media }: MediaDetailsProps) {
  const baseImgPath = "https://image.tmdb.org/t/p/";
  const imgSize = "w500";

  return (
    <aside className="bg-primary/20 w-full sm:min-w-[220px] md:max-w-[290px] h-min rounded-md overflow-hidden grid sm:grid-cols-2 md:grid-cols-none">
      <div className="relative w-full h-full hidden sm:block aspect-poster">
        <Image
          className="object-cover"
          src={
            media?.poster_path
              ? `${baseImgPath}${imgSize}${media.poster_path}`
              : "/img/placeholder-poster-md.jpg"
          }
          alt="poster"
          fill
        />
      </div>

      {/* Select every child component (except last child) and add a margin-bottom */}
      <ul className="[&>*:not(:last-child)]:mb-4 p-4 text-sm sm:text-md">
        {!media ? (
          Array(6)
            .fill(null)
            .map((item, i) => (
              <li key={i}>
                <Skeleton className="w-1/2" />
                <Skeleton className="w-1/3" />
              </li>
            ))
        ) : media.media_type === "movie" ? (
          <MovieInfo movie={media} />
        ) : (
          <TVShowInfo tvshow={media} />
        )}
      </ul>
    </aside>
  );
}

function MovieInfo({ movie }: { movie: MovieDetails }) {
  return (
    <>
      <li>
        <span className="font-bold">Runtime</span>
        <br />
        {formatRuntime(movie?.runtime)}
      </li>
      <li>
        <span className="font-bold">Genres</span>
        <br />
        {movie?.genres.length === 0
          ? "NA"
          : movie?.genres.map((genre) => {
              return (
                <span
                  key={genre.id}
                  className="badge badge-outline border-secondary mt-1 mb-1 mr-2"
                >
                  {genre.name}
                </span>
              );
            })}
      </li>
      <li>
        <span className="font-bold">Status</span>
        <br /> {movie?.status ?? "NA"}
      </li>
      <li>
        <span className="font-bold">Release Date</span>
        <br /> {formatDate(movie?.release_date)}
      </li>
      <li>
        <span className="font-bold">Original Language</span>
        <br />
        {formatLanguage(movie?.original_language)}
      </li>
      <li>
        <span className="font-bold">Budget</span>
        <br />
        {formatBudget(movie?.budget)}
      </li>
    </>
  );
}

function TVShowInfo({ tvshow }: { tvshow: TVShowDetails }) {
  // Add move TVShowInfo fields here
  return (
    <>
      <li>
        <span className="font-bold">Runtime</span>
        <br />
        {formatRuntime(tvshow?.episode_run_time[0])}
      </li>
      <li>
        <span className="font-bold">Status</span>
        <br /> {tvshow?.status ?? "NA"}
      </li>
      <li>
        <span className="font-bold">Number of Seasons</span>
        <br /> {tvshow?.number_of_seasons ?? "NA"}
      </li>
      <li>
        <span className="font-bold">Number of Episodes</span>
        <br /> {tvshow?.number_of_episodes ?? "NA"}
      </li>
      <li>
        <span className="font-bold">Next Air Date</span>
        <br /> {formatDate(tvshow?.next_episode_to_air?.air_date) ?? "NA"}
      </li>
      {tvshow?.next_episode_to_air && (
        <li>
          <span className="font-bold">Next Episode To Air</span>
          <br />{" "}
          {`S${tvshow.next_episode_to_air.season_number} E${tvshow.next_episode_to_air.episode_number}` ??
            "NA"}
        </li>
      )}
      <li>
        <span className="font-bold">Last Air Date</span>
        <br /> {formatDate(tvshow?.last_air_date) ?? "NA"}
      </li>
      <li>
        <span className="font-bold">First Air Date</span>
        <br /> {formatDate(tvshow?.first_air_date)}
      </li>
      <li>
        <span className="font-bold">Original Language</span>
        <br />
        {formatLanguage(tvshow?.original_language)}
      </li>
    </>
  );
}

import {
  formatBudget,
  formatLanguage,
  formatReleaseDate,
  formatRuntime,
} from "@/lib/format";
import { MovieDetails, TVShowDetails } from "@/types";
import React from "react";
import Skeleton from "./Skeleton";

interface MediaDetailsProps {
  media: MovieDetails | TVShowDetails | undefined;
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
        <br /> {formatReleaseDate(movie?.release_date)}
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
        <span className="font-bold">first air Date</span>
        <br /> {formatReleaseDate(tvshow?.first_air_date)}
      </li>
      <li>
        <span className="font-bold">Original Language</span>
        <br />
        {formatLanguage(tvshow?.original_language)}
      </li>
    </>
  );
}

export default function MediaDetails({ media }: MediaDetailsProps) {
  return (
    <aside className="bg-primary/20 text-sm sm:text-md w-full sm:min-w-[220px] md:w-1/3 h-min p-4 rounded-md">
      {/* Select every child component (except last child) and add a margin-bottom */}
      <ul className="[&>*:not(:last-child)]:mb-4">
        {!media ? (
          Array(6).fill(
            <li key={Math.random()}>
              <Skeleton className="w-1/2" />
              <Skeleton className="w-1/3" />
            </li>
          )
        ) : media?.media_type === "movie" ? (
          <MovieInfo movie={media} />
        ) : (
          <TVShowInfo tvshow={media} />
        )}
      </ul>
    </aside>
  );
}

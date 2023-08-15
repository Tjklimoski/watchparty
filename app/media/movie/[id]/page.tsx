"use client";

import useSWR from "swr";
import fetcher from "@/lib/TMDBFetcher";
import { MovieDetails, Video } from "@/types";
import PageContainer from "@/components/PageContainer";
import Image from "next/image";
import { FaChevronLeft, FaPlus } from "react-icons/fa6";
import { BiSolidParty } from "react-icons/bi";
import {
  formatBudget,
  formatLanguage,
  formatReleaseDate,
  formatRuntime,
} from "@/lib/format";

export default function MovieIdPage({ params }: { params: { id: string } }) {
  // making request for movie it's /movie/mediaid
  // making request for tv it's /tv/mediaid
  const baseImgPath = "https://image.tmdb.org/t/p/";
  const imgSize = "original";
  const { id } = params;
  const {
    data: movie,
    isLoading,
    error,
  } = useSWR<MovieDetails>(`/movie/${id}`, fetcher);
  const imageUrl = `${baseImgPath}${imgSize}${movie?.backdrop_path ?? ""}`;
  const { data: videos, isLoading: videosIsLoading } = useSWR<Video[]>(
    movie && isLoading === false ? `/movie/${id}/videos` : null,
    fetcher
  );
  // Find the trailer key that matches the following criteria:
  const trailerKey =
    videos?.find(
      (video) =>
        video.type === "Trailer" &&
        video.key &&
        video.site === "YouTube" &&
        video.official === true
    )?.key ?? null;

  if (!isLoading && error) throw new Error("Invliad Movie Id");

  return isLoading ? (
    // create loading skeleton
    <div>Loading...</div>
  ) : (
    movie !== undefined && (
      // margin-top on PageContainer is to push the content down
      // to leave the space for the billboard image at the top.
      // 4rem and 5rem come from the height of the navbar at those sizes.
      <PageContainer styles="mt-[max(calc(180px-4rem),_calc(35svh-4rem))] sm:mt-[calc(45svh-5rem)]">
        {/* Top billboard component */}
        <div className="absolute top-0 left-0 w-full h-[35svh] sm:h-[45svh] min-h-[180px]">
          <Image
            src={imageUrl}
            alt={`${movie.title} billboard`}
            fill
            className="object-cover object-top brightness-75"
            priority
          />

          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 py-4 min-h-[14svh] flex items-end bg-gradient-to-t from-black via-black/75 via-30% to-transparent">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold drop-shadow-md break-balance webkit-truncate w-full max-w-[1440px] mx-auto">
              {movie.title}
            </h2>
          </div>
        </div>

        <section className="px-2 md:px-12">
          <div className="flex justify-between mb-8">
            <button
              className="btn btn-neutral btn-outline border-2 rounded-full aspect-square grid place-items-center tooltip normal-case"
              data-tip="Back"
              aria-label="Back"
            >
              <FaChevronLeft size={25} />
            </button>
            <div className="flex gap-4 ms-4">
              <button
                className="btn btn-secondary btn-outline rounded-full aspect-square border-2 grid place-items-center tooltip normal-case"
                data-tip="Create WatchParty"
                aria-label="Create WatchParty"
              >
                <BiSolidParty size={25} />
              </button>
              <button
                className="btn btn-primary btn-outline border-2 rounded-full aspect-square grid place-items-center tooltip normal-case"
                data-tip="Add to My List"
                aria-label="Add to My List"
              >
                <FaPlus size={25} />
              </button>
            </div>
          </div>

          <div className="flex sm:flex-row flex-col-reverse gap-4">
            <aside className="bg-neutral rounded-md min-w-[280px] w-1/3 p-4 h-min">
              <ul>
                <li>Runtime: {formatRuntime(movie.runtime)}</li>
                <li>
                  Genres:{" "}
                  {movie.genres.length === 0
                    ? "NA"
                    : movie.genres.map((genre) => genre.name).join(", ")}
                </li>
                <li>Status: {movie.status ?? "NA"}</li>
                <li>Release Date: {formatReleaseDate(movie.release_date)}</li>
                <li>
                  Original Language: {formatLanguage(movie.original_language)}
                </li>
                <li>Budget: {formatBudget(movie.budget)}</li>
              </ul>
            </aside>

            <article className="flex-grow">
              <p>{movie.overview}</p>
              {trailerKey && (
                <>
                  <h3>Trailer</h3>
                  <iframe
                    className="w-full aspect-[16/9] rounded-xl outline-none"
                    src={`https://www.youtube.com/embed/${trailerKey}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </>
              )}
            </article>
          </div>
        </section>
      </PageContainer>
    )
  );
}

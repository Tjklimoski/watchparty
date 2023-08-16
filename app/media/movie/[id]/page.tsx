"use client";

import useSWR from "swr";
import fetcher from "@/lib/TMDBFetcher";
import { useRouter } from "next/navigation";
import { CastCredit, MovieDetails, Video } from "@/types";
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
import Carousel from "@/components/Carousel";

export default function MovieIdPage({ params }: { params: { id: string } }) {
  // making request for movie it's /movie/mediaid
  // making request for tv it's /tv/mediaid
  const baseImgPath = "https://image.tmdb.org/t/p/";
  const imgSize = "original";
  const router = useRouter();
  const { id } = params;
  const {
    data: movie,
    isLoading,
    error,
  } = useSWR<MovieDetails>(`/movie/${id}`, fetcher);
  const imageUrl = `${baseImgPath}${imgSize}${movie?.backdrop_path ?? ""}`;
  const { data: videos, isLoading: videosIsLoading } = useSWR<Video[]>(
    `/movie/${id}/videos`,
    fetcher
  );
  const { data: credits, isLoading: creditsIsLoading } = useSWR<{
    cast: CastCredit[];
  }>(`/movie/${id}/credits`, fetcher);
  // Find the trailer key that matches the following criteria:
  const trailerKey =
    videos
      ?.reverse()
      .find(
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

        <section className="px-2 md:px-12 mb-8">
          <div className="flex justify-between mb-4 sm:mb-8">
            <button
              className="btn btn-neutral btn-outline border-2 rounded-full aspect-square grid place-items-center tooltip normal-case"
              data-tip="Back"
              aria-label="Back"
              onClick={() => router.back()}
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

          <div className="flex md:flex-row flex-col-reverse gap-4">
            <aside className="bg-neutral/90 text-sm sm:text-md rounded-md min-w-[150px] sm:min-w-[280px] w-full md:w-1/3 p-4 h-min">
              {/* Select every child component (except last child) and add a margin-bottom */}
              <ul className="[&>*:not(:last-child)]:mb-4">
                <li>
                  <strong>Runtime</strong>
                  <br />
                  {formatRuntime(movie.runtime)}
                </li>
                <li>
                  <strong>Genres</strong>
                  <br />
                  {movie.genres.length === 0
                    ? "NA"
                    : movie.genres.map((genre) => {
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
                  <strong>Status</strong>
                  <br /> {movie.status ?? "NA"}
                </li>
                <li>
                  <strong>Release Date</strong>
                  <br /> {formatReleaseDate(movie.release_date)}
                </li>
                <li>
                  <strong>Original Language</strong>
                  <br />
                  {formatLanguage(movie.original_language)}
                </li>
                <li>
                  <strong>Budget</strong>
                  <br />
                  {formatBudget(movie.budget)}
                </li>
              </ul>
            </aside>

            {/* Min-w-0 to allow for the carousel to overflow, but for the flex item to not spill out of it's parent container */}
            <article className="flex-grow min-w-0">
              <p className="mb-4 md:mb-8 text-md sm:text-lg leading-relaxed">
                {movie.overview}
              </p>

              <h3 className="text-xl sm:text-2xl mb-2 font-semibold">Cast</h3>
              {/* Implement this carousel into the exisiting carousel componenet. allow for user to add custom css to carousel when needed */}
              <div className="grid grid-flow-col overflow-x-scroll gap-2 mb-4 md:mb-8">
                {credits?.cast.map((cast, index) => {
                  // Only show up to the first 10 cast memebers in the list
                  if (index > 9) return null;
                  return (
                    <div
                      key={index}
                      className="flex flex-col w-36 p-2 snap-start gap-2 bg-neutral bg-opacity-50 rounded-md"
                    >
                      <Image
                        className="w-full aspect-poster object-cover rounded-sm"
                        alt="Cast photo"
                        src={`${baseImgPath}w185${cast.profile_path ?? ""}`}
                        width={128}
                        height={192}
                      />
                      <h4 className="font-semibold">{cast.name}</h4>
                      <span className="font-light text-sm">
                        {cast.character}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* ADD CAST CAROUSEL: img, name, character */}
              {trailerKey && (
                <>
                  <h3 className="text-xl sm:text-2xl mb-2 font-semibold">
                    Trailer
                  </h3>
                  <iframe
                    className="w-full aspect-[16/9] rounded-md sm:rounded-xl outline-none"
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

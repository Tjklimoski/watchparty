"use client";

import useSWR from "swr";
import fetcher from "@/lib/TMDBFetcher";
import { MovieDetails } from "@/types";
import PageContainer from "@/components/PageContainer";
import Image from "next/image";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaChevronLeft, FaPlus } from "react-icons/fa6";
import { BiSolidParty } from "react-icons/bi";
import AccentBtn from "@/components/AccentBtn";

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

        <section className="flex justify-between px-2 md:px-12">
          <button
            className="btn btn-neutral btn-outline border-2 rounded-full aspect-square grid place-items-center tooltip normal-case"
            data-tip="Back"
          >
            <FaChevronLeft size={25} />
          </button>
          <div className="flex gap-4 ms-4">
            <button
              className="btn btn-secondary btn-outline rounded-full aspect-square border-2 grid place-items-center tooltip normal-case"
              data-tip="Create WatchParty"
            >
              <BiSolidParty size={25} />
            </button>
            <button
              className="btn btn-primary btn-outline border-2 rounded-full aspect-square grid place-items-center tooltip normal-case"
              data-tip="Add to My List"
            >
              <FaPlus size={25} />
            </button>
          </div>
        </section>
      </PageContainer>
    )
  );
}

"use client";

import useSWR from "swr";
import fetcher from "@/lib/TMDBFetcher";
import { useRouter } from "next/navigation";
import { CastCredit, MovieDetails, MyListItem, User, Video } from "@/types";
import PageContainer from "@/components/PageContainer";
import Image from "next/image";
import { FaChevronLeft, FaPlus, FaCheck } from "react-icons/fa6";
import { BiSolidParty } from "react-icons/bi";
import {
  formatBudget,
  formatLanguage,
  formatReleaseDate,
  formatRuntime,
} from "@/lib/format";
import axios from "axios";
import APIFetcher from "@/lib/APIFetcher";
import { useCallback } from "react";
import Trailer from "@/components/Trailer";
import ActorCard from "@/components/ActorCard";
import Carousel from "@/components/Carousel";
import Skeleton from "@/components/Skeleton";
import MediaDetails from "@/components/MediaDetails";

// Move into a use Server component
async function addToMyList(
  id: string,
  media_type: string
): Promise<User | undefined> {
  return axios
    .post("/api/user/my-list", { id, media_type })
    .then((res) => res.data);
}

async function removeFromMyList(
  id: string,
  media_type: string
): Promise<User | undefined> {
  return axios
    .delete("/api/user/my-list", { data: { id, media_type } })
    .then((res) => res.data);
}

export default function MovieIdPage({ params }: { params: { id: string } }) {
  // making request for movie it's /movie/mediaid
  // making request for tv it's /tv/mediaid
  const baseImgPath = "https://image.tmdb.org/t/p/";
  const imgSize = "original";
  const router = useRouter();
  const { id } = params;
  const {
    data: movie,
    isLoading: movieIsLoading,
    error: movieError,
  } = useSWR<MovieDetails>(`/movie/${id}`, fetcher);
  const imageUrl = `${baseImgPath}${imgSize}${movie?.backdrop_path ?? ""}`;
  const { data: credits, isLoading: creditsIsLoading } = useSWR<{
    cast: CastCredit[];
  }>(`/movie/${id}/credits`, fetcher);
  const { data: user, mutate: userMutate } = useSWR<User>("/user", APIFetcher);
  const inMyList: () => boolean = useCallback(() => {
    if (!user || !movie) return false;
    return user?.myList.some(
      (item: MyListItem) =>
        item.id === id && item.media_type === movie.media_type
    );
  }, [user, id, movie]);

  if (!movieIsLoading && movieError) throw new Error("Invliad Movie Id");

  return (
    // margin-top on PageContainer is to push the content down
    // to leave the space for the billboard image at the top.
    // 4rem and 5rem come from the height of the navbar at those sizes.
    <PageContainer styles="mt-[max(calc(180px-4rem),_calc(35svh-4rem))] sm:mt-[calc(45svh-5rem)]">
      {/* Top billboard component */}
      <div className="absolute top-0 left-0 w-full h-[35svh] sm:h-[45svh] min-h-[180px]">
        <Image
          src={imageUrl}
          alt={`${movie?.title} billboard`}
          fill
          className="object-cover object-top brightness-75"
          priority
        />

        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 py-4 min-h-[14svh] flex items-end bg-gradient-to-t from-black via-black/75 via-30% to-transparent">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold drop-shadow-md break-balance webkit-truncate w-full max-w-[1440px] mx-auto">
            {movie?.title}
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
              className={`btn btn-primary ${
                !inMyList() && "btn-outline"
              } border-2 rounded-full aspect-square grid place-items-center tooltip normal-case transition duration-300`}
              data-tip={inMyList() ? "Remove from My List" : "Add to My List"}
              aria-label={inMyList() ? "Remove from My List" : "Add to My List"}
              onClick={
                inMyList()
                  ? async () => {
                      try {
                        const updatedUser = await removeFromMyList(
                          id,
                          movie?.media_type ?? ""
                        );

                        if (updatedUser === undefined) {
                          throw new Error("No updated user");
                        }

                        userMutate({ ...user!, myList: updatedUser.myList });
                      } catch (err) {
                        console.log(err);
                      }
                    }
                  : async () => {
                      try {
                        const updatedUser = await addToMyList(
                          id,
                          movie?.media_type ?? ""
                        );

                        if (updatedUser === undefined) {
                          throw new Error("No updated user");
                        }

                        // update user data to reflect change in myList state and update myList button appearence
                        userMutate({ ...user!, myList: updatedUser.myList });
                      } catch (err) {
                        console.log(err);
                      }
                    }
              }
            >
              {inMyList() ? <FaCheck size={25} /> : <FaPlus size={25} />}
            </button>
          </div>
        </div>

        <div className="flex md:flex-row flex-col-reverse gap-4">
          <MediaDetails media={movie} />

          {/* min-w-0 to stop the flex item from spilling out of it's parent container when the carousel renders */}
          <article className="flex-grow min-w-0">
            {movieIsLoading ? (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton className="w-2/5 mb-4 sm:mb-8" />
              </>
            ) : (
              movie && (
                <p className="mb-4 md:mb-8 text-md sm:text-lg leading-relaxed">
                  {movie.overview}
                </p>
              )
            )}

            <Carousel heading={creditsIsLoading ? "" : "Cast"} tight>
              {creditsIsLoading
                ? Array(7)
                    .fill(null)
                    .map((item, i) => (
                      <Skeleton
                        key={i}
                        className="w-28 sm:w-36 h-full aspect-[1/1.85]"
                      />
                    ))
                : credits &&
                  credits?.cast.map((actor, index) => {
                    // Only show up to the first 10 cast memebers in the list
                    if (index > 9) return null;
                    return <ActorCard key={index} actor={actor} />;
                  })}
            </Carousel>

            <Trailer id={id} />
          </article>
        </div>
      </section>
    </PageContainer>
  );
}

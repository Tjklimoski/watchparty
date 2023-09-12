"use client";

import Billboard from "@/components/media/Billboard";
import BackBtn from "@/components/util/BackBtn";
import Container from "@/components/util/Container";
import useUser from "@/hooks/useUser";
import apiFetcher from "@/lib/APIFetcher";
import fetcher from "@/lib/TMDBFetcher";
import { Episode, MovieDetails, TVShowDetails, WatchParty } from "@/types";
import useSWR from "swr";
import { MdEdit } from "react-icons/md";
import MediaDetails from "@/components/media/MediaDetails";
import { useRouter } from "next/navigation";
import { getFirstName } from "@/lib/stringModifications";
import ProfileIcon from "@/components/util/ProfileIcon";
import Link from "next/link";
import { formatDate, formatTime } from "@/lib/format";
import { useState } from "react";
import Skeleton from "@/components/util/Skeleton";
import ProfileIconGroup from "@/components/util/ProfileIconGroup";

export default function EventPage({ params }: { params: { partyid: string } }) {
  const [showAllPartygoers, setShowAllPartygoers] = useState(false);
  const [showAllInterested, setShowAllInterested] = useState(false);
  const router = useRouter();
  const { partyid } = params;

  // Fetch watchParty Data
  const { data: watchParty, error: watchPartyError } = useSWR<WatchParty>(
    `/watchparties/${partyid}`,
    apiFetcher
  );
  if (watchPartyError) throw new Error("No WatchParty found");

  // Fetch media Data
  const { data: media, error: mediaError } = useSWR<
    MovieDetails | TVShowDetails
  >(watchParty && `/${watchParty.mediaType}/${watchParty.mediaId}`, fetcher);
  if (mediaError) throw new Error("No media found");

  // If TV Show, fetch episode data (for episode title and still path)
  const { data: episode, error: episodeError } = useSWR<Episode>(
    watchParty &&
      watchParty.mediaType === "tv" &&
      `/tv/${watchParty.mediaId}/season/${watchParty.season}/episode/${watchParty.episode}`,
    fetcher
  );
  if (watchParty?.mediaType === "tv" && episodeError)
    throw new Error("Invalid episode");

  // Fetch current user data
  const { user } = useUser();

  // Fetch WatchParty creator/host data
  const { user: host } = useUser(watchParty && watchParty?.userId);

  const eventDate = new Date(watchParty?.date ?? "");

  return (
    <main className="mt-[max(calc(180px-4rem),_calc(35svh-4rem))] sm:mt-[max(calc(220px-5rem),_calc(45svh-5rem))] mb-10">
      <Container>
        <Billboard media={media} watchparty episode={episode} />

        <section>
          <div className="flex justify-between mb-4 sm:mb-8">
            <BackBtn />
            <div className="flex gap-4 ms-4">
              {/* Interested in Button */}
              {/* Party Goer Button */}
              {user && watchParty && user.id === watchParty.userId && (
                <button
                  className="btn btn-circle btn-info btn-outline border-2 grid place-items-center tooltip tooltip-primary normal-case"
                  data-tip="Edit"
                  aria-label="Edit your WatchParty"
                  onClick={() =>
                    router.push(`/watchparty/${watchParty.id}/edit`)
                  }
                >
                  <MdEdit size={30} />
                </button>
              )}
            </div>
          </div>

          <div className="flex md:flex-row flex-col-reverse gap-4">
            <MediaDetails media={media} />

            <article className="flex-grow min-w-0 [&>*:not(:last-child)]:mb-4">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                <p className="font-semibold text-success text-center sm:text-left">
                  WatchParty is 35 miles away
                  {/* Event distance from current user - color code based on their radius (success or warning) */}
                </p>
                {host?.id === user?.id ? (
                  <p className="ms-2 text-center sm:text-right">
                    Hosted by you
                  </p>
                ) : (
                  <Link
                    href={`/user/${host?.id}`}
                    className="grid grid-flow-col place-items-center gap-2 group ms-2 text-center sm:text-right"
                  >
                    <p>
                      Hosted by{" "}
                      <span className="group-hover:text-primary group-focus:text-primary">
                        {getFirstName(host?.name ?? "")}
                      </span>
                    </p>
                    <ProfileIcon id={host?.id} size={30} />
                  </Link>
                )}
              </div>

              <h3
                className={`text-2xl sm:text-4xl font-semibold px-4 py-2 ${
                  watchParty?.mediaType === "movie"
                    ? "bg-primary"
                    : "bg-secondary"
                } text-base-100 rounded-md ${
                  watchParty?.mediaType === "movie"
                    ? "shadow-primary/25"
                    : "shadow-secondary/25"
                } shadow-lg`}
              >
                {watchParty?.title}
              </h3>

              <div className="text-md xs:text-lg sm:text-xl leading-relaxed whitespace-pre-wrap bg-neutral/30 py-2 px-4 rounded-lg">
                <p>{watchParty?.description}</p>
              </div>

              <div className="text-md xs:text-lg sm:text-xl leading-relaxed whitespace-pre-wrap bg-neutral/30 py-2 px-4 rounded-lg">
                <p className="text-xl sm:text-2xl font-semibold mb-4">
                  WatchParty Details
                </p>
                <div className="grid grid-flow-row xs:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6">
                  <div>
                    <div
                      className={`font-semibold py-1 px-2 rounded-md mb-2 ${
                        watchParty?.mediaType === "movie"
                          ? "bg-primary/40"
                          : "bg-secondary/40"
                      }`}
                    >
                      Date
                    </div>
                    <p className="mx-2">{formatDate(watchParty?.date)}</p>
                  </div>
                  <div>
                    <div
                      className={`font-semibold py-1 px-2 rounded-md mb-2 ${
                        watchParty?.mediaType === "movie"
                          ? "bg-primary/40"
                          : "bg-secondary/40"
                      }`}
                    >
                      Time
                    </div>
                    <p className="mx-2">{formatTime(watchParty?.date)}</p>
                  </div>
                  <div>
                    <div
                      className={`font-semibold py-1 px-2 rounded-md mb-2 ${
                        watchParty?.mediaType === "movie"
                          ? "bg-primary/40"
                          : "bg-secondary/40"
                      }`}
                    >
                      Address
                    </div>
                    <p className="mx-2">
                      {watchParty?.address}
                      <br />
                      {watchParty?.city}, {watchParty?.state}
                      <br />
                      {watchParty?.zip}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-md xs:text-lg sm:text-xl leading-relaxed bg-neutral/30 py-2 px-4 rounded-lg grid grid-flow-row xs:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
                <div>
                  <div
                    className={`font-semibold py-1 px-2 rounded-md mb-2 ${
                      watchParty?.mediaType === "movie"
                        ? "bg-primary/40"
                        : "bg-secondary/40"
                    }`}
                  >
                    Partygoers
                  </div>
                  <ProfileIconGroup
                    userIds={watchParty?.partygoerIds}
                    size={50}
                    handleClick={() => {}}
                  >
                    {/* Children is the fallback if userIds array is empty */}
                    Be the first Partygoer!
                  </ProfileIconGroup>
                </div>
                <div>
                  <div
                    className={`font-semibold py-1 px-2 rounded-md mb-2 ${
                      watchParty?.mediaType === "movie"
                        ? "bg-primary/40"
                        : "bg-secondary/40"
                    }`}
                  >
                    Interested Users
                  </div>
                  <ProfileIconGroup
                    userIds={watchParty?.interestedUsersIds}
                    size={50}
                    handleClick={() => {}}
                  >
                    No interested users.
                  </ProfileIconGroup>
                </div>
              </div>
            </article>
          </div>

          {/* number of interested in watchParty */}
        </section>

        {/* Popup overlay boxes of party goers, and interested in. Each person on the list will be a clickable link to their profile, use dialogue element */}
      </Container>
    </main>
  );
}

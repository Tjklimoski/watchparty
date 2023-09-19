"use client";

import Billboard from "@/components/media/Billboard";
import BackBtn from "@/components/util/BackBtn";
import Container from "@/components/util/Container";
import useUser from "@/hooks/useUser";
import apiFetcher, { API } from "@/lib/APIFetcher";
import fetcher from "@/lib/TMDBFetcher";
import { Episode, MovieDetails, TVShowDetails, WatchParty } from "@/types";
import useSWR from "swr";
import MediaDetails from "@/components/media/MediaDetails";
import { getFirstName } from "@/lib/stringModifications";
import ProfileIcon from "@/components/util/ProfileIcon";
import Link from "next/link";
import { formatDate, formatTime } from "@/lib/format";
import { useEffect, useRef, useState } from "react";
import ProfileIconGroup from "@/components/util/ProfileIconGroup";
import { getUserDistanceFrom } from "@/lib/Geocode";
import AttendBtn from "@/components/watchparty/AttendBtn";
import InterestedBtn from "@/components/watchparty/InterestedBtn";
import Skeleton from "@/components/util/Skeleton";
import EditBtn from "@/components/watchparty/EditBtn";

export default function EventPage({ params }: { params: { partyid: string } }) {
  const [distance, setDistance] = useState(-1);
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
  if (mediaError) throw new Error("No Media found");

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

  // highlight distance in warning color if distance is -1 or outside user's radius
  const warnDistance = distance === -1 || (user && distance > user.radius);

  const color = watchParty?.mediaType === "tv" ? "secondary" : "primary";

  // fetch and set the distance the user is from the WatchParty
  useEffect(() => {
    if (!watchParty?.geo?.coordinates) return;
    const coordinates = watchParty.geo.coordinates;
    getUserDistanceFrom(coordinates)
      .then((miles) => setDistance(miles))
      .catch((err: Error | any) => {
        console.error(err?.message ?? err);
      });
  }, [watchParty]);

  return (
    <main className="mt-[max(calc(180px-4rem),_calc(35svh-4rem))] sm:mt-[max(calc(220px-5rem),_calc(45svh-5rem))] mb-10">
      <Container>
        <Billboard media={media} watchparty episode={episode} />

        <section>
          <div className="flex justify-between mb-4 sm:mb-8">
            <BackBtn />
            <div className="flex gap-4 ms-4 items-center">
              {!watchParty || !host || !user ? (
                <>
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <Skeleton className="w-12 h-12 rounded-full" />
                </>
              ) : user.id === host.id ? (
                <EditBtn watchPartyId={watchParty.id} />
              ) : (
                <>
                  <InterestedBtn watchPartyId={watchParty.id} tooltip />
                  <AttendBtn watchPartyId={watchParty.id} tooltip />
                </>
              )}
            </div>
          </div>

          <div className="flex md:flex-row flex-col-reverse gap-4">
            <MediaDetails media={media} />

            <article className="flex-grow min-w-0 [&>*:not(:last-child)]:mb-4">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                {watchParty && user ? (
                  <p
                    className={`font-semibold ${
                      warnDistance ? "text-warning" : "text-success"
                    } text-center sm:text-left`}
                  >
                    {distance === -1 ? "NA" : distance}{" "}
                    {distance === 1 ? "mile" : "miles"} away
                  </p>
                ) : (
                  <Skeleton className="max-w-[12ch]" />
                )}

                {!host || !user ? (
                  <Skeleton className="max-w-[18ch]" />
                ) : host.id === user.id ? (
                  <p className="ms-2 text-center sm:text-right">
                    Hosted by you
                  </p>
                ) : (
                  <Link
                    href={`/user/${host.id}`}
                    className="grid grid-flow-col place-items-center gap-2 group ms-2 text-center sm:text-right"
                  >
                    <p>
                      Hosted by{" "}
                      <span className="group-hover:text-primary group-focus:text-primary">
                        {getFirstName(host.name ?? "")}
                      </span>
                    </p>
                    <ProfileIcon id={host.id} size={30} />
                  </Link>
                )}
              </div>

              {watchParty ? (
                <h3
                  className={`text-2xl sm:text-4xl font-semibold px-4 py-2 bg-${color} text-base-100 rounded-md shadow-${color}/25 shadow-lg`}
                >
                  {watchParty.title}
                </h3>
              ) : (
                <Skeleton className="h-12 sm:h-14 mb-4" />
              )}

              <div className="text-md xs:text-lg sm:text-xl leading-relaxed whitespace-pre-wrap bg-neutral/30 py-2 px-4 rounded-lg break-words">
                {watchParty ? (
                  <p>{watchParty.description}</p>
                ) : (
                  <>
                    <Skeleton className="sm:h-6 sm:mb-4" />
                    <Skeleton className="sm:h-6 sm:mb-4" />
                    <Skeleton className="sm:h-6 sm:mb-4" />
                    <Skeleton className="sm:h-6 max-w-[33%]" />
                  </>
                )}
              </div>

              <div className="text-md xs:text-lg sm:text-xl leading-relaxed whitespace-pre-wrap py-2 px-4 rounded-lg">
                <p className="text-xl sm:text-2xl font-semibold mb-4">
                  WatchParty Details
                </p>
                <div className="grid grid-flow-row xs:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6">
                  {/* DATE */}
                  <div>
                    <div
                      className={`font-semibold py-1 px-2 rounded-md mb-2 bg-${color}/40`}
                    >
                      Date
                    </div>
                    {watchParty ? (
                      <p className="mx-2">{formatDate(watchParty.date)}</p>
                    ) : (
                      <Skeleton className="h-6 sm:h-8 max-w-[12ch]" />
                    )}
                  </div>

                  {/* TIME */}
                  <div>
                    <div
                      className={`font-semibold py-1 px-2 rounded-md mb-2 bg-${color}/40`}
                    >
                      Time
                    </div>
                    {watchParty ? (
                      <p className="mx-2">{formatTime(watchParty.date)}</p>
                    ) : (
                      <Skeleton className="h-6 sm:h-8 max-w-[7ch]" />
                    )}
                  </div>

                  {/* ADDRESS */}
                  <div>
                    <div
                      className={`font-semibold py-1 px-2 rounded-md mb-2 bg-${color}/40`}
                    >
                      Address
                    </div>
                    {watchParty ? (
                      <p className="mx-2">
                        {watchParty.address}
                        <br />
                        {watchParty.city}, {watchParty.state}
                        <br />
                        {watchParty.zip}
                      </p>
                    ) : (
                      <>
                        <Skeleton className="h-6 sm:h-8 max-w-[15ch]" />
                        <Skeleton className="h-6 sm:h-8 max-w-[15ch]" />
                        <Skeleton className="h-6 sm:h-8 max-w-[5ch]" />
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-md xs:text-lg sm:text-xl leading-relaxed py-2 px-4 rounded-lg grid grid-flow-row xs:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
                {/* PARTYGOERS */}
                <div>
                  <div
                    className={`font-semibold py-1 px-2 rounded-md mb-2 bg-${color}/40`}
                  >
                    Partygoers
                  </div>
                  <ProfileIconGroup
                    title="Partygoers"
                    userIds={watchParty?.partygoerIds}
                    iconSize={50}
                  >
                    {/* Children are the fallback if userIds array is empty */}
                    Be the first Partygoer!
                  </ProfileIconGroup>
                </div>

                {/* INTERESTED */}
                <div>
                  <div
                    className={`font-semibold py-1 px-2 rounded-md mb-2 bg-${color}/40`}
                  >
                    Interested Users
                  </div>
                  <ProfileIconGroup
                    title="Interested"
                    userIds={watchParty?.interestedUsersIds}
                    iconSize={50}
                  >
                    No interested users.
                  </ProfileIconGroup>
                </div>
              </div>
            </article>
          </div>
        </section>
      </Container>
    </main>
  );
}

"use client";

import Billboard from "@/components/media/Billboard";
import BackBtn from "@/components/util/BackBtn";
import Container from "@/components/util/Container";
import useUser from "@/hooks/useUser";
import apiFetcher from "@/lib/APIFetcher";
import fetcher from "@/lib/TMDBFetcher";
import { MovieDetails, TVShowDetails, WatchParty } from "@/types";
import useSWR from "swr";
import { MdEdit } from "react-icons/md";
import MediaDetails from "@/components/media/MediaDetails";
import { useRouter } from "next/navigation";

export default function EventPage({ params }: { params: { partyid: string } }) {
  const router = useRouter();
  const { partyid } = params;
  const { data: watchParty, error: watchPartyError } = useSWR<WatchParty>(
    `/watchparties/${partyid}`,
    apiFetcher
  );
  if (watchPartyError) throw new Error("No WatchParty found");
  const { data: media, error: mediaError } = useSWR<
    MovieDetails | TVShowDetails
  >(watchParty && `/${watchParty.mediaType}/${watchParty.mediaId}`, fetcher);
  if (mediaError) throw new Error("No media found");
  const { user } = useUser();

  return (
    <main className="mt-[max(calc(180px-4rem),_calc(35svh-4rem))] sm:mt-[max(calc(220px-5rem),_calc(45svh-5rem))] mb-10">
      <Container>
        <Billboard media={media} watchparty />

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
                  onClick={() => router.push(`/watchparty/${partyid}/edit`)}
                >
                  <MdEdit size={30} />
                </button>
              )}
            </div>
          </div>

          <div className="flex md:flex-row flex-col-reverse gap-4">
            <MediaDetails media={media} />

            <article className="flex-grow min-w-0"></article>
          </div>

          {/* Event distance from current user - color code based on their radius (success or warning) */}
          {/* media title - link to it's media page /tv/id or /movie/id */}
          {/* if TV show show season and episode number + title */}
          {/* WatchParty user host first name */}
          {/* Number of party goers, and show their profile icon and have them link to their public /user/id page  */}
          {/* number of interested in watchParty */}
          {/* WatchParty description, date, time, location */}
        </section>
      </Container>
    </main>
  );
}

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

export default function EventPage({ params }: { params: { partyid: string } }) {
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
        <Billboard media={media} title={watchParty?.title} />

        <section>
          <div className="flex justify-between mb-4 sm:mb-8">
            <BackBtn />
            <div className="flex gap-4 ms-4">
              {/* Interested in Button */}
              {/* Party Goer Button */}
              {user && watchParty && user.id === watchParty.userId && (
                <button
                  className="btn btn-circle btn-primary btn-outline border-2 grid place-items-center tooltip tooltip-primary normal-case"
                  data-tip="Edit"
                  aria-label="Edit your WatchParty"
                >
                  <MdEdit size={30} />
                </button>
              )}
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}

"use client";

import Billboard from "@/components/media/Billboard";
import BackBtn from "@/components/util/BackBtn";
import Container from "@/components/util/Container";
import apiFetcher from "@/lib/APIFetcher";
import fetcher from "@/lib/TMDBFetcher";
import { Episode, MovieDetails, TVShowDetails, WatchParty } from "@/types";
import useSWR from "swr";
import MediaDetails from "@/components/media/MediaDetails";
import Distance from "@/components/watchparty/Distance";
import ActionBtns from "@/components/watchparty/ActionBtns";
import Host from "@/components/watchparty/Host";
import EventTitle from "@/components/watchparty/EventTitle";
import Description from "@/components/watchparty/Description";
import DateTile from "@/components/watchparty/DateTile";
import TimeTile from "@/components/watchparty/TimeTile";
import AddressTile from "@/components/watchparty/AddressTile";
import PartygoersTile from "@/components/watchparty/PartygoersTile";
import InterestedUsersTile from "@/components/watchparty/InterestedUsersTile";

export default function EventPage({ params }: { params: { partyid: string } }) {
  const { partyid } = params;

  // Fetch watchParty Data
  const {
    data: watchParty,
    error: watchPartyError,
    mutate: watchPartyMutate,
  } = useSWR<WatchParty>(`/watchparties/${partyid}`, apiFetcher);
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

  function updateWatchPartyData(data: WatchParty) {
    watchPartyMutate(data, { revalidate: false });
  }

  // heading background color based on media type
  const color = watchParty?.mediaType === "tv" ? "secondary" : "primary";

  return (
    <main className="mt-[max(calc(180px-4rem),_calc(35svh-4rem))] sm:mt-[max(calc(220px-5rem),_calc(45svh-5rem))] mb-10">
      <Container>
        <Billboard media={media} watchparty episode={episode} />

        <section>
          <div className="flex justify-between mb-4 sm:mb-8">
            <BackBtn />
            <ActionBtns
              watchPartyId={watchParty?.id}
              hostId={watchParty?.userId}
              updateWatchPartyData={updateWatchPartyData}
            />
          </div>

          <div className="flex md:flex-row flex-col-reverse gap-4">
            <MediaDetails media={media} />

            <article className="flex-grow min-w-0 [&>*:not(:last-child)]:mb-4">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                <Distance watchPartyCoords={watchParty?.geo?.coordinates} />
                <Host hostId={watchParty?.userId} />
              </div>

              <EventTitle title={watchParty?.title} color={color} />
              <Description description={watchParty?.description} />

              <div className="text-md xs:text-lg sm:text-xl leading-relaxed whitespace-pre-wrap py-2 px-4 rounded-lg">
                <p className="text-xl sm:text-2xl font-semibold mb-4">
                  WatchParty Details
                </p>
                <div className="grid grid-flow-row xs:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6">
                  <DateTile date={watchParty?.date} color={color} />
                  <TimeTile date={watchParty?.date} color={color} />
                  <AddressTile
                    address={watchParty?.address}
                    city={watchParty?.city}
                    state={watchParty?.state}
                    zip={watchParty?.zip}
                    color={color}
                  />
                </div>
              </div>

              <div className="text-md xs:text-lg sm:text-xl leading-relaxed py-2 px-4 rounded-lg grid grid-flow-row xs:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
                <PartygoersTile
                  partygoerIds={watchParty?.partygoerIds}
                  color={color}
                />
                <InterestedUsersTile
                  interestedUsersIds={watchParty?.interestedUsersIds}
                  color={color}
                />
              </div>
            </article>
          </div>
        </section>
      </Container>
    </main>
  );
}

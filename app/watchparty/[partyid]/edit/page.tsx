"use client";

import Container from "@/components/util/Container";
import WatchPartyForm from "@/components/form/WatchPartyForm";
import useSWR from "swr";
import { WatchParty, WatchPartyInputs } from "@/types";
import APIFetcher from "@/lib/APIFetcher";
import { formatFullDate } from "@/lib/format";

export default function CreateWatchPartyPage({
  params,
}: {
  params: { partyid: string };
}) {
  const { partyid: id } = params;
  const { data: watchParty, error } = useSWR<WatchParty>(
    id && `/watchparties/${id}`,
    APIFetcher
  );
  if (error) throw new Error("Invalid WatchParty Id");

  let inputValues: WatchPartyInputs | undefined;
  if (watchParty) {
    // modify watchParty data into form Input values
    inputValues = {
      ...watchParty,
      date: formatFullDate(new Date(watchParty.date)), // returns "YYYY-MM-DD"
      time: new Date(watchParty.date).toLocaleTimeString(),
      zip: watchParty.zip,
    };
  }

  return (
    <main className="min-h-screen">
      <Container>
        <WatchPartyForm {...watchParty} inputValues={inputValues} update />
      </Container>
    </main>
  );
}

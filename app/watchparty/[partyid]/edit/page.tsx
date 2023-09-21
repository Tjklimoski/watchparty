"use client";

import Container from "@/components/util/Container";
import WatchPartyForm from "@/components/form/WatchPartyForm";
import useSWR from "swr";
import { WatchParty, WatchPartyInputs } from "@/types";
import APIFetcher from "@/lib/APIFetcher";
import { formatFullDate } from "@/lib/format";
import useUser from "@/hooks/useUser";
import { useState } from "react";

export default function EditWatchPartyPage({
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

  // Get current signed in user and validate that they're the host of this watchparty.
  const { user } = useUser();
  if (watchParty && user && watchParty.userId !== user.id)
    throw new Error("Unauthorized");

  let inputValues: WatchPartyInputs | undefined;
  if (watchParty) {
    const { title, description, address, city, state, zip } = watchParty;
    // modify watchParty data into form Input values
    inputValues = {
      title,
      description,
      address,
      city,
      state,
      zip,
      date: formatFullDate(new Date(watchParty.date)), // returns "YYYY-MM-DD"
      time: new Date(watchParty.date).toLocaleTimeString(),
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

"use client";

import SearchBar from "@/components/util/SearchBar";
import useUser from "@/hooks/useUser";
import { API } from "@/lib/APIFetcher";
import { getUserCoord } from "@/lib/Geocode";
import { WatchParty } from "@/types";
import React, { useEffect, useState } from "react";

export default function WatchPartyPage() {
  const { user } = useUser();
  const [watchParties, setWatchParties] = useState<WatchParty[]>([]);

  const endpoint = "/watchparties/new";

  useEffect(() => {
    if (!user) return;
    async function getWatchPartiesNearBy() {
      try {
        const params = {
          radius: user!.radius,
          coordinates: await getUserCoord(),
        };

        const filteredWatchParties = await API.get<WatchParty[]>(endpoint, {
          params,
        }).then((res) => res.data);

        if (!filteredWatchParties) throw new Error("Invalid request");

        setWatchParties(filteredWatchParties);
      } catch (err) {
        console.error(err);
      }
    }

    getWatchPartiesNearBy();
  }, [user]);

  return (
    <div>
      <h1 className="text-3xl">{endpoint}</h1>
      {/* SearchBar just placeholder for now */}
      <SearchBar />
      {JSON.stringify(watchParties)}
    </div>
  );
}

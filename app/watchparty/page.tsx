"use client";

import useUser from "@/hooks/useUser";
import { API } from "@/lib/APIFetcher";
import { getUserCoord } from "@/lib/Geocode";
import { WatchParty } from "@/types";
import React, { useEffect, useState } from "react";

export default function WatchPartyPage() {
  const { user } = useUser();
  const [watchParties, setWatchParties] = useState<WatchParty[]>([]);

  useEffect(() => {
    async function getWatchPartiesNearBy() {
      try {
        if (!user) throw new Error("No current user");
        const params = {
          radius: user.radius,
          coordinates: await getUserCoord(),
        };

        const filteredWatchParties = await API.get<WatchParty[]>(
          "/watchparties",
          { params }
        ).then((res) => res.data);

        if (!filteredWatchParties) throw new Error("Invalid request");

        setWatchParties(filteredWatchParties);
      } catch (err) {
        console.error(err);
      }
    }

    getWatchPartiesNearBy();
  }, [user]);

  return <div>{JSON.stringify(watchParties)}</div>;
}

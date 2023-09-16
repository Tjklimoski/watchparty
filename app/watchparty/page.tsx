"use client";

import useUser from "@/hooks/useUser";
import { API } from "@/lib/APIFetcher";
import { getUserCoord } from "@/lib/Geocode";
import { User, WatchParty } from "@/types";
import React, { useEffect, useState } from "react";

export default function WatchPartyPage() {
  const { user } = useUser();
  const [watchParties, setWatchParties] = useState<WatchParty[]>([]);

  useEffect(() => {
    if (!user) return;

    async function getWatchParties() {
      if (!user) return;
      try {
        const params = {
          radius: user.radius,
          coordinates: await getUserCoord(),
        };

        return await API.get<WatchParty[]>("/watchparties", { params }).then(
          (res) => res.data
        );
      } catch (err) {
        console.error(err);
      }
    }

    getWatchParties().then((res) => {
      if (!res) return;
      setWatchParties(res);
    });
  }, [user]);

  return <div>{JSON.stringify(watchParties)}</div>;
}

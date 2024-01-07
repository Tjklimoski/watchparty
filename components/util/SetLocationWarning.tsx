"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getUserCoord } from "@/lib/Geocode";

export default function SetLocationWarning() {
  const [hasLocationData, setHasLocationData] = useState(true);

  useEffect(() => {
    async function checkForLocation() {
      try {
        await getUserCoord();
        setHasLocationData(true);
      } catch {
        setHasLocationData(false);
      }
    }

    checkForLocation();
  }, []);

  return (
    !hasLocationData && (
      <p className="text-error text-lg">
        No location set. Please allow WatchParty to access your location, or set
        your location in{" "}
        <Link
          className="underline text-primary hover:text-primary-focus focue:text-primary-focus outline-none focus:outline-primary"
          href={`/user/settings`}
        >
          settings
        </Link>
        .
      </p>
    )
  );
}

import { milesToMeters } from "@/lib/Geocode";
import convertToWatchParty from "@/lib/convertWatchPartyData";
import prisma from "@/prisma/client";
import { SubmitWatchPartyData, WatchParty } from "@/types";
import { NextRequest, NextResponse as res } from "next/server";

// GET all WatchParties that meet the specified searchParams passed
// Must pass a coordinates array [lon, lat] and mile radius
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    // Check for required params for /today API route
    if (!searchParams.has("coordinates[]"))
      throw new Error("no coordinates passed");
    if (!searchParams.has("radius")) throw new Error("No radius passed");

    // extract values from searchParams
    const searchParamCoords: string[] = searchParams.getAll("coordinates[]");
    const radius: number = parseInt(searchParams.get("radius") as string);

    // validate values from searchParams (as needed)
    const coordinates = searchParamCoords.map((coord, index) => {
      const coordinate = parseFloat(coord);
      if (isNaN(coordinate)) throw new Error("Invalid coordinate");
      if (index === 0 && (coordinate < -180 || coordinate > 180))
        throw new Error("Invalid longitude");
      if (index === 1 && (coordinate < -90 || coordinate > 90))
        throw new Error("Invalid latitude");
      return coordinate;
    });
    if (coordinates.length !== 2) throw new Error("Invalid coordinates");
    if (isNaN(radius) || radius < 1) throw new Error("Invalid radius");

    // convert radius from miles to meters (for mongodb)
    const radiusMeters = milesToMeters(radius);

    // BUILD AGGREAGTION PIPELINE STAGES:
    const geoStage = {
      $geoNear: {
        near: { type: "Point", coordinates },
        distanceField: "dist.calculated", // This is required
        maxDistance: radiusMeters,
      },
    };

    const matchStage = {
      $match: {
        // Only return upcoming events
        $expr: {
          $gte: ["$date", "$$NOW"],
        },
      },
    };

    const limitStage = {
      // Only return up to the first 20 documents
      $limit: 20,
    };

    const watchParties = await prisma.watchParty
      .aggregateRaw({
        pipeline: [geoStage, matchStage, limitStage],
      })
      .then(res => convertToWatchParty(res));

    if (!watchParties) throw new Error("Invalid request");

    // watchParties can be an empty array - meaning nothing found in radius
    return res.json(watchParties);
  } catch (err: Error | any) {
    console.error(err?.message ?? err);
    return new res(err?.message ?? "request failed", { status: 400 });
  }
}

// Create a watchParty with the passed data
export async function POST(req: NextRequest) {
  const data: SubmitWatchPartyData = await req.json();

  try {
    if (!data) throw new Error("No data passed");
    const watchParty = await prisma.watchParty.create({
      data: {
        ...data,
        // Add the user who created the watchparty to the partygoers list by default
        partygoerIds: [data.userId],
      },
    });

    if (!watchParty) return new res("Invalid data", { status: 400 });

    return res.json(watchParty);
  } catch (err) {
    console.error(err);
    return new res("Invalid data", { status: 400 });
  }
}

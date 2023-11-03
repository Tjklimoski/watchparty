import { milesToMeters } from "@/lib/Geocode";
import convertToWatchParty from "@/lib/convertWatchPartyData";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse as res } from "next/server";

// GET most popular WatchParties (within user's coordinates + radius)
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
        // only return watchparties within the user's radius
        near: { type: "Point", coordinates },
        distanceField: "dist.calculated", // This is required
        maxDistance: radiusMeters,
      },
    };

    const matchStage = {
      $match: {
        // Only return upcoming watchparties
        $expr: {
          $gte: ["$date", "$$NOW"],
        },
      },
    };

    const setStage = {
      $set: {
        // Add a field to each document that is the number of id's in the partygoerIds array
        numOfPartygoers: {
          $cond: {
            if: { $isArray: "$partygoerIds" },
            then: { $size: "$partygoerIds" },
            else: 0,
          },
        },
      },
    };

    const sortStage = {
      $sort: {
        // return documents sorted in descending order based on numOfPartygoers value
        numOfPartygoers: -1,
      },
    };

    const limitStage = {
      // Only return the first 20 documents that match the above criteria
      $limit: 20,
    };

    const watchParties = await prisma.watchParty
      .aggregateRaw({
        pipeline: [geoStage, matchStage, setStage, sortStage, limitStage],
      })
      .then(res => convertToWatchParty(res));

    if (!watchParties) throw new Error("Invalid request");

    return res.json(watchParties);
  } catch (err: Error | any) {
    console.error(err?.message ?? err);
    return new res(err?.message ?? "request failed", { status: 400 });
  }
}

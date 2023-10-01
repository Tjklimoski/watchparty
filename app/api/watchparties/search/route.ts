import { milesToMeters } from "@/lib/Geocode";
import convertToWatchParty from "@/lib/convertWatchPartyData";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse as res } from "next/server";

// GET all WatchParties that meet the specified searchParams passed (including a query)
// Must pass a coordinates array [lon, lat] and mile radius
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams

    // Check for required params for /search API route
    if (!searchParams.has('coordinates[]')) throw new Error('no coordinates passed')
    if (!searchParams.has('radius')) throw new Error('No radius passed')
    if (!searchParams.has('query')) throw new Error('No query passed')

    // extract values from searchParams
    const searchParamCoords: string[] = searchParams.getAll('coordinates[]')
    const radius: number = parseInt(searchParams.get('radius') as string)
    const query: string = searchParams.get('query') as string;
    const page: number = parseInt(searchParams.get('page') ?? '1')

    // validate values from searchParams (as needed)
    const coordinates = searchParamCoords.map((coord, index) => {
      const coordinate = parseFloat(coord);
      if (isNaN(coordinate)) throw new Error('Invalid coordinate')
      if (index === 0 && (coordinate < -180 || coordinate > 180)) throw new Error('Invalid longitude')
      if (index === 1 && (coordinate < -90 || coordinate > 90)) throw new Error('Invalid latitude')
      return coordinate;
    })
    if (coordinates.length !== 2) throw new Error('Invalid coordinates')
    if (isNaN(radius) || radius < 1) throw new Error('Invalid radius')
    if (isNaN(page) || page < 1) throw new Error("Invalid page number")

    // convert radius from miles to meters (for mongodb)
    const radiusMeters = milesToMeters(radius)

    const documentsPerPage = 20;

    const watchParties = await prisma.watchParty.aggregateRaw({
      pipeline: [
        {
          $geoNear: {
            near: { type: "Point", coordinates },
            distanceField: "dist.calculated", // This is required
            maxDistance: radiusMeters,
          }
        },
        {
          $match: {
            // Only return upcoming events
            $expr: {
              $gte: [
                "$date",
                "$$NOW"
              ],
            },
          }
        },
        {
          // Only return at most 20 documents
          $limit: documentsPerPage,
        }
      ]
    }).then(res => convertToWatchParty(res))

    if (!watchParties) throw new Error('Invalid request')

    // watchParties can be an empty array - meaning nothing found in radius
    return res.json(watchParties)
  } catch (err: Error | any) {
    console.error(err?.message ?? err)
    return new res(err?.message ?? "request failed", { status: 400 })
  }
}

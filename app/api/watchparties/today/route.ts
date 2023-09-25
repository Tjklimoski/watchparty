import { milesToMeters } from "@/lib/Geocode";
import convertToWatchParty from "@/lib/convertWatchPartyData";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse as res } from "next/server";

// GET all WatchParties that are happening today.
// And that meet the coordinates array [lon, lat] and mile radius passed
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams

    if (!searchParams.has('coordinates[]')) throw new Error('no coordinates passed')
    if (!searchParams.has('radius')) throw new Error('No radius passed')

    const searchParamCoords: string[] = searchParams.getAll('coordinates[]')
    const radius: number = parseInt(searchParams.get('radius') as string)

    const coordinates = searchParamCoords.map(coord => {
      const coordinate = parseFloat(coord);
      if (isNaN(coordinate)) throw new Error('Invalid coordinate')
      return coordinate;
    })

    if (isNaN(radius) || coordinates.length !== 2) throw new Error('Invalid params sent')

    // convert radius from miles to meters (for mongodb)
    const radiusMeters = milesToMeters(radius)

    const today = new Date();
    const startOfDay = new Date(today.toDateString());
    // 24 hours in milliseconds = 1000 * 60 * 60 * 24
    const endOfDay = new Date(startOfDay.getTime() + (1000 * 60 * 60 * 24));

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
            // Only return events that are between the start of today and end of today
            $expr: {
              $and: [
                {
                  $gte: [
                    "$date",
                    {
                      $dateFromString: {
                        dateString: startOfDay.toISOString(),
                      }
                    }
                  ],
                },
                {
                  $lte: [
                    "$date",
                    {
                      $dateFromString: {
                        dateString: endOfDay.toISOString(),
                      }
                    }
                  ]
                }
              ],
            },
          }
        },
        {
          // Only return the first 20 documents that match the above criteria
          $limit: 20,
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
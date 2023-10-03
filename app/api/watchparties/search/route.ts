import { milesToMeters } from "@/lib/Geocode";
import convertToWatchParty from "@/lib/convertWatchPartyData";
import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse as res } from "next/server";

interface SearchData {
  page: number;
  results: Prisma.JsonObject[];
  total_pages: number;
  total_results: number;
}

// GET all WatchParties that meet the specified searchParams passed (including a query)
// Must pass a coordinates array [lon, lat] and mile radius
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    // Check for required params for /search API route
    if (!searchParams.has("coordinates[]"))
      throw new Error("no coordinates passed");
    if (!searchParams.has("radius")) throw new Error("No radius passed");
    if (!searchParams.has("query")) throw new Error("No query passed");

    // extract values from searchParams
    const searchParamCoords: string[] = searchParams.getAll("coordinates[]");
    const radius: number = parseInt(searchParams.get("radius") as string);
    const query: string = searchParams.get("query") as string;
    const page: number = parseInt(searchParams.get("page") ?? "1");

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
    if (isNaN(page) || page < 1) throw new Error("Invalid page number");

    // convert radius from miles to meters (for mongodb)
    const radiusMeters = milesToMeters(radius);

    const documentsPerPage = 20;
    const skip = documentsPerPage * (page - 1);

    const watchParties = await prisma.watchParty
      .aggregateRaw({
        pipeline: [
          // Create $Search stage - which will handle query search in the mediaTitle, near for user radius/coordinates, and date to pull events that are upcoming.
          {
            $search: {
              compound: {
                must: [
                  {
                    text: {
                      query,
                      path: "mediaTitle",
                      // fuzzy allows for the user to have typos
                      fuzzy: {
                        maxEdits: 2,
                        // first letter for each term must match
                        prefixLength: 1,
                      },
                    },
                  },
                ],
                // Boost the score for documents that include the media title in their watchparty title or description
                should: [
                  {
                    text: {
                      query,
                      path: ["title", "description"],
                      fuzzy: {
                        maxEdits: 2,
                        prefixLength: 1,
                      },
                    },
                  },
                ],
              },
            },
          },
          {
            $facet: {
              results: [{ $skip: skip }, { $limit: documentsPerPage }],
              metadata: [{ $count: "total" }],
            },
          },
          {
            $project: {
              results: 1,
              // Check if $count was null, if so set to 0
              total_results: {
                $ifNull: [
                  { $arrayElemAt: ["$metadata.total", 0] },
                  { $literal: 0 },
                ],
              },
              page: { $toInt: page },
              total_pages: {
                // if $count was 0, set pages to 1 for "no results" message to be displayed.
                $max: [
                  { $literal: 1 },
                  {
                    $ceil: {
                      $divide: [
                        { $arrayElemAt: ["$metadata.total", 0] },
                        documentsPerPage,
                      ],
                    },
                  },
                ],
              },
            },
          },
        ],
      })
      .then(res => {
        // extract response from array, clean up results, return data.
        const data = res[0] as unknown as SearchData;
        if (!data) throw new Error("Database search failed");
        return {
          ...data,
          results: convertToWatchParty(data.results),
        };
      });

    if (!watchParties) throw new Error("Invalid request");

    // watchParties can be an empty array - meaning nothing found in radius
    return res.json(watchParties);
  } catch (err: Error | any) {
    console.error(err?.message ?? err);
    return new res(err?.message ?? "request failed", { status: 400 });
  }
}

// {
//   $facet: {
//     results: [{ $skip: skip }, { $limit: documentsPerPage }],
//     metadata: [{ $count: "total" }],
//   },
// },

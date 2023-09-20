import prisma from "@/prisma/client";
import { WatchParty } from "@/types";
import { NextRequest, NextResponse as res } from "next/server";

// GET all WatchParties that meet the specified searchParams passed
// Must pass a coordinates array [lon, lat] and mile radius
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

    // convert radius from miles to meters (for mongodb) - 1 mile = 1609.34 meters
    const radiusMeters = radius * 1609.34

    console.log('Request recieved: ', radius, coordinates)

    const result = await prisma.watchParty.findRaw({
      filter: {
        geo: {
          $near: {
            $geometry: {
              type: "point",
              coordinates
            },
            $maxDistance: radiusMeters,
          }
        }
      }
    })

    if (!result) throw new Error('Invalid request');

    // res can be an empty array - meaning nothing found in radius
    return res.json(result)
  } catch (err: Error | any) {
    console.error(err?.message ?? err)
    return new res(err?.message ?? "request failed", { status: 400 })
  }
}

// Create a watchParty with the passed data
export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    const watchParty = await prisma.watchParty.create({
      data
    });

    if (!watchParty) return new res('Invalid data', { status: 400 })

    return res.json(watchParty);

  } catch (err) {
    console.error(err)
    return new res('Invalid data', { status: 400 });
  }
}
import prisma from "@/prisma/client";
import { NextRequest, NextResponse as res } from "next/server";

interface Body {
  radius: number;
  coordinates: [number, number];
}

export async function GET(req: NextRequest) {
  try {
    const { radius, coordinates }: Body = await req.json();

    // convert radius from miles to meters (for mongodb) - 1 mile = 1609.34 meters
    const radiusMeters = radius * 1609.34

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
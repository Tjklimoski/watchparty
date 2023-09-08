import prisma from "@/prisma/client";
import { NextRequest, NextResponse as res } from "next/server";

export async function POST(req: NextRequest) {
  console.log('/watchparties POST req called')
  const data = await req.json();
  console.log('data: ', data);

  try {
    const watchParty = await prisma.watchParty.create({
      data
    });

    console.log('watchParty data returned by prisma: ', watchParty);

    if (!watchParty) return new res('Invalid data', { status: 400 })

    return res.json(watchParty);

  } catch (err) {
    console.log('ERROR!: ', err)
    return new res('Invalid data', { status: 400 });
  }
}
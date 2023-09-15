import prisma from "@/prisma/client";
import { NextRequest, NextResponse as res } from "next/server";

export async function GET(req: NextRequest) {
  const { radius } = await req.json();
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
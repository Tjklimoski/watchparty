import prisma from "@/prisma/client";
import { NextRequest, NextResponse as res } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const watchParty = await prisma.watchParty.findUnique({
      where: {
        id
      }
    })

    if (!watchParty) throw new Error("Invalid ID")

    return res.json(watchParty);
  } catch (err: Error | any) {
    return new res(err?.message ?? "Failed", { status: 400 })
  }
}
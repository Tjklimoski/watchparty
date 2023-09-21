import prisma from "@/prisma/client";
import { SubmitWatchPartyData } from "@/types";
import { NextRequest, NextResponse as res } from "next/server";

interface Params {
  params: { id: string }
}

export async function GET(req: NextRequest, { params }: Params) {
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

// create PUT request for when the host user edits/updates the watchparty
export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = params;
  try {
    const { userId, ...data }: SubmitWatchPartyData = await req.json();

    // Find pre-existing WatchParty
    const watchParty = await prisma.watchParty.findUniqueOrThrow({
      where: {
        id
      }
    });

    // Confirm that the userId on the newly submitted WatchParty data matches the pre-exisiting WatchParty userId.
    if (watchParty.userId !== userId) throw new Error('Unathorized')

    // Pass data to update() - any field not passed (left as undefiend) will not overwrite the current data in the document.
    const updatedWatchParty = await prisma.watchParty.update({
      where: {
        id
      },
      data
    });

    if (!updatedWatchParty) throw new Error('Invalid data sent, unable to update')

    return res.json(updatedWatchParty);
  } catch (err: Error | any) {
    return new res(err?.message ?? "Failed", { status: 400 })
  }
}

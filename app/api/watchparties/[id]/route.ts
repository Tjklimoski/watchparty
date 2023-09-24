import auth from "@/lib/authenticate";
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

// PUT request for when the host user edits/updates the watchparty
export async function PUT(req: NextRequest, { params }: Params) {
  const { id } = params;
  try {
    // exclude userId from data, as userId can't be updated in the document.
    const { userId, ...data }: SubmitWatchPartyData = await req.json();

    // get the currently signed in user that's making the request
    const user = await auth()
    if (!user) throw new Error('No authenticated user')

    // Find pre-existing WatchParty
    const watchParty = await prisma.watchParty.findUniqueOrThrow({
      where: {
        id
      }
    });

    // confirm the user making the request is the host
    if (watchParty.userId !== user.id) throw new Error('Unathorized')

    if (watchParty.date.getTime() < Date.now()) throw new Error('Cannot update a WatchParty that has passed')

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

export async function DELETE(req: NextRequest, { params }: Params) {
  const { id } = params;
  try {
    const user = await auth()

    if (!user) throw new Error('No authenticated user')

    // confirm the watchparty id exists
    const watchParty = await prisma.watchParty.findUniqueOrThrow({
      where: {
        id
      }
    });

    // confirm the user making the request is the host
    if (watchParty.userId !== user.id) throw new Error('Unauthorized')

    const deletedWatchParty = await prisma.watchParty.delete({
      where: {
        id
      }
    })

    if (!deletedWatchParty) throw new Error('Failed to delete watchparty')

    return res.json(deletedWatchParty)
  } catch (err: Error | any) {
    return new res(err?.message ?? "Failed", { status: 400 })
  }
}

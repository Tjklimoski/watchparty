import prisma from "@/prisma/client";
import { NextRequest, NextResponse as res } from "next/server";

interface Params {
  params: { id: string, userId: string }
}

// Delete a single userId from the partygoerIds array
export async function DELETE(req: NextRequest, { params }: Params) {
  const { id, userId } = params;

  try {
    const watchParty = await prisma.watchParty.findUniqueOrThrow({ where: { id } });
    const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });

    if (!watchParty.partygoerIds.includes(userId) && !user.goingToWatchPartiesIds.includes(id)) {
      // user is already not listed as attending. Return the watchParty.
      return res.json(watchParty)
    }

    // build new array for watchParty that doesn't contain the userId
    const partygoerIds = watchParty.partygoerIds.filter(partygoerId => partygoerId !== userId);

    // build new array for user that doesn't contain the watchParty id
    const goingToWatchPartiesIds = user.goingToWatchPartiesIds.filter(WPid => WPid !== id);

    // seperate prisma request to update both models at once with prisma.transaction(). 
    const updateWatchParty = prisma.watchParty.update({
      where: {
        id,
      },
      data: {
        partygoerIds,
      }
    });

    const updateUser = prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        goingToWatchPartiesIds,
      }
    });

    // If one request fails ALL request in the transaction fails - data will roll back.
    const [updatedWatchParty, updatedUser] = await prisma.$transaction([updateWatchParty, updateUser]);

    if (!updateWatchParty || !updatedUser) throw new Error('Failed to update database')

    // only return WatchParty
    return res.json(updatedWatchParty)
  } catch (err: Error | any) {
    return new res(err?.message ?? "Failed", { status: 400 })
  }
}
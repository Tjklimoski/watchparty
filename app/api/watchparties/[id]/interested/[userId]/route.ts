import auth from "@/lib/authenticate";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse as res } from "next/server";

interface Params {
  params: { id: string; userId: string };
}

// Delete a single userId from the partygoerIds array
export async function DELETE(req: NextRequest, { params }: Params) {
  const { id, userId } = params;

  try {
    const currentUser = await auth();
    // check user making request is the user being removed from the array
    if (currentUser.id !== userId) throw new Error("Unauthorized");

    const watchParty = await prisma.watchParty.findUniqueOrThrow({
      where: { id },
    });
    const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });

    if (
      !watchParty.interestedUsersIds.includes(userId) &&
      !user.interestedInWatchPartiesIds.includes(id)
    ) {
      // user is alrady not following
      return res.json(watchParty);
    }

    // build new array for watchParty that doesn't contain the userId
    const interestedUsersIds = watchParty.interestedUsersIds.filter(
      interestedUserId => interestedUserId !== userId
    );

    // build new array for user that doesn't contain the watchParty id
    const interestedInWatchPartiesIds = user.interestedInWatchPartiesIds.filter(
      WPid => WPid !== id
    );

    // seperate prisma request to update both models at once with prisma.transaction().
    const updateWatchParty = prisma.watchParty.update({
      where: {
        id,
      },
      data: {
        interestedUsersIds,
      },
    });

    const updateUser = prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        interestedInWatchPartiesIds,
      },
    });

    // If one request fails ALL request in the transaction fails - data will roll back.
    const [updatedWatchParty, updatedUser] = await prisma.$transaction([
      updateWatchParty,
      updateUser,
    ]);

    if (!updateWatchParty || !updatedUser)
      throw new Error("Failed to update database");

    // only return WatchParty
    return res.json(updatedWatchParty);
  } catch (err: Error | any) {
    return new res(err?.message ?? "Failed", { status: 400 });
  }
}

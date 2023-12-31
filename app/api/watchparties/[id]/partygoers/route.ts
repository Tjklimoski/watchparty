import auth from "@/lib/authenticate";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse as res } from "next/server";

interface Params {
  params: { id: string };
}

// POST request for adding a user to partygoerIds
export async function POST(req: NextRequest, { params }: Params) {
  const { id } = params;
  try {
    const { userId } = await req.json();
    if (!userId) throw new Error("No userId");

    const user = await auth();
    // check user making request is the same user being added to the array
    if (user.id !== userId) throw new Error("Unauthorized");

    const watchParty = await prisma.watchParty.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        partygoerIds: true,
      },
    });

    if (watchParty.partygoerIds.includes(userId)) {
      // watchparty contains user, but user doesn't contain watchparty. update user.
      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          goingToWatchPartiesIds: { push: id },
        },
      });
      if (!updatedUser) throw new Error("Invalid user id");
      return res.json(watchParty);
    }

    const updatedWatchParty = await prisma.watchParty.update({
      where: {
        id,
      },
      data: {
        partygoerIds: { push: userId },
        partygoers: {
          update: {
            where: {
              id: userId,
            },
            data: {
              goingToWatchPartiesIds: { push: id },
            },
          },
        },
      },
    });

    if (!updatedWatchParty) throw new Error("Failed to update watchparty");

    return res.json(updatedWatchParty);
  } catch (err: Error | any) {
    return new res(err?.message ?? "Failed", { status: 400 });
  }
}

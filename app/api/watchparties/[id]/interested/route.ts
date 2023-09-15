import prisma from "@/prisma/client";
import { NextRequest, NextResponse as res } from "next/server";

interface Params {
  params: { id: string }
}

// POST request for adding a user to partygoerIds
export async function POST(req: NextRequest, { params }: Params) {
  const { id } = params;
  try {
    const { userId } = await req.json()
    if (!userId) throw new Error('No userId');

    const watchParty = await prisma.watchParty.findUniqueOrThrow({
      where: {
        id
      },
      select: {
        interestedUsersIds: true
      }
    });

    if (watchParty.interestedUsersIds.includes(userId)) {
      // watchParty contains userId as following, but user doesn't contain watchParty
      // prevent the user from being added to the event multiple times.
      // Update the user to include the watchParty id in interestedIn list.
      const updatedUser = await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          interestedInWatchPartiesIds: { push: id }
        }
      })
      if (!updatedUser) throw new Error('invalid User id')
      return res.json(watchParty);
    }

    const updatedWatchParty = await prisma.watchParty.update({
      where: {
        id
      },
      data: {
        interestedUsersIds: { push: userId },
        interestedUsers: {
          update: {
            where: {
              id: userId
            },
            data: {
              interestedInWatchPartiesIds: { push: id }
            }
          }
        }
      },
      include: {
        interestedUsers: true,
      }
    })

    if (!updatedWatchParty) throw new Error('Failed to update watchparty')

    return res.json(updatedWatchParty)
  } catch (err: Error | any) {
    console.error(err?.message ?? err)
    return new res(err?.message ?? "Failed", { status: 400 })
  }
}

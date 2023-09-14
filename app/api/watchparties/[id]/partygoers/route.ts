import prisma from "@/prisma/client";
import { NextRequest, NextResponse as res } from "next/server";

interface Params {
  params: { id: string }
}

// PATCH request for modifying specific fields (namely id arrays)
export async function PATCH(req: NextRequest, { params }: Params) {
  const { id } = params;
  try {
    const { userId } = await req.json()
    if (!userId) throw new Error('No userId');

    const currentWatchParty = await prisma.watchParty.findUnique({
      where: {
        id
      },
      select: {
        partygoerIds: true
      }
    });

    if (!currentWatchParty) throw new Error(`No WatchParty with id:${id} found`);

    if (currentWatchParty.partygoerIds.includes(userId)) throw new Error('User already a partygoer');

    const updatedWatchParty = await prisma.watchParty.update({
      where: {
        id
      },
      data: {
        partygoerIds: { push: userId },
        partygoers: {
          update: {
            where: {
              id: userId
            },
            data: {
              goingToWatchPartiesIds: { push: id }
            }
          }
        }
      },
      include: {
        partygoers: true,
      }
    })

    if (!updatedWatchParty) throw new Error('Failed to update watchparty')

    return res.json(updatedWatchParty)
  } catch (err: Error | any) {
    console.error(err?.message ?? err)
    return new res(err?.message ?? "Failed", { status: 400 })
  }
}

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

    const watchParty = await prisma.watchParty.findUnique({
      where: {
        id
      },
      select: {
        partygoerIds: true
      }
    });

    if (!watchParty) throw new Error(`No WatchParty with id:${id} found`);

    if (watchParty.partygoerIds.includes(userId)) throw new Error('User already a partygoer');

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

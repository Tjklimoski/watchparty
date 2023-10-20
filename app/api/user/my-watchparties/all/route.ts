import auth from "@/lib/authenticate";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse as res } from "next/server";

// GET ALL watchparties associated with the current user
export async function GET(req: NextRequest) {
  try {
    const user = await auth();
    if (!user) throw new Error("No current user");

    // Get all the user's watchParties that are upcoming and order by date asc.
    const userUpcoming = await prisma.user.findUniqueOrThrow({
      where: {
        id: user.id,
      },
      include: {
        goingToWatchParties: {
          where: {
            date: {
              gt: new Date(),
            },
          },
          orderBy: {
            date: "asc",
          },
        },
      },
    });

    // Get all the user's watchParties that have passed, and order by date desc.
    const userPassed = await prisma.user.findUniqueOrThrow({
      where: {
        id: user.id,
      },
      include: {
        goingToWatchParties: {
          where: {
            date: {
              lte: new Date(),
            },
          },
          orderBy: {
            date: "desc",
          },
        },
      },
    });

    // compile WatchParties
    const allWatchParties = [
      ...userUpcoming.goingToWatchParties,
      ...userPassed.goingToWatchParties,
    ];

    return res.json(allWatchParties);
  } catch (err: Error | any) {
    console.error(err);
    return new res(err?.message ?? "Request Failed", { status: 400 });
  }
}

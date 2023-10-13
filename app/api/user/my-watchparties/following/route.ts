import { NextRequest, NextResponse as res } from "next/server";
import auth from "@/lib/authenticate";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest) {
  try {
    const user = await auth();
    if (!user) throw new Error("No current user");

    // get all watchparties that the user is following that are upcoming and order by date
    const userWithWatchParties = await prisma.user.findUniqueOrThrow({
      where: {
        id: user.id,
      },
      include: {
        interestedInWatchParties: {
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

    const followingWatchParties = userWithWatchParties.interestedInWatchParties;

    return res.json(followingWatchParties);
  } catch (err: Error | any) {
    return new res(err?.message ?? err ?? "Request failed", { status: 400 });
  }
}

import auth from "@/lib/authenticate";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse as res } from "next/server";

// GET ATTENDED watchparties associated with the current user
export async function GET(req: NextRequest) {
  try {
    const user = await auth();
    if (!user) throw new Error("No current user");

    const todayStart = new Date(new Date().toDateString());
    const todayEnd = new Date(todayStart.getTime() + 1000 * 60 * 60 * 24);

    const userWithWatchParties = await prisma.user.findUniqueOrThrow({
      where: {
        id: user.id,
      },
      include: {
        goingToWatchParties: {
          where: {
            AND: [
              {
                date: {
                  gte: todayStart,
                },
              },
              {
                date: {
                  lt: todayEnd,
                },
              },
            ],
          },
          orderBy: {
            date: "asc",
          },
        },
      },
    });

    const todayWatchParties = userWithWatchParties.goingToWatchParties;

    return res.json(todayWatchParties);
  } catch (err: Error | any) {
    console.error(err);
    return new res(err?.message ?? "Request Failed", { status: 400 });
  }
}

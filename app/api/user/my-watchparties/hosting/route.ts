import auth from "@/lib/authenticate";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse as res } from "next/server";

// GET ATTENDED watchparties associated with the current user
export async function GET(req: NextRequest) {
  try {
    const user = await auth();
    if (!user) throw new Error("No current user");

    const userWithWatchParties = await prisma.user.findUniqueOrThrow({
      where: {
        id: user.id,
      },
      include: {
        myWatchParties: {
          where: {
            date: {
              gte: new Date(),
            },
          },
          orderBy: {
            date: "asc",
          },
        },
      },
    });

    const hostingWatchParties = userWithWatchParties.myWatchParties;

    return res.json(hostingWatchParties);
  } catch (err: Error | any) {
    console.error(err);
    return new res(err?.message ?? "Request Failed", { status: 400 });
  }
}

import auth from "@/lib/authenticate";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse as res } from "next/server";

// GET ALL watchparties associated with the current user
export async function GET(req: NextRequest) {
  try {
    const user = await auth();
    if (!user) throw new Error("No current user");

    const userWithWatchParties = await prisma.user.findUniqueOrThrow({
      where: {
        id: user.id,
      },
      include: {
        goingToWatchParties: {
          orderBy: {
            mediaTitle: "asc",
          },
        },
      },
    });

    const watchParties = userWithWatchParties.goingToWatchParties;

    return res.json(watchParties);
  } catch (err: Error | any) {
    console.error(err);
    return new res(err?.message ?? "Request Failed", { status: 400 });
  }
}

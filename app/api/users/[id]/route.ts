import { NextRequest, NextResponse as res } from "next/server";
import prisma from "@/prisma/client";
import { LimitedUser, User } from "@/types";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: userId } = params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        myWatchParties: {
          orderBy: {
            date: "asc",
          },
        },
        // Only fetch the watchparties the user has already attended. Not ones they plan to attend in the future
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

    if (!user) throw new Error("Invalid id");

    // Need to extract: id, name, image, location.city, hosted COUNT, hosting COUNT, attended COUNT, createdAT, myList

    const {
      id,
      name,
      image,
      createdAt,
      myList,
      myWatchParties,
      goingToWatchParties,
    } = user;
    const city = user.location?.city;

    const limitedUser = {};

    return res.json(user);
  } catch (err) {
    return new res("Invalid id", { status: 400 });
  }
}

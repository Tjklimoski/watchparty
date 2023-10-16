import { NextRequest, NextResponse as res } from "next/server";
import prisma from "@/prisma/client";
import { LimitedUser } from "@/types";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const user: LimitedUser = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        myWatchParties: true,
        goingToWatchParties: true,
      },
    });

    if (!user) throw new Error("Invalid id");

    // Need to extract: id, name, image, location.city, hosted COUNT, hosting COUNT, attended COUNT, createdAT, myList

    return res.json(user);
  } catch (err) {
    return new res("Invalid id", { status: 400 });
  }
}

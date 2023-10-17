import { NextRequest, NextResponse as res } from "next/server";
import prisma from "@/prisma/client";
import { LimitedUser, User } from "@/types";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: userId } = params;

  try {
    const user: LimitedUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        image: true,
      },
    });

    if (!user) throw new Error("Invalid id");

    return res.json(user);
  } catch (err) {
    return new res("Invalid id", { status: 400 });
  }
}

import { NextRequest, NextResponse as res } from "next/server";
import prisma from "@/prisma/client";
import { LimitedUser } from "@/types";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const user: LimitedUser = await prisma.user.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        image: true,
      }
    });

    if (!user) throw new Error('Invalid id')

    return res.json(user);

  } catch (err) {
    return new res("Invalid id", { status: 400 })
  }
}
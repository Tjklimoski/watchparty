import { NextRequest, NextResponse as res } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  const requestedUsersMyList = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      myList: true,
    }
  });

  if (!requestedUsersMyList) return new res('invalid id', { status: 400 });

  return res.json(requestedUsersMyList);
}
import auth from "@/lib/authenticate";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse as res } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const user = await auth();

    if (!user) throw new Error('No current user')

    const userWithParties = await prisma.user.findUniqueOrThrow({
      where: {
        id: user.id
      },
      include: {
        myWatchParties: true
      }
    })

    return res.json(userWithParties)
  } catch (err: Error | any) {
    console.error(err)
    return new res(err?.message ?? "Request Failed", { status: 400 })
  }
}
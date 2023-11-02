import auth from "@/lib/authenticate";
import prisma from "@/prisma/client";
import { UserLocation } from "@prisma/client";
import { NextRequest, NextResponse as res } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await auth();

    const data: UserLocation = await req.json();

    if (
      !data.coordinates ||
      !data.city ||
      data.coordinates.length !== 2 ||
      Object.keys(data).length > 2
    )
      throw new Error("Invalid data sent");

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        location: data,
      },
    });

    if (!updatedUser) throw new Error("Failed to set user's location data");

    return res.json(updatedUser);
  } catch (err: Error | any) {
    return new res(err?.message ?? err, { status: 400 });
  }
}

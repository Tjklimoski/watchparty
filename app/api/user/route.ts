import auth from "@/lib/authenticate";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse as res } from "next/server";

export async function GET(req: NextRequest) {
  const user = await auth();

  if (!user) return new res("No user logged in", { status: 400 });

  return res.json(user);
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await auth();

    if (!user) throw new Error("No user logged in");

    // prisma request to db to delete user
    // check that cascading delete of watchparty works as intended
    const deleteUser = await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    if (!deleteUser) throw new Error("Failed to delete user");
  } catch (err: Error | any) {
    return new res(
      err?.message ?? err?.response?.data ?? err ?? "Request failed",
      { status: 400 }
    );
  }
}

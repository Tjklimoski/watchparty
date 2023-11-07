import auth from "@/lib/authenticate";
import prisma from "@/prisma/client";
import { NextResponse as res } from "next/server";

export async function GET() {
  const user = await auth();
  return res.json(user);
}

export async function DELETE() {
  try {
    const user = await auth();

    // prisma request to db to delete user
    const deleteUser = await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    if (!deleteUser) throw new Error("Failed to delete user");

    // remove the next auth session token cookie from the client's browser.
    return new res("User Deleted", {
      status: 200,
      headers: {
        "Set-Cookie": `next-auth.session-token=; Path=/; Max-Age=0; HttpOnly; SameSite="Lax"; ${
          process.env.NODE_ENV === "development" ? "" : "Secure"
        };`,
      },
    });
  } catch (err: Error | any) {
    return new res(
      err?.message ?? err?.response?.data ?? err ?? "Request failed",
      { status: 400 }
    );
  }
}

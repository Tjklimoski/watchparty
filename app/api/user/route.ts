import auth from "@/lib/authenticate";
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
  } catch (err: Error | any) {
    return new res(
      err?.message ?? err?.response?.data ?? err ?? "Request failed",
      { status: 400 }
    );
  }
}

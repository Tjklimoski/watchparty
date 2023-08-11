import auth from "@/lib/authenticate";
import { NextRequest, NextResponse as res } from "next/server";

export async function GET(req: NextRequest) {
  const user = await auth();

  if (!user) return new res('No user logged in', { status: 400 })

  return res.json(user)
}
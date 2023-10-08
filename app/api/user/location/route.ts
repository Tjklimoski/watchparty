import auth from "@/lib/authenticate";
import { NextRequest, NextResponse as res } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await auth();
    const data = await req.json();

    // temp
    return res.json(user);
  } catch (err: Error | any) {
    return new res(err?.message ?? err, { status: 400 });
  }
}

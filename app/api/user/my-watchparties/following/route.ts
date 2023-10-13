import { NextRequest, NextResponse as res } from "next/server";
import auth from "@/lib/authenticate";

export async function GET(req: NextRequest) {
  try {
  } catch (err: Error | any) {
    return new res(err?.message ?? err ?? "Request failed", { status: 400 });
  }
}

import { NextRequest, NextResponse as res } from "next/server";

interface ReqBody {
  city?: string;
  radius?: number;
  name?: string;
  updatedPassword?: string;
  currentPassword?: string;
}

export async function PATCH(req: NextRequest) {
  const { city, radius, name, updatedPassword, currentPassword }: ReqBody =
    await req.json();
}

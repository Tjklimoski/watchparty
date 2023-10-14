import auth from "@/lib/authenticate";
import { NextRequest, NextResponse as res } from "next/server";
import bcrypt from "bcrypt";

interface ReqBody {
  city?: string;
  radius?: number;
  name?: string;
  updatedPassword?: string;
  currentPassword?: string;
}

export async function PATCH(req: NextRequest) {
  try {
    const { city, radius, name, updatedPassword, currentPassword }: ReqBody =
      await req.json();

    const user = await auth();
    if (!user) throw new Error("No current user");

    // If user passed a new password, authenticate user.
    if (updatedPassword) {
      // check if the sent a current password
      if (!currentPassword)
        throw new Error(
          "No current password passed, cannot update your password"
        );
      // Check that they have a password to update
      if (!user.password)
        throw new Error("Logged in using OAuth, no password to update");
      // throw error if currentPasswords do not match
      if (!bcrypt.compare(currentPassword, user.password))
        throw new Error("Unable to validate current user");
    }
  } catch (err: Error | any) {
    return new res(err?.message ?? err ?? "Update failed", { status: 400 });
  }
}

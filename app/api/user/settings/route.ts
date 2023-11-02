import auth from "@/lib/authenticate";
import { NextRequest, NextResponse as res } from "next/server";
import bcrypt from "bcrypt";
import { getCoord } from "@/lib/Geocode";
import prisma from "@/prisma/client";

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
    let hashedPassword: string | undefined;
    let coordinates: [number, number] | undefined;

    const user = await auth();

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
      if (updatedPassword.length <= 5)
        throw new Error("Password must be longer than 5 characters");
      // throw error if currentPasswords do not match
      if (!(await bcrypt.compare(currentPassword, user.password)))
        throw new Error("Unable to validate user");
      hashedPassword = await bcrypt.hash(updatedPassword, 12);
    }

    // limit radius to a value between 1 and 100
    if (radius && (radius < 1 || radius > 100))
      throw new Error("Radius must be between 1 and 100");

    // limit name to be between 2 and 50 characters
    if ((name || name === "") && (name.length < 2 || name.length > 50))
      throw new Error("Name must be between 2 and 50 characters");

    // validate city and set coordinates based of city value.
    if (city && city !== user.location?.city) {
      if (!city.includes(",")) throw new Error("City must include a state");
      if (city.split(",")[1].trim().length !== 2)
        throw new Error("State must be a 2 letter abreviation");
      coordinates = await getCoord({ city });
      if (!coordinates) throw new Error("Invalid city passed");
    }

    // build location field only if new data to update it with
    const location = coordinates ? { city, coordinates } : undefined;

    // if value is undefined the field will remain as is
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name,
        radius,
        password: hashedPassword,
        location,
      },
    });

    if (!updatedUser) throw new Error("Failed to update user");

    return res.json(updatedUser);
  } catch (err: Error | any) {
    return new res(err?.message ?? err ?? "Update failed", { status: 400 });
  }
}

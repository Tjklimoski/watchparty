"use server";

import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { User } from "@/types";
import { Prisma } from "@prisma/client";

// Return the logged in user, or null if not logged in
export default async function auth() {
  // session contains name, email, & image fields by default from nextAuth.
  const session = await getServerSession(nextAuthConfig);
  const email = session?.user?.email;

  if (!email) throw new Error("No user logged in");

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  // if (!user) return null;
  if (!user) throw new Error("No user found");

  // convert user into User type, turn coordinates from Decimal to Number type.
  // Couldnt return Decimal[] type from server action to client component.
  const convertedUser: User = {
    ...user,
    location: {
      ...user.location,
      coordinates: await coordinatesToNumbers(user.location?.coordinates),
    },
  };

  return convertedUser;
}

export async function getIsAuth(): Promise<boolean> {
  try {
    await auth();
    return true;
  } catch (err) {
    return false;
  }
}

export async function coordinatesToNumbers(
  coordinates: Prisma.Decimal[] | undefined
): Promise<[number, number] | undefined> {
  if (!coordinates) return undefined;
  const lon = Number(coordinates[0]);
  const lat = Number(coordinates[1]);
  if (isNaN(lon) || isNaN(lat)) return undefined;
  return [lon, lat];
}

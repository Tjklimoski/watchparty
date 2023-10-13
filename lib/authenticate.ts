"use server";

import { getServerSession } from "next-auth";
import { config } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { User } from "@/types";
import Prisma from "@prisma/client";

// Return the logged in user, or null if not logged in
export default async function auth() {
  // session contains name, email, & image fields by default from nextAuth.
  const session = await getServerSession(config);
  const email = session?.user?.email;

  if (!email) return null;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) return null;

  // convert user into User type, turn coordinates from Decimal to Number type.
  // Couldnt return Decimal[] type from server action to client component.
  const convertedUser = coordinatesToNumbers(user);

  return convertedUser;
}

export async function getIsAuth() {
  const user = await auth();
  return !!user;
}

function coordinatesToNumbers(user: Prisma.User): User {
  const coordinates = user.location?.coordinates;
  if (!coordinates) return user as unknown as User;
  const newCoords: [number, number] = [
    Number(coordinates[0] ?? ""),
    Number(coordinates[1] ?? ""),
  ];
  const newUser: User = {
    ...user,
    location: { ...user.location, coordinates: newCoords },
  };
  return newUser;
}

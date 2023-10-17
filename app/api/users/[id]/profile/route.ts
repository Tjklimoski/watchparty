import { NextRequest, NextResponse as res } from "next/server";
import prisma from "@/prisma/client";

// Get specified user's data to be rendered on that user's profile page
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: userId } = params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        myWatchParties: {
          orderBy: {
            date: "asc",
          },
        },
        // Only fetch the watchparties the user has already attended. Not ones they plan to attend in the future
        goingToWatchParties: {
          where: {
            date: {
              lte: new Date(),
            },
          },
          orderBy: {
            date: "desc",
          },
        },
      },
    });

    if (!user) throw new Error("Invalid id");

    // Need to extract: id, name, image, location.city, hosted COUNT, hosting COUNT, attended COUNT, createdAT, myList

    const {
      id,
      name,
      image,
      createdAt,
      myWatchParties,
      goingToWatchParties: attendedWatchParties,
    } = user;
    const city = user.location?.city ?? "NA";
    // only return the 20 most recently added movies and tv shows
    const myList = user.myList.slice(user.myList.length - 20).reverse();

    const hosted_count = myWatchParties.filter(
      watchParty => watchParty.date <= new Date()
    ).length;
    const hosting_count = myWatchParties.length - hosted_count;
    // The database only returned the watchparties the user attended
    const attended_count = attendedWatchParties.length;

    // build limited user obj to be returned
    const limitedUser = {
      id,
      name,
      image,
      city,
      createdAt,
      hosted_count,
      hosting_count,
      attended_count,
      myList,
      myWatchParties,
      attendedWatchParties,
    };

    return res.json(limitedUser);
  } catch (err) {
    return new res("Invalid id", { status: 400 });
  }
}

import auth from "@/lib/authenticate";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse as res } from "next/server";

// GET ALL watchparties associated with the current user
export async function GET(req: NextRequest) {
  try {
    const user = await auth();
    if (!user) throw new Error("No current user");

    // parse Page searchParam value
    let page: string | number | null = req.nextUrl.searchParams.get("page");
    if (!page) throw new Error("No page searchParam passed");
    page = parseInt(page);
    if (isNaN(page)) throw new Error("Page serachParam must be a number");

    // set pagination variables
    const take = 20;
    const skip = (page - 1) * take;

    // Get all the user's watchParties that are upcoming and order by date asc.
    const userUpcoming = await prisma.user.findUniqueOrThrow({
      where: {
        id: user.id,
      },
      include: {
        goingToWatchParties: {
          where: {
            date: {
              gt: new Date(),
            },
          },
          orderBy: {
            date: "asc",
          },
        },
      },
    });

    // Get all the user's watchParties that have passed, and order by date desc.
    const userPassed = await prisma.user.findUniqueOrThrow({
      where: {
        id: user.id,
      },
      include: {
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

    // compile WatchParties
    const allWatchParties = [
      ...userUpcoming.goingToWatchParties,
      ...userPassed.goingToWatchParties,
    ];

    // Build out data
    const total_results = allWatchParties.length;
    const results = allWatchParties.splice(skip, take);
    const total_pages = Math.max(Math.ceil(total_results / take), 1);
    const data = {
      page,
      total_results,
      results,
      total_pages,
    };

    return res.json(data);
  } catch (err: Error | any) {
    console.error(err);
    return new res(err?.message ?? "Request Failed", { status: 400 });
  }
}

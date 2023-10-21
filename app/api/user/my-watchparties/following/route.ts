import { NextRequest, NextResponse as res } from "next/server";
import auth from "@/lib/authenticate";
import prisma from "@/prisma/client";

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

    // get all watchparties that the user is following that are upcoming and order by date
    const userWithWatchParties = await prisma.user.findUniqueOrThrow({
      where: {
        id: user.id,
      },
      include: {
        interestedInWatchParties: {
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

    const followingWatchParties = userWithWatchParties.interestedInWatchParties;

    // Build out data
    const total_results = followingWatchParties.length;
    const results = followingWatchParties.splice(skip, take);
    const total_pages = Math.max(Math.ceil(total_results / take), 1);
    const data = {
      page,
      total_results,
      results,
      total_pages,
    };

    return res.json(data);
  } catch (err: Error | any) {
    return new res(err?.message ?? err ?? "Request failed", { status: 400 });
  }
}

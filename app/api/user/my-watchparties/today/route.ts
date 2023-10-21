import auth from "@/lib/authenticate";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse as res } from "next/server";

// GET ATTENDED watchparties associated with the current user
export async function GET(req: NextRequest) {
  try {
    const user = await auth();
    if (!user) throw new Error("No current user");

    const todayStart = new Date(new Date().toDateString());
    const todayEnd = new Date(todayStart.getTime() + 1000 * 60 * 60 * 24);

    // parse Page searchParam value
    let page: string | number | null = req.nextUrl.searchParams.get("page");
    if (!page) throw new Error("No page searchParam passed");
    page = parseInt(page);
    if (isNaN(page)) throw new Error("Page serachParam must be a number");

    // set pagination variables
    const take = 20;
    const skip = (page - 1) * take;

    const userWithWatchParties = await prisma.user.findUniqueOrThrow({
      where: {
        id: user.id,
      },
      include: {
        goingToWatchParties: {
          where: {
            AND: [
              {
                date: {
                  gte: todayStart,
                },
              },
              {
                date: {
                  lt: todayEnd,
                },
              },
            ],
          },
          orderBy: {
            date: "asc",
          },
        },
      },
    });

    const todayWatchParties = userWithWatchParties.goingToWatchParties;

    // Build out data
    const total_results = todayWatchParties.length;
    const results = todayWatchParties.splice(skip, take);
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

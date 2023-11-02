import BuildPaginationResultsData from "@/lib/BuildData";
import auth from "@/lib/authenticate";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse as res } from "next/server";

// GET ATTENDED watchparties associated with the current user
export async function GET(req: NextRequest) {
  try {
    const user = await auth();

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

    const data = BuildPaginationResultsData(todayWatchParties, skip, take);

    return res.json(data);
  } catch (err: Error | any) {
    console.error(err);
    return new res(err?.message ?? "Request Failed", { status: 400 });
  }
}

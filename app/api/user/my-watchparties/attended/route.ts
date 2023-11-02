import BuildPaginationResultsData from "@/lib/BuildData";
import auth from "@/lib/authenticate";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse as res } from "next/server";

// GET ATTENDED watchparties associated with the current user
export async function GET(req: NextRequest) {
  try {
    const user = await auth();

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

    const attendedWatchParties = userWithWatchParties.goingToWatchParties;

    const data = BuildPaginationResultsData(attendedWatchParties, skip, take);

    return res.json(data);
  } catch (err: Error | any) {
    console.error(err);
    return new res(err?.message ?? "Request Failed", { status: 400 });
  }
}

import { NextRequest, NextResponse as res } from "next/server";
import auth from "@/lib/authenticate";
import prisma from "@/prisma/client";
import BuildPaginationResultsData from "@/lib/BuildData";

// To handle DynamicServerError at build time on Vercel
export const dynamic = "force-dynamic";

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

    const data = BuildPaginationResultsData(followingWatchParties, skip, take);

    return res.json(data);
  } catch (err: Error | any) {
    return new res(err?.message ?? err ?? "Request failed", { status: 400 });
  }
}

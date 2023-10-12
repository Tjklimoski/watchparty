import auth from "@/lib/authenticate";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse as res } from "next/server";

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

    const myWatchParties = prisma.watchParty.findMany({
      where: {
        userId: user.id,
      },
    });

    return res.json(userWithParties);
  } catch (err: Error | any) {
    console.error(err);
    return new res(err?.message ?? "Request Failed", { status: 400 });
  }
}

// export async function GET(req: NextRequest) {
//   try {
//     const user = await auth();

//     if (!user) throw new Error("No current user");

//     const userWithParties = await prisma.user.findUniqueOrThrow({
//       where: {
//         id: user.id,
//       },
//       include: {
//         myWatchParties: true,
//       },
//     });

//     return res.json(userWithParties);
//   } catch (err: Error | any) {
//     console.error(err);
//     return new res(err?.message ?? "Request Failed", { status: 400 });
//   }
// }

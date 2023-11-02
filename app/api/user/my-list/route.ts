import { NextRequest, NextResponse as res } from "next/server";
import prisma from "@/prisma/client";
import { MyListItem } from "@/types";
import auth from "@/lib/authenticate";
import BuildPaginationResultsData from "@/lib/BuildData";

// GET all MyListItem with pagination
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

    // Get myList field from current user - will return ALL MyListItems
    // Can't use take and skip in prisma query because I need all the documents to build the rest of the return obj (total_resuilts, total_pages)
    const userWithMyList = await prisma.user.findUniqueOrThrow({
      where: {
        id: user.id,
      },
      select: {
        myList: true,
      },
    });

    const data = BuildPaginationResultsData(
      userWithMyList.myList.reverse(),
      skip,
      take
    );

    return res.json(data);
  } catch (err: Error | any) {
    console.error(err);
    return new res(err?.message ?? "Request Failed", { status: 400 });
  }
}

// ADD a MyListItem to the array
export async function POST(req: NextRequest) {
  try {
    const myListItem: MyListItem = await req.json();

    if (!myListItem.id || !myListItem.media_type)
      throw new Error("Invalid data");

    const user = await auth();

    // catch if the media is already on user's myList.
    if (
      user.myList.some(
        ({ id, media_type }) =>
          id === myListItem.id && media_type === myListItem.media_type
      )
    )
      return new res("Item already on your list", { status: 200 });

    // a myList field will be on every user, even if they have no items in the array
    user.myList.push(myListItem);

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        myList: user.myList,
      },
    });

    if (!updatedUser) throw new Error("Failed to update user");

    return res.json(updatedUser);
  } catch (err: Error | any) {
    return new res(err?.message ?? "Request Failed", { status: 400 });
  }
}

// Remove the specified MyListItem from the array
export async function DELETE(req: NextRequest) {
  try {
    const myListItemToDelete: MyListItem = await req.json();

    if (!myListItemToDelete.id || !myListItemToDelete.media_type)
      throw new Error("Invalid data");

    const user = await auth();

    const updatedMyList = user.myList.filter(
      ({ id, media_type }) =>
        !(
          id === myListItemToDelete.id &&
          media_type === myListItemToDelete.media_type
        )
    );

    const updatedUser = await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        myList: updatedMyList,
      },
    });

    if (!updatedUser) throw new Error("Failed to update user");

    return res.json(updatedUser);
  } catch (err: Error | any) {
    return new res(err?.message ?? "Request Failed", { status: 400 });
  }
}

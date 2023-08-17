import { NextRequest, NextResponse as res } from "next/server";
import prisma from "@/prisma/client";
import { MyListItem } from "@/types";
import auth from "@/lib/authenticate";

export async function GET(req: NextRequest) {
  // Return the current users myList
}

export async function POST(req: NextRequest) {
  const myListItem: MyListItem = await req.json();

  if (!myListItem.id || !myListItem.media_type) return new res('Invalid data', { status: 400 });

  const user = await auth();

  if (!user) return new res('Invalid user', { status: 400 });

  // catch if the media is already on user's myList.
  if (user.myList.some(({ id, media_type }) => id === myListItem.id && media_type === myListItem.media_type)) return new res('Item already on your list', { status: 200 });

  // a myList field will be on every user, even if they have no items in the list
  user.myList.push(myListItem);

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      myList: user.myList,
    }
  })

  if (!updatedUser) return new res('Failed to update user', { status: 500 });

  return res.json(updatedUser);
}

export async function DELETE(req: NextRequest) {
  // remove the sent myListItem from the current user's myList
  const myListItemToDelete: MyListItem = await req.json();

  if (!myListItemToDelete.id || !myListItemToDelete.media_type) return new res('invalid data', { status: 400 });

  const user = await auth();

  if (!user) return new res('Invalid user', { status: 400 })

  const updatedMyList = user?.myList.filter(({ id, media_type }) => !(id === myListItemToDelete.id && media_type === myListItemToDelete.media_type));

  const updatedUser = await prisma.user.update({
    where: {
      id: user?.id,
    },
    data: {
      myList: updatedMyList,
    }
  });

  if (!updatedUser) return new res('failed to update user', { status: 500 });

  return res.json(updatedUser);
}
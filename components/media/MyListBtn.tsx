"use client";

import React from "react";
import { MyListItem, User } from "@/types";
import axios from "axios";
import { FaCheck, FaPlus } from "react-icons/fa6";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import APIFetcher from "@/lib/APIFetcher";

interface MyListBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  mediaId: string;
  media_type: "movie" | "tv" | undefined;
  sm?: boolean;
  tooltip?: boolean;
}

async function addToMyList(
  id: string,
  media_type: "movie" | "tv" | undefined
): Promise<User | undefined> {
  return axios
    .post("/api/user/my-list", { id, media_type })
    .then((res) => res.data);
}

async function removeFromMyList(
  id: string,
  media_type: "movie" | "tv" | undefined
): Promise<User | undefined> {
  return axios
    .delete("/api/user/my-list", { data: { id, media_type } })
    .then((res) => res.data);
}

export default function MyListBtn({
  mediaId: id,
  media_type,
  sm,
  tooltip,
  ...props
}: MyListBtnProps) {
  const router = useRouter(); // For sending the user to the create WatchParty page.
  const { data: user, mutate: userMutate } = useSWR<User>("/user", APIFetcher);
  const [inMyList, setInMyList] = useState<boolean>(false);

  useEffect(() => {
    setInMyList(() => {
      if (!user || !id || !media_type) return false;
      const inMyList =
        user?.myList.some(
          (item: MyListItem) => item.id === id && item.media_type === media_type
        ) ?? false;
      return inMyList;
    });
  }, [user, id, media_type]);

  return (
    <button
      className={`${sm ? "btn-sm" : "btn"} btn-primary ${
        !inMyList && "btn-outline"
      } hover:btn-active focus-visible:btn-active border-2 btn-circle grid place-items-center ${
        tooltip && "tooltip"
      } normal-case transition duration-300`}
      data-tip={inMyList ? "Remove from My List" : "Add to My List"}
      aria-label={inMyList ? "Remove from My List" : "Add to My List"}
      {...props}
      onClick={async () => {
        try {
          setInMyList((current) => !current);

          const updatedUser = inMyList
            ? await removeFromMyList(id, media_type)
            : await addToMyList(id, media_type);

          if (updatedUser === undefined) {
            throw new Error("No updated user");
          }

          userMutate({ ...user!, myList: updatedUser.myList });
        } catch (err) {
          // refresh the user data to revert the optomistic inMyList state change
          userMutate({ ...user! });
          console.log(err);
        }
      }}
    >
      {inMyList ? (
        <FaCheck size={sm ? 20 : 25} />
      ) : (
        <FaPlus size={sm ? 20 : 25} />
      )}
    </button>
  );
}

"use client";

import React from "react";
import { MyListItem, User } from "@/types";
import axios from "axios";
import { FaCheck, FaPlus } from "react-icons/fa6";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import APIFetcher from "@/lib/APIFetcher";
import useUser from "@/hooks/useUser";

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
  const { user, mutate: userMutate } = useUser();
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

  async function handleClick() {
    try {
      setInMyList((current) => !current);

      const updatedUser = inMyList
        ? await removeFromMyList(id, media_type)
        : await addToMyList(id, media_type);

      if (!updatedUser) throw new Error("No updated user");

      userMutate();
    } catch (err) {
      // refresh the user data to revert the optimistic inMyList state change
      if (user) userMutate({ ...user });
      console.log(err);
    }
  }

  return (
    <button
      className={`${sm ? "btn-sm" : "btn"} btn-primary ${
        !inMyList && "btn-outline"
      } hover:btn-active focus-visible:btn-active border-2 btn-circle grid place-items-center ${
        tooltip && "tooltip"
      } tooltip-primary normal-case transition duration-300`}
      data-tip={inMyList ? "Remove from My List" : "Add to My List"}
      aria-label={inMyList ? "Remove from My List" : "Add to My List"}
      {...props}
      onClick={handleClick}
    >
      {inMyList ? (
        <FaCheck size={sm ? 20 : 30} />
      ) : (
        <FaPlus size={sm ? 20 : 30} />
      )}
    </button>
  );
}

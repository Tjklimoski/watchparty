"use client";

import React from "react";
import { WatchParty } from "@/types";
import axios from "axios";
import useSWR from "swr";
import { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";
import apiFetcher, { API } from "@/lib/APIFetcher";
import { BsPersonFillAdd, BsPersonFillDash } from "react-icons/bs";

interface MyListBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  watchPartyId: string;
  sm?: boolean;
  tooltip?: boolean;
}

// async function addToMyList(
//   id: string,
//   media_type: "movie" | "tv" | undefined
// ): Promise<User | undefined> {
//   return axios
//     .post("/api/user/my-list", { id, media_type })
//     .then((res) => res.data);
// }

// async function removeFromMyList(
//   id: string,
//   media_type: "movie" | "tv" | undefined
// ): Promise<User | undefined> {
//   return axios
//     .delete("/api/user/my-list", { data: { id, media_type } })
//     .then((res) => res.data);
// }

export default function AttendBtn({
  watchPartyId: id,
  sm,
  tooltip,
  ...props
}: MyListBtnProps) {
  const { user } = useUser();
  const [attending, setAttending] = useState(false);

  // Fetch watchParty Data
  const { data: watchParty, error: watchPartyError } = useSWR<WatchParty>(
    `/watchparties/${id}`,
    apiFetcher
  );
  if (watchPartyError) throw new Error("No WatchParty found");

  // Set attending state
  useEffect(() => {
    if (!user) return;
    setAttending(() => {
      return user.goingToWatchPartiesIds.includes(id);
    });
  }, [user, id]);

  return (
    <button
      className={`${sm ? "btn-sm" : "btn"} btn-primary ${
        !attending && "btn-outline"
      } hover:btn-active focus-visible:btn-active border-2 btn-circle grid place-items-center ${
        tooltip && "tooltip"
      } tooltip-primary normal-case transition duration-300`}
      data-tip={attending ? "Quit Attending" : "Attend WatchParty"}
      aria-label={attending ? "Quit Attending" : "Attend WatchParty"}
      {...props}
      onClick={async () => {
        try {
          if (!user) throw new Error("No current user");
          setAttending((current) => !current);
          // update both the watchParty and the user
          // const updatedUser = await API.post("/user/attend", { id }).then(
          //   (res) => res.data
          // );
          // if (!updatedUser) throw new Error("No updated user");

          const updatedWatchParty = await API.patch(`/watchparties/${id}`, {
            partygoerIds: user.id,
          }).then((res) => res.data);
          if (!updatedWatchParty) throw new Error("No updated WatchParty");

          console.log("AXIOS RETURNED WP: ", updatedWatchParty);
        } catch (err: Error | any) {
          console.error(err?.message ?? err);
        }
        // try {
        //   setInMyList((current) => !current);
        //   const updatedUser = attending
        //     ? await removeFromMyList(id, media_type)
        //     : await addToMyList(id, media_type);
        //   if (updatedUser === undefined) {
        //     throw new Error("No updated user");
        //   }
        //   userMutate({ ...user!, myList: updatedUser.myList });
        // } catch (err) {
        //   // refresh the user data to revert the optomistic attending state change
        //   userMutate({ ...user! });
        //   console.log(err);
        // }
      }}
    >
      {attending ? (
        <BsPersonFillDash size={sm ? 20 : 25} />
      ) : (
        <BsPersonFillAdd size={sm ? 20 : 25} />
      )}
    </button>
  );
}

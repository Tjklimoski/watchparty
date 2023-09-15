"use client";

import React from "react";
import { User, WatchParty } from "@/types";
import useSWR from "swr";
import { useEffect, useState } from "react";
import apiFetcher, { API } from "@/lib/APIFetcher";
import { BsPersonFillAdd, BsPersonFillDash } from "react-icons/bs";

interface MyListBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  watchPartyId: string;
  sm?: boolean;
  tooltip?: boolean;
}

async function addUserToList(id: string, userId: string): Promise<WatchParty> {
  return API.post(`/watchparties/${id}/partygoers`, {
    userId,
  }).then((res) => res.data);
}

async function deleteUserFromList(
  id: string,
  userId: string
): Promise<WatchParty> {
  return API.delete(`/watchparties/${id}/partygoers/${userId}`).then(
    (res) => res.data
  );
}

export default function AttendBtn({
  watchPartyId: id,
  sm,
  tooltip,
  ...props
}: MyListBtnProps) {
  // Fetch current user -- does this need to useSWR to allow for mutation and optomistic updating?
  const { data: user, mutate: userMutate } = useSWR<User>("/user", apiFetcher);
  const [attending, setAttending] = useState(false);

  // Fetch watchParty Data
  const { data: watchParty, error: watchPartyError } = useSWR<WatchParty>(
    id && `/watchparties/${id}`,
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

  async function handleClick() {
    try {
      if (!user) throw new Error("No current user");
      setAttending((current) => !current);

      const updatedWatchParty = attending
        ? await deleteUserFromList(id, user.id)
        : await addUserToList(id, user.id);

      if (!updatedWatchParty) throw new Error("No updated WatchParty");
    } catch (err: Error | any) {
      console.error(err?.message ?? err);
    } finally {
      // force revalidation of user data
      userMutate();
    }
  }

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
      onClick={handleClick}
    >
      {attending ? (
        <BsPersonFillDash size={sm ? 20 : 25} />
      ) : (
        <BsPersonFillAdd size={sm ? 20 : 25} />
      )}
    </button>
  );
}

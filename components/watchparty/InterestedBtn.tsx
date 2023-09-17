"use client";

import React from "react";
import { User, WatchParty } from "@/types";
import useSWR from "swr";
import { useEffect, useState } from "react";
import apiFetcher, { API } from "@/lib/APIFetcher";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";

interface MyListBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  watchPartyId: string;
  sm?: boolean;
  tooltip?: boolean;
}

async function addUserToList(id: string, userId: string): Promise<WatchParty> {
  return API.post(`/watchparties/${id}/interested`, {
    userId,
  }).then((res) => res.data);
}

async function deleteUserFromList(
  id: string,
  userId: string
): Promise<WatchParty> {
  return API.delete(`/watchparties/${id}/interested/${userId}`).then(
    (res) => res.data
  );
}

export default function InterestedBtn({
  watchPartyId: id,
  sm,
  tooltip,
  ...props
}: MyListBtnProps) {
  // Fetch current user
  const { data: user, mutate: userMutate } = useSWR<User>("/user", apiFetcher);
  const [following, setFollowing] = useState(false);

  // Fetch watchParty Data
  const { data: watchParty, error: watchPartyError } = useSWR<WatchParty>(
    id && `/watchparties/${id}`,
    apiFetcher
  );
  if (watchPartyError) throw new Error("No WatchParty found");

  // Set following state
  useEffect(() => {
    if (!user) return;
    setFollowing(() => {
      return user.interestedInWatchPartiesIds.includes(id);
    });
  }, [user, id]);

  async function handleClick() {
    try {
      if (!user) throw new Error("No current user");
      setFollowing((current) => !current);

      const updatedWatchParty = following
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
      className={`${sm ? "btn-sm" : "btn"} btn-secondary ${
        !following && "btn-outline"
      } hover:btn-active focus-visible:btn-active border-2 btn-circle grid place-items-center ${
        tooltip && "tooltip"
      } tooltip-secondary normal-case transition duration-300`}
      data-tip={following ? "Quit Following" : "Follow WatchParty"}
      aria-label={following ? "Quit Following" : "Follow WatchParty"}
      {...props}
      onClick={handleClick}
    >
      {following ? (
        <BsFillEyeSlashFill size={sm ? 20 : 30} />
      ) : (
        <BsFillEyeFill size={sm ? 20 : 30} />
      )}
    </button>
  );
}

"use client";

import React from "react";
import { WatchParty } from "@/types";
import useSWR from "swr";
import { useEffect, useState } from "react";
import apiFetcher, { API } from "@/lib/APIFetcher";
import { BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import useUser from "@/hooks/useUser";

interface MyListBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  watchPartyId: string;
  sm?: boolean;
  tooltip?: boolean;
  updateWatchPartyData: (data: WatchParty) => void;
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
  updateWatchPartyData,
  ...props
}: MyListBtnProps) {
  // Fetch current user
  const { user, mutate: userMutate } = useUser();
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

  // passed is set to true if the event has happened
  const passed = new Date(watchParty?.date ?? "").getTime() < Date.now();

  async function handleClick() {
    try {
      if (!watchParty) throw new Error("No watchparty");
      if (!user) throw new Error("No current user");
      setFollowing((current) => !current);

      // Create optimistic data to update watchParty in advance
      const optimisticInterestedUsersIds =
        watchParty.interestedUsersIds.includes(user.id)
          ? watchParty.interestedUsersIds.filter((id) => id !== user.id)
          : [...watchParty.interestedUsersIds, user.id];
      const optimisticData = {
        ...watchParty,
        interestedUsersIds: optimisticInterestedUsersIds,
      };
      updateWatchPartyData(optimisticData);

      const updatedWatchParty = following
        ? await deleteUserFromList(id, user.id)
        : await addUserToList(id, user.id);

      if (!updatedWatchParty) throw new Error("No updated WatchParty");
    } catch (err: Error | any) {
      // if error, revalidate watchparty data to remove optimistic update
      // passing in exisiting watchParty data to prevent loading state flash on revalidation.
      if (watchParty) updateWatchPartyData(watchParty);
      // revalidate userData to remove optimistic state change on button
      // Have to pass in the exisiting user spread in an object to force a change in user's referential equality to trigger useEffect to reset state
      if (user) userMutate({ ...user });
      console.error(err?.message ?? err);
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
      disabled={passed}
    >
      {following ? (
        <BsFillEyeSlashFill size={sm ? 20 : 30} />
      ) : (
        <BsFillEyeFill size={sm ? 20 : 30} />
      )}
    </button>
  );
}

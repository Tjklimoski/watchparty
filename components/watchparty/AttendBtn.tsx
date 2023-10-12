"use client";

import React from "react";
import { WatchParty } from "@/types";
import useSWR from "swr";
import { useEffect, useState } from "react";
import apiFetcher, { API } from "@/lib/APIFetcher";
import { BsPersonFillAdd, BsPersonFillDash } from "react-icons/bs";
import Confetti from "react-confetti-explosion";
import useUser from "@/hooks/useUser";

interface MyListBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  watchPartyId: string;
  sm?: boolean;
  tooltip?: boolean;
  updateWatchPartyData: (data: WatchParty) => void;
}

async function addUserToList(id: string, userId: string): Promise<WatchParty> {
  return API.post(`/watchparties/${id}/partygoers`, {
    userId,
  }).then(res => res.data);
}

async function deleteUserFromList(
  id: string,
  userId: string
): Promise<WatchParty> {
  return API.delete(`/watchparties/${id}/partygoers/${userId}`).then(
    res => res.data
  );
}

export default function AttendBtn({
  watchPartyId: id,
  sm,
  tooltip,
  updateWatchPartyData,
  ...props
}: MyListBtnProps) {
  const { user, mutate: userMutate } = useUser();
  const [attending, setAttending] = useState(false);
  const [animateConfetti, setAnimateConfetti] = useState(false);

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

  // passed is set to true if the event has happened
  const passed = new Date(watchParty?.date ?? "").getTime() < Date.now();

  async function handleClick() {
    try {
      if (!watchParty) throw new Error("No watchparty");
      if (!user) throw new Error("No current user");
      setAttending(current => {
        const isAttending = !current;
        setAnimateConfetti(isAttending);
        return isAttending;
      });

      // Create optimistic data to update watchParty in advance
      const optimisticPartygoerIds = watchParty.partygoerIds.includes(user.id)
        ? watchParty.partygoerIds.filter(id => id !== user.id)
        : [...watchParty.partygoerIds, user.id];
      const optimisticData = {
        ...watchParty,
        partygoerIds: optimisticPartygoerIds,
      };
      updateWatchPartyData(optimisticData);

      const updatedWatchParty = attending
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
    <>
      <button
        className={`relative ${sm ? "btn-sm" : "btn"} btn-primary ${
          !attending && "btn-outline"
        } hover:btn-active focus-visible:btn-active border-2 btn-circle grid place-items-center ${
          tooltip && "tooltip"
        } tooltip-primary normal-case transition duration-300`}
        data-tip={attending ? "Quit Attending" : "Attend WatchParty"}
        aria-label={attending ? "Quit Attending" : "Attend WatchParty"}
        {...props}
        onClick={handleClick}
        disabled={passed}
      >
        {attending ? (
          <BsPersonFillDash size={sm ? 20 : 30} />
        ) : (
          <BsPersonFillAdd size={sm ? 20 : 30} />
        )}
        {animateConfetti && (
          <Confetti
            className="absolute"
            particleCount={50}
            particleSize={10}
            width={450}
            force={0.43}
            colors={["#3abff8", "#828df8", "#f471b5", "#2bd4bd"]}
            onComplete={() => setAnimateConfetti(false)}
          />
        )}
      </button>
    </>
  );
}

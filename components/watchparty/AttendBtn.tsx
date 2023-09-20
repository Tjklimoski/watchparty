"use client";

import React from "react";
import { User, WatchParty } from "@/types";
import useSWR from "swr";
import { useEffect, useState } from "react";
import apiFetcher, { API } from "@/lib/APIFetcher";
import { BsPersonFillAdd, BsPersonFillDash } from "react-icons/bs";
import Confetti from "react-confetti-explosion";

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
  // Fetch current user
  const { data: user, mutate: userMutate } = useSWR<User>("/user", apiFetcher);
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

  async function handleClick() {
    try {
      if (!user) throw new Error("No current user");
      setAttending((current) => {
        const isAttending = !current;
        setAnimateConfetti(isAttending);
        return isAttending;
      });

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

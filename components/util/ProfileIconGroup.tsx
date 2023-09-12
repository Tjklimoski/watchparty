import React from "react";
import Skeleton from "./Skeleton";
import Link from "next/link";
import ProfileIcon from "./ProfileIcon";

interface ProfileIconGroupProps {
  userIds: string[] | undefined;
  size?: number;
  length?: number;
  handleClick: () => void;
  children: React.ReactNode;
}

export default function ProfileIconGroup({
  userIds,
  size = 38,
  length = 5,
  handleClick,
  children,
}: ProfileIconGroupProps) {
  return (
    <div className="ms-2 [&>*]:-ms-2 flex flex-wrap">
      {!userIds ? (
        Array(length + 1)
          .fill(null)
          .map((item, i) => (
            <Skeleton
              key={i}
              className={`w-[${size}px] h-[${size}px] rounded-full`}
            />
          ))
      ) : userIds.length === 0 ? (
        children
      ) : (
        <>
          {userIds.slice(0, length).map((userId) => (
            <Link
              key={userId}
              href={`/user/${userId}`}
              className="outline-none group"
            >
              <ProfileIcon id={userId} size={size} group />
            </Link>
          ))}
          {userIds.length > length && (
            <button
              className={`w-[${size}px] aspect-square rounded-full grid place-items-center bg-neutral text-sm outline outline-2 outline-accent hover:outline-accent-focus focus:outline-primary-focus select-none`}
              onClick={handleClick}
            >
              +{userIds.length - length}
            </button>
          )}
        </>
      )}
    </div>
  );
}

import { useRef } from "react";
import Skeleton from "./Skeleton";
import Link from "next/link";
import ProfileIcon from "./ProfileIcon";
import Popup from "./Popup";

interface ProfileIconGroupProps {
  title: string;
  userIds: string[] | undefined;
  numberOfIcons?: number;
  children: React.ReactNode;
}

export default function ProfileIconGroup({
  title,
  userIds,
  numberOfIcons = 5,
  children,
}: ProfileIconGroupProps) {
  const popupRef = useRef<HTMLDialogElement>(null);

  function openPopup() {
    if (!popupRef.current) return;
    popupRef.current.showModal();
  }

  return (
    <>
      <div className="ms-2 [&>*]:-ms-2 flex flex-wrap">
        {!userIds ? (
          Array(numberOfIcons + 1)
            .fill(null)
            .map((item, i) => (
              <Skeleton key={i} className={`w-12 h-12 rounded-full`} />
            ))
        ) : userIds.length === 0 ? (
          children
        ) : (
          <>
            {userIds.slice(0, numberOfIcons).map(userId => (
              <Link
                key={userId}
                href={`/user/${userId}`}
                className="outline-none group"
              >
                <ProfileIcon id={userId} className="w-12" group />
              </Link>
            ))}
            {userIds.length > numberOfIcons && (
              <button
                className={`w-12 aspect-square rounded-full grid place-items-center bg-neutral text-sm outline outline-2 outline-accent hover:outline-accent-focus focus:outline-primary-focus select-none`}
                onClick={openPopup}
              >
                +{userIds.length - numberOfIcons}
              </button>
            )}
          </>
        )}
      </div>
      <Popup title={title} userIds={userIds} ref={popupRef} />
    </>
  );
}

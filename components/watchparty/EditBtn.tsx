"use client";

import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";

interface EditBtnProps {
  watchPartyId: string;
  resize?: boolean;
}

export default function EditBtn({ watchPartyId, resize }: EditBtnProps) {
  const router = useRouter();

  // btn and icon text sizes using container querys for WatchPartySearchResult component
  return (
    <button
      className={`${
        resize ? "btn-sm @xs:btn-md" : "btn-md"
      } btn btn-circle btn-primary btn-outline border-2 grid place-items-center tooltip tooltip-info normal-case`}
      data-tip="Edit"
      aria-label="Edit your WatchParty"
      onClick={() => router.push(`/watchparty/${watchPartyId}/edit`)}
    >
      <MdEdit
        className={resize ? "text-[20px] @xs:text-[30px]" : "text-[30px]"}
      />
    </button>
  );
}

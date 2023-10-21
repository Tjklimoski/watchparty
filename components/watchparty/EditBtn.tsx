"use client";

import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";

interface EditBtnProps {
  watchPartyId: string;
}

export default function EditBtn({ watchPartyId }: EditBtnProps) {
  const router = useRouter();

  // btn and icon text sizes using container querys for WatchPartySearchResult component
  return (
    <button
      className="btn-sm @xs:btn-md btn btn-circle btn-primary btn-outline border-2 grid place-items-center tooltip tooltip-info normal-case"
      data-tip="Edit"
      aria-label="Edit your WatchParty"
      onClick={() => router.push(`/watchparty/${watchPartyId}/edit`)}
    >
      <MdEdit className="text-[20px] @xs:text-[30px]" />
    </button>
  );
}

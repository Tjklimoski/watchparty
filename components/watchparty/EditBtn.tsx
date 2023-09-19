"use client";

import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";

interface EditBtnProps {
  watchPartyId: string;
}

export default function EditBtn({ watchPartyId }: EditBtnProps) {
  const router = useRouter();

  return (
    <button
      className="btn btn-circle btn-primary btn-outline border-2 grid place-items-center tooltip tooltip-info normal-case"
      data-tip="Edit"
      aria-label="Edit your WatchParty"
      onClick={() => router.push(`/watchparty/${watchPartyId}/edit`)}
    >
      <MdEdit size={30} />
    </button>
  );
}

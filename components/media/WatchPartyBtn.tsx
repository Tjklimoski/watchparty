import { BiSolidParty } from "react-icons/bi";

interface WatchPartyBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  mediaId: string;
  sm?: boolean;
}

export default function WatchPartyBtn({
  mediaId: id,
  sm,
  ...props
}: WatchPartyBtnProps) {
  return (
    <button
      className={`${
        sm ? "btn-sm" : "btn"
      } hover:btn-active focus:btn-active btn-secondary btn-circle btn-outline border-2 tooltip normal-case grid place-items-center transition duration-300`}
      data-tip="Create WatchParty"
      aria-label="Create WatchParty"
      {...props}
    >
      <BiSolidParty size={sm ? 20 : 25} />
    </button>
  );
}

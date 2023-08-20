import { BiSolidParty } from "react-icons/bi";

interface WatchPartyBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  mediaId: string;
  sm?: boolean;
  tooltip?: boolean;
}

export default function WatchPartyBtn({
  mediaId: id,
  sm,
  tooltip,
  ...props
}: WatchPartyBtnProps) {
  return (
    <button
      className={`${
        sm ? "btn-sm" : "btn"
      } hover:btn-active focus-visible:btn-active btn-secondary btn-circle btn-outline border-2 ${
        tooltip && "tooltip"
      } normal-case grid place-items-center transition duration-300`}
      data-tip="Create WatchParty"
      aria-label="Create WatchParty"
      {...props}
    >
      <BiSolidParty size={sm ? 20 : 25} />
    </button>
  );
}

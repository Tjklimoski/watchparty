import { useEffect, useState } from "react";
import { BiSolidParty } from "react-icons/bi";
import { useRouter } from "next/navigation";

interface WatchPartyBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  mediaId: string;
  media_type: "tv" | "movie";
  season?: number;
  episode?: number;
  sm?: boolean;
  tooltip?: boolean;
}

export default function WatchPartyBtn({
  mediaId: id,
  media_type,
  season,
  episode,
  sm,
  tooltip,
  ...props
}: WatchPartyBtnProps) {
  const router = useRouter();
  const [params, setParams] = useState({});
  const searchParams = new URLSearchParams(params).toString();

  useEffect(() => {
    if (!media_type) return;
    setParams(() => {
      if (media_type === "movie" || !season || !episode) {
        return { id, media_type };
      } else {
        return { id, media_type, season, episode };
      }
    });
  }, [id, media_type, season, episode]);

  return (
    <button
      onClick={() => router.push(`/watchparty/create?${searchParams}`)}
      className={`${
        sm ? "btn-sm" : "btn"
      } hover:btn-active focus-visible:btn-active btn-secondary btn-circle btn-outline border-2 ${
        tooltip && "tooltip"
      } tooltip-secondary normal-case grid place-items-center transition duration-300`}
      data-tip="Create WatchParty"
      aria-label="Create WatchParty"
      {...props}
    >
      <BiSolidParty size={sm ? 20 : 25} />
    </button>
  );
}

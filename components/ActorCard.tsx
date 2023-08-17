import { CastCredit } from "@/types";
import Image from "next/image";

interface ActorCardProps {
  actor: CastCredit;
}

export default function ActorCard({ actor }: ActorCardProps) {
  if (!actor) return null;

  const baseImgPath = "https://image.tmdb.org/t/p/";
  const imgSize = "w185";
  const profileImgURL = `${baseImgPath}${imgSize}${actor.profile_path}`;

  return (
    <div className="flex flex-col w-28 sm:w-36 p-2 snap-start gap-2 bg-neutral bg-opacity-50 rounded-md">
      <Image
        className="w-full aspect-poster object-cover rounded-sm"
        alt="Cast photo"
        src={profileImgURL}
        width={128}
        height={192}
      />
      <span className="font-semibold text-md break-words">{actor.name}</span>
      <span className="font-light text-sm">{actor.character}</span>
    </div>
  );
}
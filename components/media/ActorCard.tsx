import { CastCredit } from "@/types";
import Image from "next/image";

interface ActorCardProps {
  actor: CastCredit;
}

export default function ActorCard({ actor }: ActorCardProps) {
  if (!actor) return null;

  const baseImgPath = "https://image.tmdb.org/t/p/";
  const imgSize = "w185";
  const profileImgURL = actor.profile_path
    ? `${baseImgPath}${imgSize}${actor.profile_path}`
    : "/img/placeholder-actor-md.jpg";

  return (
    <div className="flex flex-col w-44 @lg:w-36 p-2 snap-center @lg:snap-start gap-2 bg-neutral bg-opacity-50 rounded-md">
      <Image
        className="w-full h-48 object-cover object-top rounded-sm"
        alt="Cast photo"
        src={profileImgURL}
        width={185}
        height={192}
      />
      <span className="font-semibold text-md break-words">{actor.name}</span>
      <span className="font-light text-sm">{actor.character}</span>
    </div>
  );
}

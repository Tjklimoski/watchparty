import Image from "next/image";
import Skeleton from "./Skeleton";
import { MovieDetails, TVShowDetails } from "@/types";

interface BillboardProps {
  media: MovieDetails | TVShowDetails | undefined;
}

export default function Billboard({ media }: BillboardProps) {
  const baseImgPath = "https://image.tmdb.org/t/p/";
  const imgSize = "original";
  const imageUrl = `${baseImgPath}${imgSize}${media?.backdrop_path ?? ""}`;
  const mediaTitle = media?.media_type === "movie" ? media.title : media?.name;

  return (
    <div className="absolute top-0 left-0 w-full h-[35svh] sm:h-[45svh] min-h-[180px]">
      {media && (
        <Image
          src={imageUrl}
          alt={`${mediaTitle} billboard`}
          fill
          className="object-cover object-top brightness-75"
          priority
        />
      )}

      <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 py-4 min-h-[14svh] flex items-end bg-gradient-to-t from-black via-black/75 via-30% to-transparent">
        {!media ? (
          <div className="mx-auto w-full max-w-[1440px]">
            <Skeleton className="w-1/2 h-8 sm:h-12 md:h-16" />
          </div>
        ) : (
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold drop-shadow-md break-balance webkit-truncate w-full max-w-[1440px] mx-auto">
            {mediaTitle}
          </h2>
        )}
      </div>
    </div>
  );
}
import Image from "next/image";
import type { Movie, TVShow } from "@/types";

interface MediaCardProps {
  media: Movie | TVShow;
}

export default function MediaCard({ media }: MediaCardProps) {
  //check the media_type on media object for accurate typescript checking

  const baseImgPath = "https://image.tmdb.org/t/p/";
  const imgSize = "w500";

  // REDEISGN MOVIE CARD - USE BACKDROP PATH. OVERLAY TITLE ON TOP OF BOTTOM THIRD OF IMAGE. CARD MORE WIDE THAN TALL. NETFLIX STYLE-ish
  return (
    <div
      key={media.id}
      className="p-2 bg-primary bg-opacity-20 rounded-md shadow-md snap-start"
    >
      <Image
        className="aspect-poster object-cover w-full rounded-sm"
        src={baseImgPath + imgSize + media.poster_path}
        alt={`${
          media.media_type === "movie" ? media.title : media.name
        } poster`}
        width={256}
        height={384}
      />
      <p className="font-semibold text-lg my-2">
        {media.media_type === "movie" ? media.title : media.name}
      </p>
    </div>
  );
}

// tmdb poster sizes:
// "w92",
// "w154",
// "w185",
// "w342",
// "w500",
// "w780",
// "original"

// tmdb backdrop sizes:
// "w300",
// "w780",
// "w1280",
// "original"

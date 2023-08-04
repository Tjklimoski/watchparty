import Image from "next/image";
import type { Movie } from "@/types";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const baseImgPath = "https://image.tmdb.org/t/p/";
  const imgSize = "w500";

  return (
    <div
      key={movie.id}
      className="p-2 bg-primary bg-opacity-20 rounded-md shadow-md snap-start"
    >
      <Image
        className="aspect-poster object-cover w-full rounded-sm"
        src={baseImgPath + imgSize + movie.poster_path}
        alt={`${movie.title} poster`}
        width={256}
        height={384}
      />
      <p className="font-semibold text-lg my-2">{movie.title}</p>
    </div>
  );
}

import axios from "axios";
import type { Movie } from "@/types";
import Image from "next/image";

const TMDBApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
  },
  params: {
    api_key: process.env.TMDB_API_KEY,
  },
});

async function GetPopularMovies() {
  console.log("Fetch req ran");
  try {
    const data = await TMDBApi.get("/movie/popular").then(
      (res) => res.data.results
    );
    return data;
  } catch (err) {
    console.log("ERROR: ", err);
  }
}

export default async function MediaPage() {
  const baseImgPath = "https://image.tmdb.org/t/p/";
  const imgSize = "w185";

  const PopularMovies: Movie[] | undefined = await GetPopularMovies();

  return (
    <div className="flex flex-wrap gap-4">
      {PopularMovies &&
        PopularMovies.map((movie) => (
          <div key={movie.id}>
            <Image
              className="h-full w-full object-cover"
              src={baseImgPath + imgSize + movie.poster_path}
              alt={`${movie.title} poster`}
              width={185}
              height={240}
            />
          </div>
        ))}
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

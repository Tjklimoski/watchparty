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
    if (process.env.NODE_ENV === "development") console.error(err);
  }
}

export default async function MediaPage() {
  const baseImgPath = "https://image.tmdb.org/t/p/";
  const imgSize = "w500";

  const PopularMovies: Movie[] | undefined = await GetPopularMovies();

  return (
    <main className="px-6 py-2 md:px-12 md:py-4">
      <div className="max-w-[1440px] mx-auto">
        <div className="h-10 w-96 m-4 text-center bg-zinc-700 rounded-md">
          Search Bar
        </div>

        <h2 className="text-2xl font-semibold">Popular Movies</h2>
        <div className="grid gap-4 grid-flow-col auto-cols-[42%] sm:auto-cols-[29%] md:auto-cols-[22%] lg:auto-cols-[min(18%,_300px)] overflow-x-scroll overscroll-x-contain p-2 snap-mandatory snap-x">
          {PopularMovies &&
            PopularMovies.map((movie) => (
              <div
                key={movie.id}
                className="p-2 bg-primary bg-opacity-20 rounded-sm shadow-md snap-start"
              >
                <Image
                  className="object-cover w-full rounded-sm"
                  src={baseImgPath + imgSize + movie.poster_path}
                  alt={`${movie.title} poster`}
                  width={185}
                  height={240}
                />
                <p className="font-semibold text-lg my-2">{movie.title}</p>
              </div>
            ))}
        </div>
      </div>
    </main>
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

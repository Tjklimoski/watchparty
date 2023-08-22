'use server'

import { Movie, TVShow } from "@/types";
import axios from "axios";

const TMDBApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
  },
  params: {
    with_original_language: 'en'
  }
});

export default async function fetcher(url: string) {
  // get media type (movie / TV) based on url "/movie/popular", "/tv/on_the_air"
  // Set media type on data being returned.
  const media_type: string = url.split('/')[1];
  return TMDBApi.get(url).then((res) => {
    if (Array.isArray(res.data?.results)) {
      return res.data.results.map((result: Movie | TVShow) => ({ ...result, media_type }))
    } else {
      return { ...res.data, media_type }
    }

  });
}

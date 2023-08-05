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
  return TMDBApi.get(url).then((res) => (res.data.results.map((result: Movie | TVShow) => ({ ...result, media_type }))));
}

// Currently doesn't return data if bad url sent:
export async function multiFetcher(urls: string[]) {
  // Using allSettled so only the request that errors will fail,
  // the other requests will still finish and return their data.
  return Promise.allSettled(urls.map((url) => fetcher(url)));
}
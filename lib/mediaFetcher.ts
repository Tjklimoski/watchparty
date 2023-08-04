'use server'

import axios from "axios";

const TMDBApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`
  }
});

export default async function fetcher(url: string) {
  return TMDBApi.get(url).then((res) => res.data.results);
}

// Currently doesn't return data if bad url sent:
export async function multiFetcher(urls: string[]) {
  // Using allSettled so only the request that errors will fail,
  // the other requests will still finish and return their data.
  return Promise.allSettled(urls.map((url) => fetcher(url)));
}
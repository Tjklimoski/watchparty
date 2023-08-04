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
  return TMDBApi.get(url).then((res) => res.data.results).catch((err) => new Error(err.message));
}
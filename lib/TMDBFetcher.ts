'use server'

import { Movie, TVShow } from "@/types";
import axios from "axios";

interface APIDataResult {
  media_type?: 'tv' | 'movie' | 'person'
}

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
  if (!url) return;
  // get media type (movie / TV) based on url "/movie/popular", "/tv/on_the_air"
  // Set media type on data being returned.
  const media_type: string = url.split('/')[1];
  return TMDBApi.get(url).then((res) => {
    if (url.includes('search')) {
      res.data.results = res.data.results.map((result: APIDataResult) => {
        const APIMediaType = result?.media_type;
        if (!APIMediaType || APIMediaType === 'person') return undefined;
        return result;
      }).filter((result: APIDataResult) => result);
      // return res.data and NOT res.data.results in order to retain the page information sent back by TMDB API.
      return res.data;
    }
    if (Array.isArray(res.data?.results)) {
      return res.data.results.map((result: APIDataResult) => {
        if (!result?.media_type) return { ...result, media_type }
        return result;
      });
    } else {
      return { ...res.data, media_type }
    }
  });
}

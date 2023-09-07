'use server'

import axios from "axios";

type ParamsObj = {
  q?: string;
  zip?: string;
  lat?: number;
  lon?: number;
}

const geocodingAPI = axios.create({
  baseURL: 'http://api.openweathermap.org/geo/1.0',
  headers: {
    Accept: 'application/json',
  },
  params: {
    limit: 1,
    appid: process.env.OWM_API_KEY,
  },
});

export default async function fetcher<T>(url: "/zip" | "/direct" | "/reverse", params: ParamsObj): Promise<T> {
  return await geocodingAPI.get(url, { params }).then(res => {
    if (Array.isArray(res.data)) {
      return res.data[0]
    }
    return res.data
  });
}
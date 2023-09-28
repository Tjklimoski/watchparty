import axios from "axios";

interface APIFetcherOptions {
  url: string,
  params: {
    radius: number,
    coordinates: [number, number],
    query?: string,
    page?: number,
  }
}

export const API = axios.create({
  baseURL: 'http://localhost:3000/api',
})

export default async function fetcher(options: string | APIFetcherOptions) {
  if (!options) return null;
  if (typeof options === "string") {
    const url = options
    return API.get(url).then(res => res.data).catch(err => { throw new Error(err?.response?.data?.message ?? 'Server error') });
  } else {
    const url = options.url;
    const params = options.params;
    return API.get(url, { params }).then(res => res.data).catch(err => { throw new Error(err?.response?.data?.message ?? 'Server error') });
  }
}
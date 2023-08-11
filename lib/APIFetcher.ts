import axios from "axios";

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
})

export default async function fetcher(url: string) {
  return API.get(url).then(res => res.data).catch(err => err?.response?.data?.message ?? 'Server error');
}
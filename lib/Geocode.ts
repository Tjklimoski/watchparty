'use server'

import { GeocodeDirectResponse, GeocodeZipResponse } from "@/types";
import fetcher from "./GeocodingFetcher";
import { stateAbrv } from "./stateAbrv";

// ALL coordinate arrays returned as [lon, lat] to match the mongodb GeoJSON format

interface getCoordArgs {
  location?: string;
  zip?: string;
}

export async function getCoord({ location, zip }: getCoordArgs): Promise<[number, number]> {
  try {

    // if number, then a ZIP was passed. otherwise a "city, state" was passed
    if (zip) {
      if (zip.length !== 5) throw new Error("Invalid Zip")
      const res = await fetcher<GeocodeZipResponse>("/zip", { zip });
      if (!res) throw new Error("Invalid Zip")
      return [res.lon, res.lat]
    }

    if (location) {
      if (!location.includes(',')) throw new Error('Location does not include a state')
      const state = location.split(",")[1].trim()
      if (!stateAbrv.some(abrv => abrv === state)) throw new Error('Non US state')
      const q = `${location},US`;
      const res = await fetcher<GeocodeDirectResponse>("/direct", { q })
      if (!res) throw new Error("Invalid Location")
      return [res.lon, res.lat]
    }

    throw new Error('No data sent')
  } catch (err: Error | any) {
    console.error(err?.message ?? err)
    throw new Error(err?.message ?? 'Invalid request')
  }
}
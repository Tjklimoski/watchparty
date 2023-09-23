import { GeocodeDirectResponse, GeocodeReverseResponse, GeocodeZipResponse } from "@/types";
import fetcher from "./GeocodingFetcher";
import { stateAbrv } from "./stateAbrv";
import auth from "./authenticate";

// ALL coordinate arrays returned as [lon, lat] to match the mongodb GeoJSON format

interface getCoordArgs {
  location?: string;
  zip?: string;
}

function getBrowserCoord(): Promise<[number, number]> {
  return new Promise((res, rej) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => res([pos.coords.longitude, pos.coords.latitude]),
        rej
      );
    } else {
      rej('No location data for user');
    }
  })
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

export async function getUserCoord(): Promise<[number, number]> {
  try {
    let coordinates: [number, number] | undefined

    const user = await auth();
    if (!user) throw new Error('No user');

    const location = user.location

    if (!location) {
      coordinates = await getBrowserCoord();
    } else {
      coordinates = await getCoord({ location });
    }

    if (!coordinates) throw new Error('No coordinates found for user')
    return coordinates;
  } catch (err: Error | any) {
    console.error(err?.message ?? err);
    throw new Error(err?.message ?? 'Invalid request')
  }
}

export async function getUserDistanceFrom(target: [number, number], options: { controller: AbortController }): Promise<number> {
  try {
    const { controller } = options;
    const [userLon, userLat] = await getUserCoord();
    const [targetLon, targetLat] = target;

    // Using Haversine formula to calc shortest distance between two points on the surface of a perfect sphere

    const R = 6371; // Earth radius in km
    const dLat = degreeToRadian(targetLat - userLat);
    const dLon = degreeToRadian(targetLon - userLon);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(degreeToRadian(userLat)) * Math.cos(degreeToRadian(targetLat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distanceInKm = R * c;

    // check abort controller signal to prevent out of date info being rendered on page
    if (controller.signal.aborted) {
      throw new Error(`Aborted for ${target}`)
    } else {
      return kmToMiles(distanceInKm);
    }
  } catch (err: Error | any) {
    console.error(err?.message ?? err);
    throw new Error(err?.message ?? "Invalid request")
  }
}

function degreeToRadian(deg: number): number {
  return deg * (Math.PI / 180)
}

function kmToMiles(km: number): number {
  return Math.round(km * 0.621371)
}

export function metersToMiles(meters: number): number {
  // divide the number of meters by how many meters are in a mile
  return Math.round(meters / 1609.344)
}

export async function getCityFromCoord(coord: [number, number]): Promise<string> {
  const [lon, lat] = coord;
  try {
    const res = await fetcher<GeocodeReverseResponse>('/reverse', { lat, lon });
    if (!res) throw new Error("Invalid coordinates");
    return `${res.name}${res?.state ? ', ' + res.state : ""}`
  } catch (err: Error | any) {
    console.error(err?.message ?? err);
    throw new Error(err?.message ?? "Invalid request")
  }
}
import {
  GeocodeDirectResponse,
  GeocodeReverseResponse,
  GeocodeZipResponse,
  User,
} from "@/types";
import fetcher from "./GeocodingFetcher";
import { getStateAbrv, stateAbrv } from "./stateAbrv";
import auth from "./authenticate";
import { API } from "./APIFetcher";

// ALL coordinate arrays returned as [lon, lat] to match the mongodb GeoJSON format

interface getCoordArgs {
  city?: string;
  zip?: string;
}

// key as target coordinate (as string) and value as number of miles
const DISTANCE_CACHE: Map<string, number> = new Map();

function getBrowserCoord(): Promise<[number, number]> {
  return new Promise((res, rej) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => res([pos.coords.longitude, pos.coords.latitude]),
        rej
      );
    } else {
      rej("No location data for user");
    }
  });
}

export async function getCoord({
  city,
  zip,
}: getCoordArgs): Promise<[number, number]> {
  try {
    // if number, then a ZIP was passed. otherwise a "city, state" was passed
    if (zip) {
      if (zip.length !== 5) throw new Error("Invalid Zip");
      const res = await fetcher<GeocodeZipResponse>("/zip", { zip });
      if (!res) throw new Error("Invalid Zip");
      return [res.lon, res.lat];
    }

    if (city) {
      if (!city.includes(","))
        throw new Error("Location does not include a state");
      const state = city.split(",")[1].trim().toUpperCase();
      if (!stateAbrv.some(abrv => abrv === state))
        throw new Error("Non US state");
      const q = `${city},US`;
      const res = await fetcher<GeocodeDirectResponse>("/direct", { q });
      if (!res) throw new Error("Invalid Location");
      return [res.lon, res.lat];
    }

    throw new Error("No data sent");
  } catch (err: Error | any) {
    console.error(err?.message ?? err);
    throw new Error(err?.message ?? "Invalid request");
  }
}

export async function getUserCoord(): Promise<[number, number]> {
  try {
    let coordinates: [number, number] | undefined;

    const user = await auth();
    if (!user) throw new Error("No user");

    // If user has coordinates saved on their user document, return those coords
    const userCoords = user?.location?.coordinates;
    if (userCoords) {
      return userCoords;
    }

    const city = user?.location?.city;

    if (!city) {
      coordinates = await getBrowserCoord();
    } else {
      coordinates = await getCoord({ city });
    }

    if (!coordinates) throw new Error("No coordinates found for user");

    // Save the returned user coordinates to the user document in the db
    await setUserCoord(coordinates);

    return coordinates;
  } catch (err: Error | any) {
    console.error(err?.message ?? err);
    throw new Error(err?.message ?? "Invalid request");
  }
}

async function setUserCoord(coordinates: [number, number]): Promise<User> {
  try {
    const city = await getCityFromCoord(coordinates);
    const locationData = { city, coordinates };
    const updatedUser = await API.post<User>("/user/location", locationData)
      .then(res => res.data)
      .catch(err => {
        throw new Error(err?.response?.data ?? err.message ?? "Server error");
      });
    if (!updatedUser) throw new Error("Failed to set user's location");
    return updatedUser;
  } catch (err: Error | any) {
    console.error(err?.message ?? err);
    throw new Error(err?.message ?? "Invalid request");
  }
}

export async function getUserDistanceFrom(
  target: [number, number],
  options: { controller: AbortController }
): Promise<number> {
  try {
    const key = target.toString();
    if (DISTANCE_CACHE.has(key)) {
      return DISTANCE_CACHE.get(key) as number;
    }

    const { controller } = options;
    const [userLon, userLat] = await getUserCoord();
    const [targetLon, targetLat] = target;

    // Using Haversine formula to calc shortest distance between two points on the surface of a perfect sphere

    const R = 6371; // Earth radius in km
    const dLat = degreeToRadian(targetLat - userLat);
    const dLon = degreeToRadian(targetLon - userLon);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreeToRadian(userLat)) *
        Math.cos(degreeToRadian(targetLat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceInKm = R * c;

    // check abort controller signal to prevent out of date info being rendered on page
    if (controller.signal.aborted) {
      throw new Error(`Aborted for ${target}`);
    } else {
      const distance = kmToMiles(distanceInKm);
      DISTANCE_CACHE.set(key, distance);
      return distance;
    }
  } catch (err: Error | any) {
    console.error(err?.message ?? err);
    throw new Error(err?.message ?? "Invalid request");
  }
}

function degreeToRadian(deg: number): number {
  return deg * (Math.PI / 180);
}

function kmToMiles(km: number): number {
  return Math.round(km * 0.621371);
}

export function milesToMeters(miles: number): number {
  return miles * 1609.344;
}

export function metersToMiles(meters: number): number {
  // divide the number of meters by how many meters are in a mile
  return Math.round(meters / 1609.344);
}

export async function getCityFromCoord(
  coord: [number, number]
): Promise<string> {
  const [lon, lat] = coord;
  try {
    const res = await fetcher<GeocodeReverseResponse>("/reverse", { lat, lon });
    if (!res || !res.state) throw new Error("Invalid coordinates");
    const stateAbrv = await getStateAbrv(res.state);
    return `${res.name}, ${stateAbrv}`;
  } catch (err: Error | any) {
    console.error(err?.message ?? err);
    throw new Error(err?.message ?? "Invalid request");
  }
}

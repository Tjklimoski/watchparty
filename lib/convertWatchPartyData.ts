import { WatchParty } from "@/types";
import { JsonObject } from "@prisma/client/runtime/library";
import { metersToMiles } from "./Geocode";



export default function convertToWatchParty(result: JsonObject): WatchParty[] {

  function formatKeyAndValue(object: Object, parentKey?: string, parentObject?: Object) {
    for (let [key, value] of Object.entries(object)) {

      // If key starts with "_" remove the "_"
      if (key[0] === "_") {
        const newKey = key.slice(1);
        Object.defineProperty(object, newKey, Object.getOwnPropertyDescriptor(object, key) ?? {});
        delete object[key as keyof typeof object];
        // Set key to newKey - for when passed to next function call
        key = newKey;
      }

      // If object has a key starting with "$", set the value of it'
      if (key[0] === "$" && parentObject) {
        parentObject[parentKey as keyof typeof parentObject] = value;
      }

      // If object has "calculated" field, convert the value into miles
      if (key === "calculated") {
        object[key as keyof typeof object] = metersToMiles(value) as any;
      }

      if (typeof value === "object" && value !== null) {
        formatKeyAndValue(value, key, object)
      }
    }
    return object
  }

  return formatKeyAndValue(result) as WatchParty[]
}
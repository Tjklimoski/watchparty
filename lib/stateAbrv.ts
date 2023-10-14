const stateInfo: Record<string, string> = {
  alabama: "AL",
  alaska: "AK",
  arizona: "AZ",
  arkansas: "AR",
  california: "CA",
  colorado: "CO",
  connecticut: "CT",
  delaware: "DE",
  florida: "FL",
  georgia: "GA",
  hawaii: "HI",
  idaho: "ID",
  illinois: "IL",
  indiana: "IN",
  iowa: "IA",
  kansas: "KS",
  kentucky: "KY",
  louisiana: "LA",
  maine: "ME",
  maryland: "MD",
  massachusetts: "MA",
  michigan: "MI",
  minnesota: "MN",
  mississippi: "MS",
  missouri: "MO",
  montana: "MT",
  nebraska: "NE",
  nevada: "NV",
  new_hampshire: "NH",
  new_jersey: "NJ",
  new_mexico: "NM",
  new_york: "NY",
  north_carolina: "NC",
  north_dakota: "ND",
  ohio: "OH",
  oklahoma: "OK",
  oregon: "OR",
  pennsylvania: "PA",
  rhode_island: "RI",
  south_carolina: "SC",
  south_dakota: "SD",
  tennessee: "TN",
  texas: "TX",
  utah: "UT",
  vermont: "VT",
  virginia: "VA",
  washington: "WA",
  west_virginia: "WV",
  wisconsin: "WI",
  wyoming: "WY",
  district_of_columbia: "DC",
};

// all offical 50 US states + washington DC
export const stateAbrv = Object.values(stateInfo);

export function getStateAbrv(stateLongForm: string): Promise<string> {
  return new Promise((res, rej) => {
    const abrv =
      stateInfo[stateLongForm.trim().replace(/\s/g, "_").toLowerCase()];
    if (!abrv) rej("Invalid state passed");
    res(abrv);
  });
}

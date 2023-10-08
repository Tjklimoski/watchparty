import { NumberLiteralType, StringLiteral } from "typescript";

type GeoJSON = {
  type: "Point";
  coordinates: [number, number];
};

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string | null;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  media_type: "movie";
}

export interface MovieDetails extends Omit<Movie, "genre_ids"> {
  belongs_to_collection: string | null;
  budget: number | null;
  genres: { id: number; name: string }[];
  homepage: string;
  imdb_id: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  revenue: number;
  runtime: number | null;
  spoken_language: { english_name: string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
}

export interface Video {
  iso_639_1: string;
  is_3066_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface CastCredit {
  id: number;
  name: string;
  profile_path: string;
  character: string;
}

export interface TVShow {
  backdrop_path: string | null;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  media_type: "tv";
}

export interface TVShowDetails extends Omit<TVShow, "genre_ids"> {
  adult: boolean;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string | null;
  }[];
  episode_run_time: number[];
  genres: { id: number; name: string }[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: Episode;
  next_episode_to_air: Episode | null;
  networks: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: 5;
  production_companies: { iso_3166_1: string; name: string }[];
  seasons: Season[];
  spoken_languages: { english_name: string; ios_639_1: string; name: string }[];
  status: string;
  tagline: string;
  type: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

// returned from api route /tv/{id}/season/{season_number}:
export interface SeasonDetails extends Season {
  episodes: Episode[];
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: string | null;
}

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  location: string;
  radius: number;
  myWatchParties?: WatchParty[];
  goingToWatchPartiesIds: string[];
  goingToWatchParties?: WatchParty[];
  interestedInWatchPartiesIds: string[];
  interestedInWatchParties?: WatchParty[];
  myList: MyListItem[];
  createdAt: Date;
  updatedAt: Date;
}

export type LimitedUser = Pick<User, "id" | "name" | "image"> | null;

export interface MyListItem {
  id: string;
  media_type: string;
}

export type SubmitWatchPartyData = Omit<
  WatchParty,
  "id" | "user" | "partygoers" | "interestedUsers" | "createdAt" | "UpdatedAt"
>;

export interface WatchPartyInputs {
  title: string;
  description: string;
  season?: number;
  episode?: number;
  date: string;
  time: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

export interface WatchParty {
  id: string;
  userId: string;
  user: User;
  partygoerIds: string[];
  partygoers?: User[];
  interestedUsersIds: string[];
  interestedUsers?: User[];
  mediaId: string;
  mediaType: "movie" | "tv";
  mediaTitle: string;
  title: string;
  description: string;
  season?: number;
  episode?: number;
  date: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  geo: GeoJSON;
  createdAt: Date;
  updatedAt: Date;
  dist?: { calculated: number };
}

export interface RegisterData {
  email: string;
  password: string;
}

export interface GeocodeDirectResponse {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface GeocodeZipResponse {
  zip: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
}

export interface GeocodeReverseResponse {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

import { NumberLiteralType, StringLiteral } from "typescript";

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  media_type: 'movie';
}

export interface MovieDetails extends Omit<Movie, 'genre_ids'> {
  belongs_to_collection: string | null;
  budget: number;
  genres: { id: number, name: string }[];
  homepage: string;
  imdb_id: string;
  production_companies: { id: number, logo_path: string, name: string, origin_country: string }[];
  production_countries: { iso_3166_1: string, name: string }[];
  revenue: number;
  runtime: number | null;
  spoken_language: { english_name: string, iso_639_1: string, name: string }[];
  status: string;
  tagline: string;
}

export interface TVShow {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  media_type: 'tv';
}

export interface TVShowDetails extends Omit<TVShow, 'genre_ids'> {
  adult: boolean;
  created_by: { id: number, credit_id: string, name: string, gender: number, profile_path: string | null }[];
  episode_run_time: number[];
  genres: { id: number, name: string }[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: Episode;
  next_episode_to_air: Episode | null;
  networks: { id: number, logo_path: string, name: string, origin_country: string }[];
  number_of_episodes: number;
  number_of_seasons: 5;
  production_companies: { iso_3166_1: string, name: string }[]
  seasons: Season[];
  spoken_languages: { english_name: string, ios_639_1: string, name: string }[];
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
  notificationIds: string[];
  notifications?: Notification[];
  myList: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type LimitedUser = Pick<User, "id" | "name" | "image"> | null

export interface WatchParty {
  id: string;
  userId: string;
  user: User;
  partygoerIds: string[];
  partygoers?: User[];
  interestedUsersIds: string[];
  interestedUsers?: User[];
  date: string;
  movieId: string;
  location: string;
  address: string;
  title: string;
  description: string;
  notifications?: Notification[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  watchPartyId: string;
  watchParty?: WatchParty;
  message: string;
  recipientIds: string[];
  recipients?: User[];
  createdAt: Date;
}

export interface MultiFetcherData {
  status: string;
  heading: string;
  reason?: Error;
  value?: Movie[] | TVShow[];
}

export interface SWRResponse {
  data: MultiFetcherData[] | undefined;
  isLoading: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
}
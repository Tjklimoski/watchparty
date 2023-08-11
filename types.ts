import { StringLiteral } from "typescript";

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

export interface User {
  id: string;
  name?: string;
  email?: string;
  emailVerified?: string;
  image?: string;
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
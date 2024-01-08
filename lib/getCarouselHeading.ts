import { endOfDay, endOfWeek, startOfDay } from "@/lib/DateData";

export default function getCarouselHeading(url: string) {
  switch (url) {
    case "/movie/popular":
      return "Popular Movies";
    case "/movie/upcoming":
      return "Coming Soon";
    case "/movie/now_playing":
      return "Now Playing";
    case "/discover/tv":
      return "Popular TV Shows";
    case `/discover/tv?air_date.lte=${endOfWeek}&air_date.gte=${startOfDay}`:
      return "TV Shows Airing this Week";
    case `/discover/tv?air_date.lte=${endOfDay}&air_date.gte=${startOfDay}`:
      return "TV Shows Airing Today";
    case "/watchparties":
      return "Near You";
    case "/watchparties/popular":
      return "Popular WatchParties";
    case "/watchparties/today":
      return "Today's WatchParties";
    case "/watchparties/new":
      return "New WatchParties";
    case "/watchparties/all":
      return "All WatchParties";
    default:
      return "Movies and TV Shows";
  }
}

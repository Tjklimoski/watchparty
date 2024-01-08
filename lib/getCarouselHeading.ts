export default function getCarouselHeading(url: string) {
  const today = new Date();
  const startOfDay = new Date(today.toDateString());
  // 24 hours in milliseconds = 1000 * 60 * 60 * 24
  const endOfDay = new Date(startOfDay.getTime() + 1000 * 60 * 60 * 24);
  const endOfWeek = new Date(startOfDay.getTime() + 1000 * 60 * 60 * 24 * 7);

  switch (url) {
    case "/movie/popular":
      return "Popular Movies";
    case "/movie/upcoming":
      return "Coming Soon";
    case "/movie/now_playing":
      return "Now Playing";
    case "/discover/tv":
      return "Popular TV Shows";
    case `/discover/tv?air_date.lte=${endOfWeek.toISOString()}&air_date.gte=${startOfDay.toISOString()}`:
      return "TV Shows Airing this Week";
    case `/discover/tv?air_date.lte=${endOfDay.toISOString()}&air_date.gte=${startOfDay.toISOString()}`:
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

export default function getCarouselHeading(url: string) {
  switch (url) {
    case "/movie/popular":
      return "Popular Movies";
    case "/movie/upcoming":
      return "Coming Soon";
    case "/movie/now_playing":
      return "Now Playing";
    case "/tv/popular":
      return "Popular TV Shows";
    case "/tv/on_the_air":
      return "TV Shows Airing this Week";
    case "/tv/airing_today":
      return "TV Shows Airing Today";
    case "/watchparties":
      return "WatchParties Near You";
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
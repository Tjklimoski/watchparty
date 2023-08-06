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
    default:
      return "Movies and TV Shows";
  }
}
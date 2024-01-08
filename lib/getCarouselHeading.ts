import DateData from "./DateData";

export default function getCarouselHeading(url: string) {
  // const today = new Date();
  // const startOfDay = new Date(today.toDateString());
  // // 24 hours in milliseconds = 1000 * 60 * 60 * 24
  // const endOfDay = new Date(startOfDay.getTime() + 1000 * 60 * 60 * 24);
  // const endOfWeek = new Date(startOfDay.getTime() + 1000 * 60 * 60 * 24 * 7);

  console.log("Carousel endpoint: ", url);
  console.log(
    "tv shows airing this week: ",
    `/discover/tv?air_date.lte=${DateData.endOfWeek}&air_date.gte=${DateData.startOfDay}`
  );
  console.log(
    "TV Shows Airing Today: ",
    `/discover/tv?air_date.lte=${DateData.endOfDay}&air_date.gte=${DateData.startOfDay}`
  );

  switch (url) {
    case "/movie/popular":
      return "Popular Movies";
    case "/movie/upcoming":
      return "Coming Soon";
    case "/movie/now_playing":
      return "Now Playing";
    case "/discover/tv":
      return "Popular TV Shows";
    case `/discover/tv?air_date.lte=${DateData.endOfWeek}&air_date.gte=${DateData.startOfDay}`:
      return "TV Shows Airing this Week";
    case `/discover/tv?air_date.lte=${DateData.endOfDay}&air_date.gte=${DateData.startOfDay}`:
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

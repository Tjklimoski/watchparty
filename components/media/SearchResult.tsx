import { Movie, TVShow } from "@/types";
import Image from "next/image";
import WatchPartyBtn from "./WatchPartyBtn";
import MyListBtn from "./MyListBtn";

interface SearchResultProps {
  media: Movie | TVShow;
}

export default function SearchResult({ media }: SearchResultProps) {
  const baseImgPath = "https://image.tmdb.org/t/p/";
  const imgSize = "w780";
  const title = media?.media_type === "movie" ? media?.title : media?.name;
  const year =
    media?.media_type === "movie" ? media.release_date : media.first_air_date;

  return (
    <div className="h-[20svh] bg-base-100/75 backdrop-blur-md rounded-md p-2 flex gap-4">
      <div className="relative aspect-poster h-full">
        <Image
          className="object-cover"
          src={`${baseImgPath}${imgSize}${media.poster_path}`}
          alt="Poster"
          fill
        />
      </div>
      <div className="flex gap-4 grow">
        <div className="grow">
          <h3 className="text-2xl font-bold">
            {media?.media_type === "movie" ? media.title : media.name}
          </h3>
          <span
            className={`badge ${
              media.media_type === "movie" ? "badge-primary" : "badge-secondary"
            }`}
          >
            {media.media_type}
          </span>
          <div>
            {media.media_type === "movie"
              ? media.release_date
              : media.first_air_date}
          </div>
        </div>
        <div className="flex gap-2">
          <WatchPartyBtn mediaId={media.id.toString()} />
          <MyListBtn
            mediaId={media.id.toString()}
            media_type={media.media_type}
          />
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="h-[20svh] bg-base-100/75 backdrop-blur-md rounded-md p-2 flex gap-4">
  //     <div className="relative aspect-poster h-full">
  //       <Image
  //         className="object-cover"
  //         src={`${baseImgPath}${imgSize}${media.poster_path}`}
  //         alt="Poster"
  //         fill
  //       />
  //     </div>
  //     <div className="flex gap-4 grow">
  //       <div className="grow">
  //         <h3 className="text-2xl font-bold">
  //           {media?.media_type === "movie" ? media.title : media.name}
  //         </h3>
  //         <span
  //           className={`badge ${
  //             media.media_type === "movie" ? "badge-primary" : "badge-secondary"
  //           }`}
  //         >
  //           {media.media_type}
  //         </span>
  //         <div>
  //           {media.media_type === "movie"
  //             ? media.release_date
  //             : media.first_air_date}
  //         </div>
  //       </div>
  //       <div className="flex gap-2">
  //         <WatchPartyBtn mediaId={media.id.toString()} />
  //         <MyListBtn
  //           mediaId={media.id.toString()}
  //           media_type={media.media_type}
  //         />
  //       </div>
  //     </div>
  //   </div>
  // );
}

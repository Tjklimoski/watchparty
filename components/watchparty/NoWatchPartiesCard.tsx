import Image from "next/image";

export default function NoWatchPartiesCard() {
  return (
    <div className="relative w-48 @lg:w-52 @3xl:w-64 @5xl:w-72 aspect-video rounded-sm drop-shadow-lg overflow-hidden">
      <Image
        className="object-cover brightness-90 rounded-sm"
        src="/img/placeholder-md.jpg"
        alt="No Content"
        fill
        sizes="500px"
      />

      <div className="absolute left-0 bottom-0 right-0 h-1/2 bg-gradient-to-t from-black via-black via-45% to-transparent p-1 @lg:p-2 flex items-end select-none">
        <h3 className="font-semibold text-md @lg:text-lg @3xl:text-xl break-balance webkit-truncate">
          No WatchParties
        </h3>
      </div>
    </div>
  );
}

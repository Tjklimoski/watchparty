import Image from "next/image";

interface EmptySearchProps {
  message?: string;
}

export default function EmptySearch({ message = "Empty" }: EmptySearchProps) {
  return (
    <div className="relative aspect-video rounded-sm drop-shadow-lg overflow-hidden @container">
      <Image
        className="object-cover brightness-90 rounded-sm"
        src="/img/placeholder-md.jpg"
        alt="No Content"
        fill
        sizes="500px"
      />

      <div className="absolute left-0 bottom-0 right-0 h-1/2 bg-gradient-to-t from-black via-black via-45% to-transparent p-1 @lg:p-2 flex items-end select-none">
        <h3 className="font-semibold text-lg @xs:text-xl break-balance webkit-truncate">
          {message}
        </h3>
      </div>
    </div>
  );
}

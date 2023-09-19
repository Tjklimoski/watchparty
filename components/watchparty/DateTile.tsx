import Skeleton from "../util/Skeleton";
import { formatDate } from "@/lib/format";

interface DateTileProps {
  date: Date | undefined;
  color: "primary" | "secondary";
}

export default function DateTile({ date, color }: DateTileProps) {
  return (
    <div>
      <div className={`font-semibold py-1 px-2 rounded-md mb-2 bg-${color}/40`}>
        Date
      </div>
      {!date ? (
        <Skeleton className="h-6 sm:h-8 max-w-[12ch]" />
      ) : (
        <p className="mx-2">{formatDate(date)}</p>
      )}
    </div>
  );
}

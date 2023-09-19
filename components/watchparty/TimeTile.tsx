import React from "react";
import Skeleton from "../util/Skeleton";
import { formatTime } from "@/lib/format";

interface TimeTileProps {
  date: Date | undefined;
  color: "primary" | "secondary";
}

export default function TimeTile({ date, color }: TimeTileProps) {
  return (
    <div>
      <div className={`font-semibold py-1 px-2 rounded-md mb-2 bg-${color}/40`}>
        Time
      </div>
      {!date ? (
        <Skeleton className="h-6 sm:h-8 max-w-[7ch]" />
      ) : (
        <p className="mx-2">{formatTime(date)}</p>
      )}
    </div>
  );
}

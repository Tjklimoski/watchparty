import React from "react";
import Skeleton from "../util/Skeleton";

interface DescriptionProps {
  description: string | undefined;
}

export default function Description({ description }: DescriptionProps) {
  return (
    <div className="text-md xs:text-lg sm:text-xl leading-relaxed whitespace-pre-wrap bg-neutral py-2 px-4 rounded-lg break-words">
      {!description ? (
        <>
          <Skeleton className="sm:h-6 sm:mb-4" />
          <Skeleton className="sm:h-6 sm:mb-4" />
          <Skeleton className="sm:h-6 sm:mb-4" />
          <Skeleton className="sm:h-6 max-w-[33%]" />
        </>
      ) : (
        <p>{description}</p>
      )}
    </div>
  );
}

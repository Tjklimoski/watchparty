import { MovieDetails, TVShowDetails } from "@/types";
import React from "react";
import Skeleton from "./Skeleton";

interface MediaOverviewProps {
  media: MovieDetails | TVShowDetails | undefined;
}

export default function MediaOverview({ media }: MediaOverviewProps) {
  return !media ? (
    <>
      <Skeleton />
      <Skeleton />
      <Skeleton className="w-2/5 mb-4 sm:mb-8" />
    </>
  ) : (
    <p className="mb-4 md:mb-8 text-md sm:text-lg leading-relaxed">
      {media.overview}
    </p>
  );
}

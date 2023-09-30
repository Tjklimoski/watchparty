import { useSearchParams } from "next/navigation";
import React from "react";
import Skeleton from "./Skeleton";

interface PageCountProps {
  totalPages: number | undefined;
}

export default function PageCount({ totalPages }: PageCountProps) {
  const params = useSearchParams();
  const page = params.get("page") ?? "1";

  return !totalPages ? (
    <Skeleton className="w-full h-7 max-w-[12ch]" />
  ) : (
    <span className="ml-2">
      page <span className="font-semibold">{page}</span> of{" "}
      <span className="font-semibold">{totalPages}</span>
    </span>
  );
}

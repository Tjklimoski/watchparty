import { useSearchParams } from "next/navigation";
import React from "react";

interface PageCountProps {
  totalPages: number | undefined;
}

export default function PageCount({ totalPages }: PageCountProps) {
  const params = useSearchParams();
  const page = params.get("page") ?? "NA";

  return (
    <span className="ml-2">
      page <span className="font-semibold">{page}</span> of{" "}
      <span className="font-semibold">{totalPages}</span>
    </span>
  );
}

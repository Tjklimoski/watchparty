import React from "react";
import Skeleton from "../util/Skeleton";

interface EventTitleProps {
  title: string | undefined;
  color: "primary" | "secondary";
}

export default function EventTitle({ title, color }: EventTitleProps) {
  return !title ? (
    <Skeleton className="h-12 sm:h-14 mb-4" />
  ) : (
    <h3
      className={`text-2xl sm:text-4xl font-semibold px-4 py-2 ${
        color === "primary"
          ? "bg-primary shadow-primary/25"
          : "bg-secondary shadow-secondary/25"
      } text-base-100 rounded-md shadow-lg`}
    >
      {title}
    </h3>
  );
}

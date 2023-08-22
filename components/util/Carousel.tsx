import { MouseEvent, useRef } from "react";
import Skeleton from "./Skeleton";

interface CarouselProps {
  heading: string;
  children: React.ReactNode;
  tight?: boolean;
  count?: number;
}

export default function Carousel({
  heading,
  children,
  tight = false,
  count,
}: CarouselProps) {
  return (
    <>
      {!heading ? (
        <Skeleton className="h-8 w-1/6" />
      ) : (
        <h3 className="text-xl sm:text-2xl mb-2 font-bold">{heading}</h3>
      )}
      <div
        className={`grid ${
          tight ? "gap-2" : "gap-4"
        } grid-flow-col grid-cols-[repeat(${
          count ? count : "auto"
        },min-content)] overflow-x-scroll overscroll-x-contain snap-proximity snap-x snap-start pb-2 scrollbar-thin scrollbar-thumb-secondary active:scrollbar-thumb-secondary/80 scrollbar-track-neutral scrollbar-thumb-rounded-full scrollbar-track-rounded-full mb-2 sm:mb-4 @container`}
      >
        {children}
      </div>
    </>
  );
}

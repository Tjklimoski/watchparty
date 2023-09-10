import Skeleton from "./Skeleton";

interface CarouselProps {
  children: React.ReactNode;
  tight?: boolean;
}

export default function Carousel({ children, tight }: CarouselProps) {
  return (
    <div
      className={`grid ${
        tight ? "gap-2" : "gap-4"
      } grid-flow-col grid-cols-[repeat(10,min-content)] overflow-x-scroll overscroll-x-contain snap-proximity snap-x pb-2 scrollbar-thin scrollbar-thumb-secondary active:scrollbar-thumb-secondary/80 scrollbar-track-neutral scrollbar-thumb-rounded-full scrollbar-track-rounded-full mb-2 sm:mb-4 @container`}
    >
      {children}
    </div>
  );
}

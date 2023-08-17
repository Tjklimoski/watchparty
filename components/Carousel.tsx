interface CarouselProps {
  heading: string;
  children: React.ReactNode;
  tight?: boolean;
}

export default function Carousel({
  heading,
  children,
  tight = false,
}: CarouselProps) {
  return (
    <>
      <h3 className="text-xl sm:text-2xl mb-2 font-semibold">{heading}</h3>
      <div
        className={`grid ${
          tight ? "gap-2" : "gap-4"
        } grid-flow-col overflow-x-scroll overscroll-x-contain snap-proximity snap-x snap-start pb-2 scrollbar-thin scrollbar-thumb-secondary active:scrollbar-thumb-secondary/80 scrollbar-track-neutral scrollbar-thumb-rounded-full scrollbar-track-rounded-full mb-4 md:mb-8`}
      >
        {children}
      </div>
    </>
  );
}

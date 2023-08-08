interface CarouselProps {
  heading?: string;
  children: React.ReactNode;
}

export default function Carousel({ heading = "", children }: CarouselProps) {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-2">{heading}</h2>
      <div className="grid gap-4 grid-flow-col auto-cols-[42%] sm:auto-cols-[29%] md:auto-cols-[22%] lg:auto-cols-[18%] xl:auto-cols-[min(14%,_220px)] overflow-x-scroll overscroll-x-contain snap-proximity snap-x snap-start pb-2 scrollbar-thin scrollbar-thumb-secondary active:scrollbar-thumb-secondary/75 scrollbar-track-neutral scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
        {children}
      </div>
    </div>
  );
}
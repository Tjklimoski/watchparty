import React, { ReactNode } from "react";

interface SlideDownRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  condition: boolean | undefined;
  children: ReactNode;
}

export default function SlideDownReveal({
  condition,
  children,
  className,
}: SlideDownRevealProps) {
  // if condition passed is true, the children will be revealed
  return (
    <div
      className={`grid grid-rows-[0fr] transition-all duration-500 opacity-0 ${
        condition &&
        "grid-rows-[1fr] mt-0 scale-100 translate-x-0 translate-y-0 opacity-100"
      } ${className}`}
      aria-hidden={!condition}
      aria-expanded={condition}
    >
      {children}
    </div>
  );
}

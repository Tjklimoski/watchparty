import React, { ReactNode } from "react";

interface FormGroupProps {
  children: ReactNode;
}

export default function FormGroup({ children }: FormGroupProps) {
  // p-[2px] is to allow input outline to not be cut off from overflow-hidden.
  // overflow-hidden is to allow for animating the reveal from SlideDown component (that wraps this component)
  return (
    <div className="items-center gap-2 grid grid-cols-none sm:grid-cols-[12ch,1fr] grid-rows-[min-content,1fr] sm:grid-rows-1 overflow-hidden p-[2px]">
      {children}
    </div>
  );
}

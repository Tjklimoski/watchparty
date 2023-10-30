import React, { ReactNode } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
}

export default function Select({ children, className, ...props }: SelectProps) {
  return (
    <select
      className={`select text-sm sm:text-base h-10 min-h-[2.5rem] sm:h-11 sm:min-h-[2.75rem] bg-neutral focus:outline-primary focus:outline-offset-0 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

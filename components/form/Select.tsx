import React, { ReactNode } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  dark?: boolean;
}

export default function Select({
  children,
  className,
  dark,
  ...props
}: SelectProps) {
  return (
    <select
      className={`select text-sm sm:text-base h-10 min-h-[2.5rem] sm:h-11 sm:min-h-[2.75rem] focus:outline-primary focus:outline-offset-0 ${
        dark ? "bg-base-100" : "bg-neutral"
      } ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

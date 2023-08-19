import { twMerge } from "tailwind-merge";

export default function Skeleton({
  className,
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={twMerge(
        `bg-slate-600 bg-opacity-80 animate-pulse rounded-md mb-2 w-full h-4 ${className}`
      )}
      {...props}
    ></div>
  );
}

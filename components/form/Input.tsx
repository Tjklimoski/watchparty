import { capitalize, kebab } from "@/lib/stringModifications";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Input({ label, className, ...props }: InputProps) {
  return (
    <>
      <label htmlFor={kebab(label.toLowerCase())} className="sr-only">
        {capitalize(label)}:
      </label>
      <input
        className={twMerge(
          `bg-neutral text-md sm:text-xl rounded-md px-4 sm:px-6 py-2 focus:outline outline-primary outline-offset-0 outline-2 w-full min-w-[150px] [&:not(:focus):not(:placeholder-shown):invalid]:outline-error [&:not(:focus):not(:placeholder-shown):invalid]:outline disabled:opacity-80 disabled:cursor-not-allowed ${
            className ?? ""
          }`
        )}
        id={kebab(label.toLowerCase())}
        placeholder={capitalize(label)}
        {...props}
      />
    </>
  );
}

import { capitalize, kebab } from "@/lib/stringModifications";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, className, ...props },
  ref
) {
  return (
    <>
      <label htmlFor={kebab(label.toLowerCase())} className="sr-only">
        {capitalize(label)}:
      </label>
      <input
        ref={ref}
        className={twMerge(
          `bg-neutral text-md sm:text-xl rounded-md px-4 sm:px-6 py-2 focus:outline outline-primary outline-offset-0 outline-2 w-full min-w-[150px] [&:not(:focus):not(:placeholder-shown):invalid]:outline-error [&:not(:focus):not(:placeholder-shown):invalid]:outline disabled:opacity-60 disabled:cursor-not-allowed ${
            className ?? ""
          }`
        )}
        id={kebab(label.toLowerCase())}
        placeholder={capitalize(label)}
        {...props}
      />
    </>
  );
});

export default Input;

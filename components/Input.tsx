interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function capitalize(word: string) {
  return word[0].toUpperCase() + word.slice(1);
}

export default function Input({ label, ...props }: InputProps) {
  return (
    <>
      <label htmlFor={label} className="sr-only">
        {capitalize(label)}:
      </label>
      <input
        className="bg-neutral text-md sm:text-xl rounded-md px-4 sm:px-6 py-3 focus:outline outline-primary outline-offset-0 outline-2 w-full min-w-[150px]"
        id={label}
        placeholder={capitalize(label)}
        {...props}
      />
    </>
  );
}

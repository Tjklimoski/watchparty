interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function capitalize(word: string) {
  return word[0].toUpperCase() + word.slice(1);
}

function kebab(word: string) {
  return word.split(" ").join("-");
}

export default function Input({ label, ...props }: InputProps) {
  return (
    <>
      <label htmlFor={kebab(label.toLowerCase())} className="sr-only">
        {capitalize(label)}:
      </label>
      <input
        className="bg-neutral text-md sm:text-xl rounded-md px-4 sm:px-6 py-3 focus:outline outline-primary outline-offset-0 outline-2 w-full min-w-[150px]"
        id={kebab(label.toLowerCase())}
        placeholder={capitalize(label)}
        {...props}
      />
    </>
  );
}

import Input from "../form/Input";

export default function SearchBar() {
  return (
    <form className="flex flex-col min-[450px]:flex-row justify-center items-center gap-2 py-10">
      <Input
        label="Search Movies & TV"
        className="max-w-lg drop-shadow-lg outline outline-1 outline-primary rounded-full"
      />
      <button
        type="submit"
        className="btn bg-gradient-to-tr from-primary to-accent via-secondary via-50% text-base-100 drop-shadow-lg rounded-full w-full min-[450px]:w-min"
      >
        Search
      </button>
    </form>
  );
}

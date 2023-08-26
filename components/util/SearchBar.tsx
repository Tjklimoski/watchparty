import Input from "../form/Input";

export default function SearchBar() {
  return (
    <form className="flex flex-col min-[450px]:flex-row justify-center items-center gap-2 py-10">
      <Input
        label="Search Movies & TV"
        className="max-w-lg focus:shadow-xl focus:shadow-primary/30  hover:shadow-xl hover:shadow-primary/30 transition duration-150 outline outline-1 outline-primary rounded-full"
      />
      <button
        type="submit"
        className="btn border-none bg-gradient-to-tr from-primary to-accent via-secondary via-50% text-base-100 rounded-full w-full min-[450px]:w-min hover:shadow-xl focus:shadow-xl hover:shadow-primary/30 focus:shadow-primary/30 focus:outline-primary transition duration-150"
      >
        Search
      </button>
    </form>
  );
}

"use client";

import { FormEvent, useEffect, useState } from "react";
import Input from "../form/Input";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!searchParams || window.location.pathname !== "/media/search") return;
    setSearch(() => {
      const query = searchParams.get("q");
      if (query) return query;
      return "";
    });
  }, [searchParams]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const url = new URL("/media/search?", window.location.origin);
    url.searchParams.set("q", search);
    router.push(url.toString());
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col min-[450px]:flex-row justify-center items-center gap-2 py-10"
    >
      <Input
        label="Search Movies & TV"
        className="max-w-lg focus:shadow-xl focus:shadow-primary/30  hover:shadow-xl hover:shadow-primary/30 transition duration-150 outline outline-1 outline-primary rounded-full"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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

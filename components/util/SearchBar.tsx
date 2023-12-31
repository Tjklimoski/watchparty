"use client";

import { FormEvent, useEffect, useRef } from "react";
import Input from "../form/Input";
import { useRouter, useSearchParams } from "next/navigation";
import useWindowLocation from "@/hooks/useWindowLocation";

interface SearchBarProps {
  searchPath?: string;
  label?: string;
}

export default function SearchBar({
  searchPath,
  label = "Search",
}: SearchBarProps) {
  const windowLocation = useWindowLocation();
  searchPath ??= windowLocation.pathname;
  const searchBar = useRef<HTMLInputElement>(null);
  const query = useSearchParams().get("query") ?? "";
  const router = useRouter();

  // Set input value to current query, if client on searchPath
  useEffect(() => {
    if (!searchBar.current || searchPath !== windowLocation.pathname) return;
    searchBar.current.value = query;
  }, [query, searchPath, windowLocation]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!searchPath || !searchBar.current) return;
    const url = new URL(searchPath, windowLocation.origin);
    url.searchParams.set("query", searchBar.current.value);
    router.push(url.href);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col min-[450px]:flex-row justify-center items-center gap-2 py-10"
    >
      <Input
        ref={searchBar}
        label={label}
        className="max-w-lg focus:shadow-xl focus:shadow-primary/30  hover:shadow-xl hover:shadow-primary/30 [&:not(:placeholder-shown)]:shadow-xl [&:not(:placeholder-shown)]:shadow-primary/30 transition duration-150 outline outline-1 outline-primary rounded-full"
        name="search"
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

"use client";

import Container from "@/components/util/Container";
import SearchBar from "@/components/util/SearchBar";
import useSWR from "swr";
import fetcher from "@/lib/TMDBFetcher";
import { Movie, TVShow } from "@/types";
import { useState } from "react";
import SearchResult from "@/components/media/SearchResult";

interface SearchData {
  page: number;
  results: Movie[] | TVShow[];
  total_pages: number;
  total_results: number;
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const [page, setPage] = useState(1);
  const { q } = searchParams;
  const { data: search, error } = useSWR<SearchData>(
    q && `/search/multi?query=${q}&page=${page}`,
    fetcher
  );

  console.log(search);
  return (
    <main className="min-h-screen">
      <Container>
        <SearchBar />
        <div className="text-lg text-end mb-4">
          page <span className="font-semibold">{search?.page}</span> of{" "}
          <span className="font-semibold">{search?.total_pages}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-2">
          {search?.results?.map((media) => (
            <SearchResult key={media.id} media={media} />
          ))}
        </div>
        <ul className="flex flex-wrap justify-center mt-8 gap-4">
          {Array(search?.total_pages)
            .fill(null)
            .map((item, i) => {
              const pageNumber = i + 1;
              return (
                <li key={pageNumber}>
                  <button
                    onClick={() => setPage(pageNumber)}
                    className={`cursor-pointer text-xl hover:text-primary focus:text-primary outline-none ${
                      pageNumber === page
                        ? "text-accent underline-offset-4 underline"
                        : ""
                    }`}
                  >
                    {pageNumber}
                  </button>
                </li>
              );
            })}
        </ul>
      </Container>
    </main>
  );
}

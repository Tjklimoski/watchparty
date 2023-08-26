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
        <div className="grid grid-flow-row gap-4">
          {search?.results?.map((media) => (
            <SearchResult key={media.id} media={media} />
          ))}
        </div>
        <div>{/* Page count and selctor */}</div>
      </Container>
    </main>
  );
}

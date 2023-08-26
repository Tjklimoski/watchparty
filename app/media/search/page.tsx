"use client";

import Container from "@/components/util/Container";
import SearchBar from "@/components/util/SearchBar";
import useSWR from "swr";
import fetcher from "@/lib/TMDBFetcher";

interface SearchPageProps {
  searchParams: { q: string };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = searchParams;
  const { data: search, error } = useSWR(
    q && `/search/multi?query=${q}`,
    fetcher
  );

  console.log(search);
  return (
    <main className="min-h-screen">
      <Container>
        <SearchBar />
        <div>Results</div>
      </Container>
    </main>
  );
}

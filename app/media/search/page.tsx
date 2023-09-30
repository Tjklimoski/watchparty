"use client";

import Container from "@/components/util/Container";
import SearchBar from "@/components/util/SearchBar";
import useSWR from "swr";
import fetcher from "@/lib/TMDBFetcher";
import { Movie, TVShow } from "@/types";
import SearchResult from "@/components/media/SearchResult";
import Skeleton from "@/components/util/Skeleton";
import { useRouter } from "next/navigation";
import BackBtn from "@/components/util/BackBtn";
import PageNumbers from "@/components/util/PageNumbers";

interface SearchData {
  page: number;
  results: Movie[] | TVShow[];
  total_pages: number;
  total_results: number;
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { query: string; page?: string };
}) {
  const router = useRouter();
  const { query, page = "1" } = searchParams;
  const { data: search } = useSWR<SearchData>(
    `/search/multi?query=${query}&page=${page}`,
    fetcher
  );

  return (
    <main className="min-h-screen">
      <Container>
        <SearchBar label="Search Movies & TV" />

        {/* Top info bar on Search Results Page */}
        <div className="text-lg flex justify-between items-center mb-4">
          {!search ? (
            <>
              <Skeleton className="w-12 h-full aspect-square rounded-full" />
              <Skeleton className="w-full h-5 max-w-[12ch]" />
            </>
          ) : (
            <>
              <BackBtn />
              <span className="ml-2">
                page <span className="font-semibold">{search.page}</span> of{" "}
                <span className="font-semibold">{search.total_pages}</span>
              </span>
            </>
          )}
        </div>

        {/* Search Results */}
        {search && search.results.length === 0 && (
          // Place the no reults message outside of the search results grid
          <p className="text-error text-lg">
            No results for &quot;{query}&quot;
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-2">
          {!search
            ? Array(12)
                .fill(null)
                .map((item, i) => (
                  <Skeleton
                    key={i}
                    className="h-full rounded-sm aspect-video"
                  />
                ))
            : search.results.map((media) => (
                <SearchResult key={media.id} media={media} />
              ))}
        </div>

        {/* Page numbers to navigate with */}
        <PageNumbers totalPages={search?.total_pages} />
      </Container>
    </main>
  );
}

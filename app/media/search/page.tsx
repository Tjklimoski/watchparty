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
        <SearchBar />

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
        <div className="flex justify-center mt-8">
          <ul className="flex flex-wrap justify-center gap-4 max-w-lg">
            {!search
              ? Array(5)
                  .fill(null)
                  .map((item, i) => (
                    <li key={`loading${i}`}>
                      <Skeleton className="w-5 h-6 rounded-sm" />
                    </li>
                  ))
              : Array(search.total_pages)
                  .fill(null)
                  .map((item, i) => {
                    const pageNumber = i + 1;
                    return (
                      <li key={pageNumber}>
                        <button
                          onClick={() => {
                            const newSearchParams = new URLSearchParams({
                              query,
                              page: pageNumber.toString(),
                            }).toString();
                            router.push(`/media/search?${newSearchParams}`);
                          }}
                          className={`cursor-pointer text-xl hover:text-primary focus:text-primary outline-none ${
                            pageNumber.toString() === page
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
        </div>
      </Container>
    </main>
  );
}

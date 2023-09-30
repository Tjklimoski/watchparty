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
import { useEffect } from "react";
import PageCount from "@/components/util/PageCount";

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

  // If a user manually enters a value for page in the url that falls outside of the range of availbale pages for their query, or is NaN, redirect them to a valid page.
  useEffect(() => {
    const pageAsNumber = parseInt(page);
    // Check is the value is valid, if so then return.
    if (
      search &&
      !isNaN(pageAsNumber) &&
      pageAsNumber > 0 &&
      pageAsNumber <= search.total_pages
    )
      return;
    if (pageAsNumber > 0 && !search) return;
    const url = new URL(window.location.href);
    // change the value of page - if over total pages - set to last page, else set to first page
    if (search && pageAsNumber > search.total_pages) {
      url.searchParams.set("page", search.total_pages.toString());
    } else {
      url.searchParams.set("page", "1");
    }
    // replace the users invalid url with a valid one when redirecting.
    router.replace(url.href);
  }, [page, search, router]);

  return (
    <main className="min-h-screen">
      <Container>
        <SearchBar label="Search Movies & TV" />

        {/* Top info bar on Search Results Page */}
        <div className="text-lg flex justify-between items-center mb-4">
          <BackBtn />
          <PageCount totalPages={search?.total_pages} />
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

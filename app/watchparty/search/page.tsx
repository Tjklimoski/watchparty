"use client";

import Container from "@/components/util/Container";
import SearchBar from "@/components/util/SearchBar";
import { WatchParty } from "@/types";
import Skeleton from "@/components/util/Skeleton";
import { useRouter } from "next/navigation";
import BackBtn from "@/components/util/BackBtn";
import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { getUserCoord } from "@/lib/Geocode";
import APIFetcher, { API } from "@/lib/APIFetcher";
import WatchPartySearchResult from "@/components/watchparty/WatchPartySearchResult";
import useSWR from "swr";

interface APIParams {
  radius: number;
  coordinates: [number, number];
  query?: string;
  page?: string;
}

interface SearchData {
  page: number;
  results: WatchParty[];
  total_pages: number;
  total_results: number;
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { query: string; page?: string };
}) {
  // TEMP - FOR TESTING
  const endpoint = "/watchparties/all";

  const router = useRouter();
  // These are the search params on the frontend url - they will be passed to the API
  // But not all params passed to the API will be in the url (user info)
  const { query, page = "1" } = searchParams;
  const { user } = useUser();
  const [params, setParams] = useState<APIParams | undefined>();
  const {
    data: watchParties,
    isLoading,
    error,
  } = useSWR<WatchParty[]>(params && { url: endpoint, params }, APIFetcher);

  // build and set params from user data.
  useEffect(() => {
    async function buildParams() {
      try {
        if (!user) return;

        const myParams = {
          radius: user.radius,
          coordinates: await getUserCoord(),
          query,
          page,
        };

        setParams(myParams);
      } catch (err) {
        console.error(err);
      }
    }

    buildParams();
  }, [user, page, query]);

  // TEMP - this is to simulate the returned API results.
  const [search, setSearch] = useState<SearchData>({
    page: 1,
    results: [],
    total_pages: 12,
    total_results: 245,
  });

  useEffect(() => {
    if (!watchParties) return;
    setSearch((current) => ({ ...current, results: watchParties }));
  }, [watchParties]);
  // END TEMP

  return (
    <main className="min-h-screen">
      <Container>
        <SearchBar label="Search by Movies & TV" />

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
        <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-x-2 gap-y-4">
          {!search
            ? Array(12)
                .fill(null)
                .map((item, i) => (
                  <Skeleton
                    key={i}
                    className="h-full rounded-sm aspect-video"
                  />
                ))
            : search.results.map((watchParty) => (
                <WatchPartySearchResult
                  key={watchParty.id}
                  watchParty={watchParty}
                />
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

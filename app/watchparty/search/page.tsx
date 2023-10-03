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
import APIFetcher from "@/lib/APIFetcher";
import WatchPartySearchResult from "@/components/watchparty/WatchPartySearchResult";
import useSWR from "swr";
import PageCount from "@/components/util/PageCount";
import PageNumbers from "@/components/util/PageNumbers";

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

const ENDPOINT = "/watchparties/search";

export default function SearchPage({
  searchParams,
}: {
  searchParams: { query: string; page?: string };
}) {
  const router = useRouter();
  // These are the search params on the client url - they will be passed to the API
  // But not all params passed to the API will be in the client url (user info)
  const { query, page = "1" } = searchParams;
  const { user } = useUser();
  const [params, setParams] = useState<APIParams | undefined>();
  const {
    data: search,
    isLoading,
    error,
  } = useSWR<SearchData>(params && { url: ENDPOINT, params }, APIFetcher);

  // build and set params from user data.
  useEffect(() => {
    async function buildParams() {
      try {
        if (!user) return;

        const myParams = {
          radius: user.radius,
          // must get coordinates through frontend since utalizing browser geolocation api
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

  // validate value of page searchParam
  useEffect(() => {
    const pageAsNumber = parseInt(page);
    if (
      search &&
      !isNaN(pageAsNumber) &&
      pageAsNumber > 0 &&
      pageAsNumber <= search.total_pages
    )
      return;

    if (pageAsNumber > 0 && !search) return;

    const url = new URL(window.location.href);
    if (search && pageAsNumber > search.total_pages) {
      url.searchParams.set("page", search.total_pages.toString());
    } else {
      url.searchParams.set("page", "1");
    }
    router.replace(url.href);
  }, [page, search, router]);

  console.log(search);

  return (
    <main className="min-h-screen">
      <Container>
        <SearchBar label="Search by Movies & TV" />

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
            : search.results.map(watchParty => (
                <WatchPartySearchResult
                  key={watchParty.id}
                  watchParty={watchParty}
                />
              ))}
        </div>

        {/* Page numbers to navigate with */}
        <PageNumbers totalPages={search?.total_pages} />
      </Container>
    </main>
  );
}

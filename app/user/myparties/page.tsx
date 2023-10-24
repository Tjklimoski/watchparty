"use client";

import UserPageHeading from "@/components/user/UserPageHeading";
import BackBtn from "@/components/util/BackBtn";
import Container from "@/components/util/Container";
import EmptyListCard from "@/components/util/EmptyCarousel";
import FilterBtns from "@/components/util/FilterBtns";
import PageCount from "@/components/util/PageCount";
import PageNumbers from "@/components/util/PageNumbers";
import Skeleton from "@/components/util/Skeleton";
import WatchPartySearchResult from "@/components/watchparty/WatchPartySearchResult";
import APIFetcher from "@/lib/APIFetcher";
import { WatchParty } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

interface MyWatchPartyData {
  results: WatchParty[];
  total_results: number;
  total_pages: number;
  page: number;
}

const FILTER_BTNS = [
  {
    name: "All",
    value: "",
  },
  {
    name: "Today",
    value: "/today",
  },
  {
    name: "Hosting",
    value: "/hosting",
  },
  {
    name: "Upcoming",
    value: "/upcoming",
  },
  {
    name: "Following",
    value: "/following",
  },
  {
    name: "Attended",
    value: "/attended",
  },
];

export default function UserMyPartiesPage({
  searchParams,
}: {
  searchParams: { page?: string; filter?: string };
}) {
  const { page = "1", filter = "" } = searchParams;
  const router = useRouter();

  const { data, isLoading, error } = useSWR<MyWatchPartyData>(
    `/user/my-watchparties${filter}?page=${page}`,
    APIFetcher
  );

  // If a user manually enters a value for page in the url that falls outside of the range of availbale pages for their query, or is NaN, redirect them to a valid page.
  useEffect(() => {
    const pageAsNumber = parseInt(page);
    // Check is the value is valid, if so then return.
    if (
      data &&
      !isNaN(pageAsNumber) &&
      pageAsNumber > 0 &&
      pageAsNumber <= data.total_pages
    )
      return;
    if (pageAsNumber > 0 && !data) return;
    const url = new URL(window.location.href);
    // change the value of page: if over total pages then set to last page, else set to first page
    if (data && pageAsNumber > data.total_pages) {
      url.searchParams.set("page", data.total_pages.toString());
    } else {
      url.searchParams.set("page", "1");
    }
    // replace the users invalid url with a valid one when redirecting.
    router.replace(url.href);
  }, [page, data, router]);

  if (!isLoading && error) throw new Error("Invalid data request");

  return (
    <main className="min-h-screen">
      <Container>
        <UserPageHeading title="My WatchParties" />

        <section>
          <FilterBtns filterBtns={FILTER_BTNS} />

          <div className="text-lg flex justify-between items-center mb-4">
            <BackBtn />
            <PageCount totalPages={data?.total_pages} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-2">
            {!data
              ? Array(12)
                  .fill(null)
                  .map((item, i) => (
                    <div key={i} className="h-full flex flex-col">
                      <Skeleton className="w-1/2 h-6 max-w-[14ch]" />
                      <Skeleton className="h-full aspect-video rounded-sm mb-1" />
                      <Skeleton className="w-3/5 h-3 mb-1" />
                    </div>
                  ))
              : data.results.map(watchparty => (
                  <WatchPartySearchResult
                    key={watchparty.id}
                    watchParty={watchparty}
                    editable
                  />
                ))}
            {data && data.results.length === 0}
          </div>

          {/* Page numbers to navigate with */}
          <PageNumbers totalPages={data?.total_pages} />
        </section>
      </Container>
    </main>
  );
}

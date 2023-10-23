"use client";

import BackBtn from "@/components/util/BackBtn";
import Container from "@/components/util/Container";
import PageCount from "@/components/util/PageCount";
import PageNumbers from "@/components/util/PageNumbers";
import Skeleton from "@/components/util/Skeleton";
import WatchPartySearchResult from "@/components/watchparty/WatchPartySearchResult";
import APIFetcher from "@/lib/APIFetcher";
import { WatchParty } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  searchParams: { page?: string };
}) {
  // move page into a useState?
  const { page = "1" } = searchParams;
  const router = useRouter();
  const [route, setRoute] = useState("");

  const { data, isLoading, error } = useSWR<MyWatchPartyData>(
    `/user/my-watchparties${route}?page=${page}`,
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
    // change the value of page - if over total pages - set to last page, else set to first page
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
        <header className="flex justify-center xs:justify-start sm:mt-2 mb-4 sm:mb-8">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold">
            My WatchParties
          </h2>
        </header>

        <section>
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-8">
            {FILTER_BTNS.map(btn => (
              <button
                key={btn.value}
                className="btn-sm xs:btn-md btn btn-primary btn-outline border-2 rounded-full"
                value={btn.value}
                aria-current={true}
                onClick={e => {
                  setRoute(e.currentTarget.value);
                }}
              >
                {btn.name}
              </button>
            ))}
          </div>

          <div className="text-lg flex justify-between items-center mb-4">
            <BackBtn />
            <PageCount totalPages={data?.total_pages} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-2">
            {/* Place watchparties in cards here */}
            {!data
              ? Array(12)
                  .fill(null)
                  .map((item, i) => (
                    <Skeleton
                      key={i}
                      className="h-full rounded-sm aspect-video"
                    />
                  ))
              : data.results.map(watchparty => (
                  <WatchPartySearchResult
                    key={watchparty.id}
                    watchParty={watchparty}
                    editable
                  />
                ))}
          </div>

          {/* Page numbers to navigate with */}
          <PageNumbers totalPages={data?.total_pages} />
        </section>
      </Container>
    </main>
  );
}

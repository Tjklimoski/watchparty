"use client";

import MyListItemCard from "@/components/user/MyListItemCard";
import UserPageHeading from "@/components/user/UserPageHeading";
import BackBtn from "@/components/util/BackBtn";
import Container from "@/components/util/Container";
import EmptySearch from "@/components/util/EmptySearch";
import PageCount from "@/components/util/PageCount";
import PageNumbers from "@/components/util/PageNumbers";
import Skeleton from "@/components/util/Skeleton";
import APIFetcher from "@/lib/APIFetcher";
import { MyListItem } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

interface UserMyListData {
  results: MyListItem[];
  total_results: number;
  total_pages: number;
  page: number;
}

export default function UserMyListPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const { page = "1" } = searchParams;
  const router = useRouter();
  const { data, isLoading, error } = useSWR<UserMyListData>(
    `/user/my-list?page=${page}`,
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

  if (!isLoading && error) throw new Error(error);

  return (
    <main className="min-h-screen">
      <Container>
        <UserPageHeading title="My List" />

        <section>
          <div className="text-lg flex justify-between items-center mb-4">
            <BackBtn />
            <PageCount totalPages={data?.total_pages} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-2">
            {!data
              ? Array(12)
                  .fill(null)
                  .map((item, i) => (
                    <Skeleton
                      key={i}
                      className="h-full rounded-sm aspect-video"
                    />
                  ))
              : data.results.map(myListItem => (
                  <MyListItemCard
                    key={myListItem.id}
                    myListItem={myListItem}
                    page
                  />
                ))}
            {/* Display message if filtered results are empty: */}
            {data && data.results.length === 0 && (
              <EmptySearch message="No WatchParties" />
            )}
          </div>

          {/* Page numbers to navigate with */}
          <PageNumbers totalPages={data?.total_pages} />
        </section>
      </Container>
    </main>
  );
}

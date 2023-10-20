"use client";

import BackBtn from "@/components/util/BackBtn";
import Container from "@/components/util/Container";
import PageCount from "@/components/util/PageCount";
import APIFetcher from "@/lib/APIFetcher";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

export default function UserMyListPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const { page = "1" } = searchParams;
  const router = useRouter();
  const { data, isLoading, error } = useSWR(
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
        <header className="flex justify-center xs:justify-start sm:mt-2 mb-4 sm:mb-8">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold">
            My List
          </h2>
        </header>

        <section>
          <div className="text-lg flex justify-between items-center mb-4">
            <BackBtn />
            <PageCount totalPages={data?.total_pages} />
          </div>
        </section>
      </Container>
    </main>
  );
}

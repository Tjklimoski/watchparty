"use client";

import BackBtn from "@/components/util/BackBtn";
import Container from "@/components/util/Container";
import PageCount from "@/components/util/PageCount";
import APIFetcher from "@/lib/APIFetcher";
import React from "react";
import useSWR from "swr";

export default function UserMyListPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const { page = "1" } = searchParams;
  const { data, isLoading, error } = useSWR(
    `/user/my-list?page=${page}`,
    APIFetcher
  );

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

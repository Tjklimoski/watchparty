"use client";

import Container from "@/components/util/Container";
import React from "react";

export default function UserMyListPage() {
  return (
    <main className="min-h-screen">
      <Container>
        <header className="flex justify-center xs:justify-start sm:mt-2 mb-4 sm:mb-8">
          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold">
            My List
          </h2>
        </header>

        <section>{/* results */}</section>
      </Container>
    </main>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Skeleton from "./Skeleton";
import { useEffect, useState } from "react";

interface PageNumbersProps {
  totalPages: number | undefined;
}

export default function PageNumbers({ totalPages }: PageNumbersProps) {
  const router = useRouter();
  // get and check current url for searchParam.
  const params = useSearchParams();
  // if no page param is present, default value to "1"
  const page = params.get("page") ?? "1";
  // Create a url based off the current URL
  const [url, setUrl] = useState<URL | null>(null);

  // Reset the URL everytime the params change
  useEffect(() => {
    setUrl(new URL(window.location.href));
  }, [params]);

  console.log("pagenumbers url: ", url);

  return (
    <div className="flex justify-center mt-12">
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min-content,5ch))] w-full max-w-2xl mx-8 place-content-center place-items-center gap-y-2">
        {!totalPages
          ? Array(5)
              .fill(null)
              .map((item, i) => (
                <li key={`loading${i}`}>
                  <Skeleton className="w-5 h-6 rounded-sm" />
                </li>
              ))
          : Array(totalPages)
              .fill(null)
              .map((item, i) => {
                const pageNumber = i + 1;
                return (
                  <li key={pageNumber}>
                    <button
                      onClick={() => {
                        if (!url) return;
                        // Set page serach param on url and push user to new route.
                        url.searchParams.set("page", pageNumber.toString());
                        router.push(url.href);
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
  );
}

// <ul className="flex flex-wrap justify-center gap-4 max-w-lg">

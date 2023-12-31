import useWindowLocation from "@/hooks/useWindowLocation";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface FilterBtnsProps {
  filterBtns: { name: string; value: string }[];
  currentValue?: string;
}

export default function FilterBtns({ filterBtns }: FilterBtnsProps) {
  const router = useRouter();
  const params = useSearchParams();
  const currentFilter = params.get("filter") ?? "";
  const { href } = useWindowLocation();
  const [url, setUrl] = useState<URL | null>(null);

  useEffect(() => {
    if (!href) return;
    setUrl(new URL(href));
  }, [href]);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>): void {
    if (!url) return;
    url.searchParams.set("filter", e.currentTarget.value);
    // remove page from serach params so it defaults to page 1 on filter change
    url.searchParams.delete("page");
    router.push(url.href);
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4 sm:mb-8">
      {filterBtns.map(btn => (
        <button
          key={btn.value}
          className={`btn-sm xs:btn-md btn btn-primary border-2 rounded-full ${
            currentFilter === btn.value
              ? "shadow-lg shadow-primary/30"
              : "btn-outline"
          }`}
          value={btn.value}
          aria-current={currentFilter === btn.value}
          onClick={handleClick}
        >
          {btn.name}
        </button>
      ))}
    </div>
  );
}

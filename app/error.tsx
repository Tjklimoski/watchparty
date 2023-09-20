"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();

  return (
    <div className="h-screen grid place-items-center text-center">
      <div className="px-4 sm:px-6 w-full max-w-3xl">
        <h2 className="font-semibold text-4xl sm:text-8xl">Oh no!</h2>
        <div className="relative w-full max-w-[300px] sm:max-w-[500px] aspect-square mx-auto my-2 sm:my-4">
          <Image
            src={"/img/error-page-img-sm.png"}
            alt="Spilled popcorn error img"
            fill
            sizes="300px, (min-width: 640px) 500px"
          />
        </div>
        <div className="text-md sm:text-xl leading-relaxed">
          <p>Seems like something went wrong!</p>
          <p className="text-error mb-6">{error.message || "Unknown Error"}</p>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <button className="btn btn-primary" onClick={() => reset()}>
              Try Again
            </button>
            <button className="btn btn-secondary" onClick={() => router.back()}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

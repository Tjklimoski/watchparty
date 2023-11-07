"use client";

import Container from "@/components/util/Container";
import Image from "next/image";

export default function Home() {
  return (
    // Negative margin top is to offset the navbar, so content is centered on page
    <main className="-mt-16 sm:-mt-20">
      <Container>
        <div className="h-screen grid grid-cols-1 sm:grid-cols-2 place-content-center  gap-2">
          <div className="grid h-full place-items-center">
            <h1 className="text-4xl sm:text-5xl text-center -skew-y-3 z-10">
              Welcome to
              <br />
              <span className="text-6xl sm:text-8xl font-semibold">
                Watch
                <span className="bg-gradient-to-tr from-primary to-accent via-secondary bg-clip-text text-transparent">
                  Party
                </span>
                !
              </span>
            </h1>
          </div>

          <div className="relative w-min -ml-[20vw] sm:ml-0 hidden sm:block brightness-75 hover:brightness-105 transition-[filter] duration-700">
            <div className="relative aspect-square main-image transform-main-image transform-main-image-front">
              <Image
                className="object-cover object-top"
                src="/img/screenshot_2.png"
                alt="website screenshot 2"
                fill
                sizes="50vw"
              />
            </div>
            <div className="aspect-square absolute top-0 left-0 main-image transform-main-image transform-main-image-back">
              <Image
                className="object-cover object-top"
                src="/img/screenshot_1.png"
                alt="website screenshot 1"
                fill
                sizes="50vw"
              />
            </div>
          </div>
        </div>

        {/* TESTING: */}
        <div></div>
      </Container>
    </main>
  );
}

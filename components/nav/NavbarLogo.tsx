"use client";

import useUser from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";

export default function NavbarLogo() {
  const { user } = useUser();

  return (
    <Link href={user ? "/media" : "/"}>
      <div className="flex items-center gap-2 group/logo hover:cursor-pointer">
        <Image
          src="/img/watchparty-logo.svg"
          alt="WatchParty Icon"
          height={40}
          width={40}
          priority
          className="object-contain bg-gradient-to-tr from-primary to-accent p-1 rounded-full transition rotate-0 scale-100 duration-500 group-hover/logo:rotate-12 group-hover/logo:scale-110 h-6 w-6 sm:h-10 sm:w-10"
        />
        <h1 className="text-2xl sm:text-4xl">
          Watch
          <span className="bg-gradient-to-tr from-primary to-accent via-secondary bg-clip-text text-transparent">
            Party
          </span>
        </h1>
      </div>
    </Link>
  );
}

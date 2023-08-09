"use client";

import PrimaryBtn from "./PrimaryBtn";
import AccentBtn from "./AccentBtn";
import { useRouter } from "next/navigation";

export default function AuthBtns() {
  const router = useRouter();

  return (
    <>
      <PrimaryBtn
        type="button"
        onClick={() => router.push("/auth?signin=true")}
      >
        Sign In
      </PrimaryBtn>
      <AccentBtn
        type="button"
        onClick={() => router.push("/auth?signin=false")}
      >
        Sign Up
      </AccentBtn>
    </>
  );
}

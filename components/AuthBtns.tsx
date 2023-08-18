"use client";

import BtnPrimary from "./BtnPrimary";
import BtnAccent from "./BtnAccent";
import { useRouter } from "next/navigation";

export default function AuthBtns() {
  const router = useRouter();

  return (
    <>
      <BtnPrimary
        type="button"
        onClick={() => router.push("/auth?signin=true")}
      >
        Sign In
      </BtnPrimary>
      <BtnAccent
        className="btn-outline"
        type="button"
        onClick={() => router.push("/auth?signin=false")}
      >
        Sign Up
      </BtnAccent>
    </>
  );
}

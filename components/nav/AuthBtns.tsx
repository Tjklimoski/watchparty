"use client";

import { useRouter } from "next/navigation";

export default function AuthBtns() {
  const router = useRouter();

  return (
    <>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => router.push("/auth?signin=true")}
      >
        Sign In
      </button>
      <button
        className="btn btn-accent btn-outline"
        type="button"
        onClick={() => router.push("/auth?signin=false")}
      >
        Sign Up
      </button>
    </>
  );
}

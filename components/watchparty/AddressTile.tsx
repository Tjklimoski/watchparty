import React from "react";
import Skeleton from "../util/Skeleton";

interface AddressTileProps {
  address: string | undefined;
  city: string | undefined;
  state: string | undefined;
  zip: number | undefined;
  color: "primary" | "secondary";
}

export default function AddressTile({
  address,
  city,
  state,
  zip,
  color,
}: AddressTileProps) {
  return (
    <div>
      <div className={`font-semibold py-1 px-2 rounded-md mb-2 bg-${color}/40`}>
        Address
      </div>
      {!address || !city || !state || !zip ? (
        <>
          <Skeleton className="h-6 sm:h-8 max-w-[15ch]" />
          <Skeleton className="h-6 sm:h-8 max-w-[15ch]" />
          <Skeleton className="h-6 sm:h-8 max-w-[5ch]" />
        </>
      ) : (
        <p className="mx-2">
          {address}
          <br />
          {city}, {state}
          <br />
          {zip}
        </p>
      )}
    </div>
  );
}

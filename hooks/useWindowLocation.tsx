import { useEffect, useState } from "react";

interface WindowLocation {
  href: string | undefined;
  origin: string | undefined;
  pathname: string | undefined;
  port: string | undefined;
  search: string | undefined;
  toString: (() => string) | undefined;
}

export default function useWindowLocation() {
  const [location, setLocation] = useState<WindowLocation>({
    href: undefined,
    origin: undefined,
    pathname: undefined,
    port: undefined,
    search: undefined,
    toString: undefined,
  });

  // use effect will run once on mount, so window will be defined
  useEffect(() => {
    const { href, origin, pathname, port, search, toString } = window.location;
    setLocation({ href, origin, pathname, port, search, toString });
  }, []);

  return location;
}

import Link from "next/link";

export default function MainMenu() {
  return (
    // menu-horizontal contains a display: inline-flex
    <ul className="menu lg:menu-horizontal rounded-box">
      <li className="text-lg">
        <Link href={"/media"} tabIndex={0}>
          🎬 Movies & TV
        </Link>
      </li>
      <li className="text-lg">
        <Link href={"/watchparty"} tabIndex={0}>
          🎉 Watch Parties
        </Link>
      </li>
    </ul>
  );
}

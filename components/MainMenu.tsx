export default function MainMenu() {
  return (
    // menu-horizontal contains a display: inline-flex
    <ul className="menu lg:menu-horizontal rounded-box">
      <li className="text-lg">
        <a tabIndex={0}>🎬 Movies & TV</a>
      </li>
      <li className="text-lg">
        <a tabIndex={0}>🎉 Watch Parties</a>
      </li>
    </ul>
  );
}

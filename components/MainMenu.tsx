export default function MainMenu() {
  const isAuth = true;

  // If user is not logged in, do not show main menu in Navbar
  if (!isAuth) return null;

  return (
    // menu-horizontal contains a display: inline-flex
    <ul className="menu lg:menu-horizontal rounded-box w-full">
      <li className="text-lg">
        <a tabIndex={0}>🎬 Movies & TV</a>
      </li>
      <li className="text-lg">
        <a tabIndex={0}>🎉 Watch Parties</a>
      </li>
    </ul>
  );
}

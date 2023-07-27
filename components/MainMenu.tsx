export default function MainMenu() {
  const isAuth = true;

  // If user is not logged in, do not show main menu in Navbar
  if (!isAuth) return null;

  return (
    <ul className="menu lg:menu-horizontal rounded-box">
      <li className="text-lg">
        <a tabIndex={0}>🎬 Movies & TV</a>
      </li>
      <li className="text-lg">
        <a tabIndex={0}>
          🎉 Watch Parties
          <span className="badge badge-sm badge-accent">5+</span>
        </a>
      </li>
    </ul>
  );
}

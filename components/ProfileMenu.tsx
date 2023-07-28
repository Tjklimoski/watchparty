import { BiLogOut } from "react-icons/bi";
import { BsBellFill, BsFillGearFill } from "react-icons/bs";

export default function ProfileMenu() {
  return (
    <ul className="menu menu-md w-full">
      <li>
        <a>
          <BsBellFill size={18} />
          Notifications
          <span className="badge badge-sm badge-accent">5+</span>
        </a>
      </li>
      <li>
        <a>
          <BsFillGearFill size={18} />
          Settings
        </a>
      </li>
      <li className="text-secondary">
        <a>
          <BiLogOut size={18} />
          Logout
        </a>
      </li>
    </ul>
  );
}

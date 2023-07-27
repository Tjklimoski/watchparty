import { BiLogOut } from "react-icons/bi";
import { BsBellFill, BsFillGearFill } from "react-icons/bs";

interface ProfileMenuProps {
  show: boolean;
}

export default function ProfileMenu({ show = false }: ProfileMenuProps) {
  return (
    <div
      className={`bg-neutral rounded-md group-hover:cursor-default absolute right-0 top-full mt-3 z-30 transistion duration-100 scale-0 origin-top-right ${
        show && "scale-100"
      }`}
    >
      <ul className="menu menu-md">
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
    </div>
  );
}

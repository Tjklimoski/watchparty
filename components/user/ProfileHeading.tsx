import ProfileIcon from "../util/ProfileIcon";
import { getFirstName } from "@/lib/stringModifications";
import { ProfileUser } from "@/types";
import { BiSolidEditAlt } from "react-icons/bi";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";

interface ProfileHeadingProps {
  user: ProfileUser;
}

export default function ProfileHeading({ user }: ProfileHeadingProps) {
  const router = useRouter();
  const { user: currentUser } = useUser();

  return (
    <header className="flex flex-col xs:flex-row items-center gap-2 sm:mt-2 mb-4 sm:mb-8 justify-between">
      <span className="flex gap-4 items-center">
        <ProfileIcon id={user.id} className="w-8 xs:w-10 sm:w-12" />
        <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold">
          {getFirstName(user.name ?? "User")}
        </h2>
      </span>

      {currentUser?.id === user.id && (
        <button
          className="btn-sm sm:btn-md btn btn-circle btn-accent btn-outline border-2 tooltip tooltip-accent grid place-items-center"
          aria-label="Edit your info"
          data-tip="Edit"
          onClick={() => router.push("/user/settings")}
        >
          <BiSolidEditAlt className="relative text-[20px] sm:text-[30px]" />
        </button>
      )}
    </header>
  );
}

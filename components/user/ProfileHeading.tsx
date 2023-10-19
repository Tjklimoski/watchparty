import ProfileIcon from "../util/ProfileIcon";
import { getFirstName } from "@/lib/stringModifications";
import { ProfileUser } from "@/types";
import { BiSolidEditAlt } from "react-icons/bi";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import Skeleton from "../util/Skeleton";

interface ProfileHeadingProps {
  user: ProfileUser | undefined;
}

export default function ProfileHeading({ user }: ProfileHeadingProps) {
  const router = useRouter();
  const { user: currentUser } = useUser();

  return (
    <header className="flex flex-col xs:flex-row items-center gap-2 sm:mt-2 mb-4 sm:mb-8 justify-between">
      <span className="flex gap-4 items-center grow">
        {!user || !currentUser ? (
          <>
            <Skeleton className="w-8 xs:w-10 sm:w-12 h-8 xs:h-10 sm:h-12 aspect-square rounded-full mb-0" />
            <Skeleton className="w-1/2 max-w-[350px] min-w-[150px] h-8 xs:h-10 sm:h-12 mb-0" />
          </>
        ) : (
          <>
            <ProfileIcon id={user.id} className="w-8 xs:w-10 sm:w-12" />
            <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold">
              {getFirstName(user.name ?? "User")}
            </h2>
          </>
        )}
      </span>

      {/* No Loading state for edit button, as it will not appear for the majority of users */}
      {user && currentUser?.id === user.id && (
        <button
          className="btn-sm sm:btn-md btn btn-circle btn-accent btn-outline border-2 tooltip tooltip-accent grid place-items-center"
          aria-label="Edit your info"
          data-tip="Edit"
          onClick={() => router.push("/user/settings")}
        >
          <BiSolidEditAlt className="text-[20px] sm:text-[30px]" />
        </button>
      )}
    </header>
  );
}

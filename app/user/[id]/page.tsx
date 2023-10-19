// This user profile page is visible to ANY logged in user

"use client";

import Container from "@/components/util/Container";
import ProfileIcon from "@/components/util/ProfileIcon";
import useUser from "@/hooks/useUser";
import apiFetcher from "@/lib/APIFetcher";
import { getFirstName } from "@/lib/stringModifications";
import { ProfileUser } from "@/types";
import { BiSolidEditAlt } from "react-icons/bi";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import MyListCarousel from "@/components/user/MyListCarousel";
import UserWatchPartyCarousel from "@/components/user/UserWatchPartyCarousel";
import UserDetails from "@/components/user/UserDetails";

export default function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const { user: currentUser } = useUser();
  const router = useRouter();
  const {
    data: user,
    isLoading,
    error,
  } = useSWR<ProfileUser>(`/users/${id}/profile`, apiFetcher);

  if (!isLoading && error) throw new Error("Invalid user id");

  return !user ? (
    <span>Loading...</span>
  ) : (
    <main className="min-h-screen">
      <Container>
        <header className="flex flex-col xs:flex-row items-center gap-2 sm:mt-2 mb-4 sm:mb-8 justify-between">
          <span className="flex gap-4 items-center">
            <ProfileIcon id={user.id} className="w-8 xs:w-10 sm:w-12" />
            <h2 className="text-3xl xs:text-4xl sm:text-5xl font-bold">
              {getFirstName(user.name ?? "User")}
            </h2>
          </span>

          {currentUser?.id === id && (
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

        <div className="flex flex-col sm:flex-row gap-4">
          <UserDetails user={user} />
          <section className="flex-grow min-w-0">
            <MyListCarousel list={user.myList} />
            {/* watchParties the user is hosting */}
            <UserWatchPartyCarousel
              list={user.myWatchParties.filter(
                watchParty => new Date(watchParty.date) > new Date()
              )}
              title="WatchParties I'm Hosting"
            />
            {/* WatchParties the user attended */}
            <UserWatchPartyCarousel
              list={user.attendedWatchParties}
              title="WatchParties I Attended"
            />
          </section>
        </div>
      </Container>
    </main>
  );
}

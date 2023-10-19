// This user profile page is visible to ANY logged in user

"use client";

import Container from "@/components/util/Container";
import apiFetcher from "@/lib/APIFetcher";
import { ProfileUser } from "@/types";
import useSWR from "swr";
import MyListCarousel from "@/components/user/MyListCarousel";
import UserWatchPartyCarousel from "@/components/user/UserWatchPartyCarousel";
import UserDetails from "@/components/user/UserDetails";
import ProfileHeading from "@/components/user/ProfileHeading";

export default function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const {
    data: user,
    isLoading,
    error,
  } = useSWR<ProfileUser>(`/users/${id}/profile`, apiFetcher);

  if (!isLoading && error) throw new Error("Invalid user id in URL");

  return (
    <main className="min-h-screen">
      <Container>
        <ProfileHeading user={user} />

        <div className="flex flex-col sm:flex-row gap-4">
          <UserDetails user={user} />
          <section className="flex-grow min-w-0">
            <MyListCarousel list={user?.myList} />
            {/* watchParties the user is hosting */}
            <UserWatchPartyCarousel
              list={user?.myWatchParties.filter(
                watchParty => new Date(watchParty.date) > new Date()
              )}
              title="WatchParties I'm Hosting"
            />
            {/* WatchParties the user attended */}
            <UserWatchPartyCarousel
              list={user?.attendedWatchParties}
              title="WatchParties I Attended"
            />
          </section>
        </div>
      </Container>
    </main>
  );
}

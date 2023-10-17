// This user profile page is visible to ANY logged in user

"use client";

import MediaCarousel from "@/components/media/MediaCarousel";
import Container from "@/components/util/Container";
import ProfileIcon from "@/components/util/ProfileIcon";
import useUser from "@/hooks/useUser";
import apiFetcher from "@/lib/APIFetcher";
import { formatDate } from "@/lib/format";
import { getFirstName } from "@/lib/stringModifications";
import { ProfileUser } from "@/types";
import { BiSolidEditAlt } from "react-icons/bi";
import useSWR from "swr";
import { useRouter } from "next/navigation";

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
        <header className="flex items-center mt-2 mb-8 justify-between">
          <span className="flex gap-4 items-end me-2">
            <ProfileIcon id={user.id} size={56} />
            <h2 className="text-5xl font-bold">
              {getFirstName(user.name ?? "User")}
            </h2>
          </span>

          {currentUser?.id === id && (
            <button
              className="btn btn-circle btn-accent btn-outline border-2 tooltip tooltip-accent grid place-items-center"
              aria-label="Edit your info"
              data-tip="Edit"
              onClick={() => router.push("/user/settings")}
            >
              <BiSolidEditAlt size={30} />
            </button>
          )}
        </header>

        <div className="flex flex-col sm:flex-row">
          <aside className="w-full sm:min-w-[290px] md:max-w-[360px] bg-primary/20 p-4 rounded-md">
            <h3 className="font-bold uppercase text-2xl mb-4">About Me</h3>
            <ul className="[&>*>*:first-child]:font-bold [&>*:not(:last-child)]:mb-4 text-sm sm:text-md">
              <li>
                <span>City</span>
                <br />
                {user.city}
              </li>
              <li>
                <span>Joined</span>
                <br />
                {formatDate(user.createdAt)}
              </li>
              <li>
                <span>Hosted</span>
                <br />
                {user.hosted_count}
              </li>
              <li>
                <span>Attended</span>
                <br />
                {user.attended_count}
              </li>
              <li>
                <span>Achievments</span>
                <br />
                <div className="flex flex-wrap gap-1 [&>*]:webkit-truncate [&>*]:truncate-one">
                  {/* Achievment for hosting 1 watchparty */}
                  {user.hosted_count >= 1 ? (
                    <span className="badge badge-secondary">
                      Hosted 1 WatchParty
                    </span>
                  ) : null}
                  {/* Achievment for hosting 5 watchparties */}
                  {user.hosted_count >= 5 ? (
                    <span className="badge badge-primary">
                      Hosted 5 WatchParties
                    </span>
                  ) : null}
                  {/* Achievment for hosting 10 watchparties */}
                  {user.hosted_count >= 10 ? (
                    <span className="badge badge-accent">
                      Hosted 10 WatchParties
                    </span>
                  ) : null}

                  {/* Achievment for creating a watchParty */}
                  {user.myWatchParties.length >= 1 ? (
                    <span className="badge badge-accent">
                      Created a WatchParty
                    </span>
                  ) : null}

                  {/* Achievment for adding 1 movie to their list */}
                  {user.myList.length >= 1 ? (
                    <span className="badge badge-secondary">Added 1 movie</span>
                  ) : null}
                  {/* Achievment for adding 10 movie to their list */}
                  {user.myList.length >= 10 ? (
                    <span className="badge badge-primary">Added 10 movies</span>
                  ) : null}
                  {/* Achievment for adding 20 movie to their list */}
                  {user.myList.length >= 20 ? (
                    <span className="badge badge-accent">Added 20 movies</span>
                  ) : null}

                  {/* Achievment for attending 1 watchparty */}
                  {user.attended_count >= 1 ? (
                    <span className="badge badge-secondary">
                      Attended 1 WatchParty
                    </span>
                  ) : null}
                  {/* Achievment for attending 5 watchparties */}
                  {user.attended_count >= 5 ? (
                    <span className="badge badge-primary">
                      Attended 5 WatchParties
                    </span>
                  ) : null}
                  {/* Achievment for attending 10 watchparties */}
                  {user.attended_count >= 10 ? (
                    <span className="badge badge-accent">
                      Attended 10 WatchParties
                    </span>
                  ) : null}

                  {/* Achievment for hosting a watchparty with atleast 3 or more attendees*/}
                  {user.myWatchParties.some(
                    WP => WP.partygoerIds.length - 1 >= 3
                  ) ? (
                    <span className="badge badge-secondary">
                      Hosted 3+ partygoers
                    </span>
                  ) : null}
                  {/* Achievment for hosting a watchparty with atleast 5 or more attendees*/}
                  {user.myWatchParties.some(
                    WP => WP.partygoerIds.length - 1 >= 5
                  ) ? (
                    <span className="badge badge-primary">
                      Hosted 5+ partygoers
                    </span>
                  ) : null}
                  {/* Achievment for hosting a watchparty with atleast 10 or more attendees*/}
                  {user.myWatchParties.some(
                    WP => WP.partygoerIds.length - 1 >= 10
                  ) ? (
                    <span className="badge badge-accent">
                      Hosted 10+ partygoers
                    </span>
                  ) : null}
                </div>
              </li>
            </ul>
          </aside>
          <section>
            {/* media carousel */}
            {/* watchparties they're hosting that are upcoming carousel */}
          </section>
        </div>
      </Container>
    </main>
  );
}

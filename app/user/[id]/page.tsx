// This is the publicly available page that's visible to any user. Will show what this user's myList is, their watchParties, and badges for their achievments (Create their first watchparty, attend their first watchparty, host 5 watchparties, attend 10 watchparties, add 10 movies to their list)

"use client";

import Container from "@/components/util/Container";
import ProfileIcon from "@/components/util/ProfileIcon";
import apiFetcher from "@/lib/APIFetcher";
import { formatDate } from "@/lib/format";
import { ProfileUser } from "@/types";
import useSWR from "swr";

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

  if (!isLoading && error) throw new Error("Invalid user id");

  return !user ? (
    <span>Loading...</span>
  ) : (
    <main className="min-h-screen">
      <Container>
        <div>
          <ProfileIcon id={user.id} size={56} />
          <h2>{user.name}</h2>
        </div>
        <div>
          <aside>
            <h3>About Me</h3>
            <ul>
              <li>{user.city}</li>
              <li>{formatDate(user.createdAt)}</li>
              <li>{user.hosted_count}</li>
              <li>{user.attended_count}</li>
            </ul>
            <h3>Achievments</h3>
            <div>
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
                <span className="badge badge-accent">Created a WatchParty</span>
              ) : null}

              {/* Achievment for adding 1 movie to their list */}
              {user.myList.length >= 1 ? (
                <span className="badge badge-secondary">
                  Added 1 movie to their list
                </span>
              ) : null}
              {/* Achievment for adding 10 movie to their list */}
              {user.myList.length >= 10 ? (
                <span className="badge badge-primary">
                  Added 10 movies to their list
                </span>
              ) : null}
              {/* Achievment for adding 20 movie to their list */}
              {user.myList.length >= 20 ? (
                <span className="badge badge-accent">
                  Added 20 movies to their list
                </span>
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

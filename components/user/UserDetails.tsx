import { formatDate } from "@/lib/format";
import { ProfileUser } from "@/types";

interface UserDetailsProps {
  user: ProfileUser;
}

export default function UserDetails({ user }: UserDetailsProps) {
  return (
    <aside className="w-full h-min sm:min-w-[220px] sm:max-w-[30%] bg-primary/20 p-2 md:p-4 rounded-md">
      <h3 className="font-bold uppercase text-xl md:text-2xl mb-2 md:mb-4">
        About Me
      </h3>
      <ul className="[&>*>*:first-child]:font-bold [&>*:not(:last-child)]:mb-2 md:[&>*:not(:last-child)]:mb-4 text-sm sm:text-md">
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
              <span className="badge badge-secondary">Hosted 1 WatchParty</span>
            ) : null}
            {/* Achievment for hosting 5 watchparties */}
            {user.hosted_count >= 5 ? (
              <span className="badge badge-primary">Hosted 5 WatchParties</span>
            ) : null}
            {/* Achievment for hosting 10 watchparties */}
            {user.hosted_count >= 10 ? (
              <span className="badge badge-accent">Hosted 10 WatchParties</span>
            ) : null}

            {/* Achievment for creating a watchParty */}
            {user.myWatchParties.length >= 1 ? (
              <span className="badge badge-accent">Created a WatchParty</span>
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
            {user.myWatchParties.some(WP => WP.partygoerIds.length - 1 >= 3) ? (
              <span className="badge badge-secondary">
                Hosted 3+ partygoers
              </span>
            ) : null}
            {/* Achievment for hosting a watchparty with atleast 5 or more attendees*/}
            {user.myWatchParties.some(WP => WP.partygoerIds.length - 1 >= 5) ? (
              <span className="badge badge-primary">Hosted 5+ partygoers</span>
            ) : null}
            {/* Achievment for hosting a watchparty with atleast 10 or more attendees*/}
            {user.myWatchParties.some(
              WP => WP.partygoerIds.length - 1 >= 10
            ) ? (
              <span className="badge badge-accent">Hosted 10+ partygoers</span>
            ) : null}
          </div>
        </li>
      </ul>
    </aside>
  );
}

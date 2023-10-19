import { formatDate } from "@/lib/format";
import { ProfileUser } from "@/types";
import Achievments from "./Achievments";
import Skeleton from "../util/Skeleton";

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
        {!user ? (
          Array(5)
            .fill(null)
            .map((item, i) => (
              <li key={i}>
                <Skeleton className="w-1/4" />
                <Skeleton className="w-1/3" />
              </li>
            ))
        ) : (
          <>
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
              <Achievments user={user} />
            </li>
          </>
        )}
      </ul>
    </aside>
  );
}

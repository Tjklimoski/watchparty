import ProfileIconGroup from "../util/ProfileIconGroup";

interface InterestedUsersTileProps {
  interestedUsersIds: string[] | undefined;
  color: "primary" | "secondary";
}

export default function InterestedUsersTile({
  interestedUsersIds,
  color,
}: InterestedUsersTileProps) {
  return (
    <div>
      <div
        className={`font-semibold py-1 px-2 rounded-md mb-2 ${
          color === "primary" ? "bg-primary/40" : "bg-secondary/40"
        }`}
      >
        Interested Users
      </div>
      <ProfileIconGroup
        title="Interested"
        userIds={interestedUsersIds}
        iconSize={50}
      >
        {/* Children are the fallback if no users */}
        No interested users.
      </ProfileIconGroup>
    </div>
  );
}

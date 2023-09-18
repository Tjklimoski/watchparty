import React from "react";
import UserListItem from "./UserListItem";

interface UserListProps {
  userIds: string[] | undefined;
}

export default function UserList({ userIds }: UserListProps) {
  const listItems = userIds
    ? userIds.map((id) => <UserListItem key={id} id={id} />)
    : Array(8)
        .fill(null)
        .map((item, i) => <UserListItem key={i} id={item} />);

  return (
    <div className="grow overflow-y-auto scroll-auto scrollbar-thin scrollbar-thumb-secondary active:scrollbar-thumb-secondary-focus scrollbar-track-neutral scrollbar-thumb-rounded-full scrollbar-track-rounded-full overscroll-contain pe-2">
      <ul className="[&>*:not(:last-child)]:border-b-2">{listItems}</ul>
    </div>
  );
}

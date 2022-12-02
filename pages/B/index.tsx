import React, { useRef } from "react";
import { useUsers } from "@hooks/useUsers";
import { UserCard } from "@components/UserCard";
import { ListTitle } from "@components/ListTitle";
import { ListItem } from "@components/ListItem";
import { LoadMoreContainer } from "@components/LoadMoreContainer";

const B = () => {
  const checkScrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const { users, hasNext, loadNextPage } = useUsers("LISTB");

  const checkScroll = () => {
    if (!hasNext) return;
    const doc = document.documentElement;
    if (checkScrollTimeout.current) clearTimeout(checkScrollTimeout.current);
    // debouncing the scroll check
    checkScrollTimeout.current = setTimeout(() => {
      if (doc.scrollHeight - doc.scrollTop - doc.clientHeight <= 400) {
        loadNextPage();
      }
    }, 250);
  };

  return (
    <>
      <ListTitle>Auto-Load Infinite List</ListTitle>
      <div
        style={{ width: "100%", overflow: "auto", height: "100%" }}
        onScroll={checkScroll}
      >
        <ul>
          {users.map((user, idx) => (
            <ListItem key={idx}>
              <UserCard user={user} />
            </ListItem>
          ))}
        </ul>
        {hasNext && <LoadMoreContainer>Loading...</LoadMoreContainer>}
      </div>
    </>
  );
};

export default B;

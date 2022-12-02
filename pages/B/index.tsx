import React, { useRef } from "react";
import { useUsers } from "@hooks/useUsers";
import { UserCard } from "@components/UserCard";
import { ListTitle } from "@components/ListTitle";
import { ListItem } from "@components/ListItem";
import { LoadMoreContainer } from "@components/LoadMoreContainer";
import { ScrollableWrapper } from "@components/ScrollableWrapper";

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
      <ScrollableWrapper onScroll={checkScroll}>
        <ul>
          {users.map((user, idx) => (
            <ListItem key={idx}>
              <UserCard user={user} />
            </ListItem>
          ))}
        </ul>
        {hasNext && <LoadMoreContainer>Loading...</LoadMoreContainer>}
      </ScrollableWrapper>
    </>
  );
};

export default B;

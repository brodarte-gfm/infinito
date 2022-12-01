import React, { useCallback, useEffect, useRef } from "react";
import { useUsers } from "@hooks/useUsers";
import { UserCard } from "@components/UserCard";
import { ListTitle } from "@components/ListTitle";
import { ListItem } from "@components/ListItem";
import { LoadMoreContainer } from "@components/LoadMoreContainer";

const UserListB = () => {
  const checkScrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const { users, hasNext, loadNextPage } = useUsers("LISTB");

  const checkScroll = useCallback(() => {
    if (!hasNext) return;
    const doc = document.documentElement;
    if (checkScrollTimeout.current) clearTimeout(checkScrollTimeout.current);
    checkScrollTimeout.current = setTimeout(() => {
      if (doc.scrollHeight - doc.scrollTop - doc.clientHeight <= 200) {
        loadNextPage();
      }
    }, 500);
  }, [hasNext, loadNextPage]);

  useEffect(() => {
    // In this example the scrolling element is the page itself, so we'll attach an event listener to
    // the window/document. If instead we had a container div/element w/ width and overflow properties set
    // that scrolled, we would assign checkScroll to its onScroll event
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, [checkScroll]);

  return (
    <>
      <ListTitle>Auto-Load Infinite List</ListTitle>
      <ul>
        {users.map((user, idx) => (
          <ListItem key={idx}>
            <UserCard user={user} />
          </ListItem>
        ))}
      </ul>
      {hasNext && <LoadMoreContainer>Loading...</LoadMoreContainer>}
    </>
  );
};

export default UserListB;

import React, { useRef, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useUsers } from "@hooks/useUsers";
import { UserCard } from "@components/UserCard";
import { ListTitle } from "@components/ListTitle";
import { LoadMoreContainer } from "@components/LoadMoreContainer";
import { ScrollableWrapper } from "@components/ScrollableWrapper";

// based on example from react-virtual docs: https://tanstack.com/virtual/v3/docs/examples/react/infinite-scroll

const C = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const { users, hasNext, loading, loadNextPage } = useUsers("LISTC");

  const rowVirtualizer = useVirtualizer({
    count: hasNext ? users.length + 1 : users.length, // if there's a next page, the +1 adds a slot for the "Loading..." element
    getScrollElement: () => parentRef.current,
    estimateSize: () => 126, // est. height of rows in pixels
    overscan: 5,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (lastItem.index >= users.length - 1 && hasNext && !loading) {
      loadNextPage();
    }
  }, [hasNext, loadNextPage, users.length, loading, rowVirtualizer]);

  return (
    <>
      <ListTitle>Auto-Load Virtualized Infinite List</ListTitle>
      <ScrollableWrapper ref={parentRef}>
        <ul
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "70%",
            position: "relative",
            margin: "1.25rem auto",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const isLoaderRow = virtualRow.index > users.length - 1;
            const user = users[virtualRow.index];

            return (
              <li
                key={virtualRow.index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {isLoaderRow ? (
                  <LoadMoreContainer>
                    {hasNext ? "Loading..." : ""}
                  </LoadMoreContainer>
                ) : (
                  <UserCard user={user} />
                )}
              </li>
            );
          })}
        </ul>
      </ScrollableWrapper>
    </>
  );
};

export default C;

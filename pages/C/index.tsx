import React, { useRef, useEffect } from "react";
import { useUsers } from "@hooks/useUsers";
import { UserCard } from "@components/UserCard";
import { useVirtualizer } from "@tanstack/react-virtual";
import { ListTitle } from "@components/ListTitle";
import { LoadMoreContainer } from "@components/LoadMoreContainer";

const C = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const { users, hasNext, loading, loadNextPage } = useUsers("LISTC");
  const rowVirtualizer = useVirtualizer({
    count: hasNext ? users.length + 1 : users.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 126,
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
  }, [
    hasNext,
    loadNextPage,
    users.length,
    loading,
    rowVirtualizer,
  ]);

  return (
    <>
      <ListTitle>Auto-Load Virtualized Infinite List</ListTitle>
      <div
        ref={parentRef}
        className="List"
        style={{
          height: `100%`,
          width: `100%`,
          overflow: "auto",
        }}
      >
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
      </div>
    </>
  );
};

export default C;
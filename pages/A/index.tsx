import React from "react";
import { allUsers as _allUsers, useUsers } from "@hooks/useUsers";
import UserCard from "@components/UserCard/UserCard";
import { ListTitle } from "@components/ListTitle";
import { ListItem } from "@components/ListItem";
import { LoadMoreContainer } from "@components/LoadMoreContainer";
import { ScrollableWrapper } from "@components/ScrollableWrapper";

const A = () => {
  const { users, loading, hasNext, loadNextPage } = useUsers("LISTA");
  return (
    <>
      <ListTitle>Click-To-Load Infinite List</ListTitle>
      <ScrollableWrapper>
        <ul>
          {users.map((user, idx) => (
            <ListItem key={idx}>
              <UserCard user={user} />
            </ListItem>
          ))}
        </ul>
        {hasNext && (
          <LoadMoreContainer>
            <button
              disabled={loading}
              onClick={loadNextPage}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </LoadMoreContainer>
        )}
      </ScrollableWrapper>
    </>
  );
};

export default A;

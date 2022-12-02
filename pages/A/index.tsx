import React from "react";
import { allUsers as _allUsers, useUsers } from "@hooks/useUsers";
import UserCard from "@components/UserCard/UserCard";
import style from "./A.module.css";
import { ListTitle } from "@components/ListTitle";
import { ListItem } from "@components/ListItem";
import { LoadMoreContainer } from "@components/LoadMoreContainer";

const A = () => {
  const { users, loading, hasNext, loadNextPage } = useUsers("LISTA");
  return (
    <>
      <ListTitle>Click-To-Load Infinite List</ListTitle>
      <div style={{ width: "100%", overflow: "auto", height: "100%" }}>
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
              className={style.loadMoreBtn}
              disabled={loading}
              onClick={loadNextPage}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </LoadMoreContainer>
        )}
      </div>
    </>
  );
};

export default A;

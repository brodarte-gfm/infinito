import { User } from "../../types";
import React from "react";
import style from "./UserCard.module.css";

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className={style.userCard}>
      <img
        src={user.avatar}
        alt={`avatar of ${user.name}`}
        height={72}
        width={72}
      />
      <div className={style.userCardInfo}>
        <h4>
          {user.name} - {user.id}
        </h4>
        <h5>{user.email}</h5>
        <h5>{user.company}</h5>
      </div>
    </div>
  );
};

export default UserCard;

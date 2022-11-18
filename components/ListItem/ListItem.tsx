import React from "react";
import style from "./ListItem.module.css";

interface ListItemProps {
  children: React.ReactNode;
}

const ListItem = ({ children }: ListItemProps) => {
  return <li className={style.listItem}>{children}</li>;
};

export default ListItem;

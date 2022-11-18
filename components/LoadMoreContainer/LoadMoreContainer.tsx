import React from "react";
import style from "./LoadMoreContainer.module.css";

interface LoadMoreContainerProps {
  children: React.ReactNode;
}

const LoadMoreContainer = ({ children }: LoadMoreContainerProps) => {
  return <div className={style.loadMoreContainer}>{children}</div>;
};

export default LoadMoreContainer;

import React from "react";
import style from "./ScrollableWrapper.module.css";

interface ScrollableWrapperProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

const ScrollableWrapper = React.forwardRef<
  HTMLDivElement,
  ScrollableWrapperProps
>((props: ScrollableWrapperProps, ref) => {
  const { children, ...otherProps } = props;
  return (
    <div className={style.wrapper} ref={ref} {...otherProps}>
      {children}
    </div>
  );
});

export default ScrollableWrapper;

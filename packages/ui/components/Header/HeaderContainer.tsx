import React from "react";
import clsx from "clsx";

interface HeaderContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}
const HeaderContainer: React.FC<HeaderContainerProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <header
      className={clsx(
        "flex h-16 w-full border-b border-background-200 border-black/10 bg-white dark:bg-background-400 px-4 justify-between items-center",
        className,
      )}
      {...rest}
    >
      {children}
    </header>
  );
};

export default HeaderContainer;

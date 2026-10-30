import { HTMLAttributes } from "react";

export const Main = ({
  className = "",
  ...props
}: HTMLAttributes<HTMLElement>) => (
  <main className={`page ${className}`} {...props} />
);

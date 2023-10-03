import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: Props) {
  return (
    <section className={`max-w-7xl mx-auto ${className}`}>{children}</section>
  );
}

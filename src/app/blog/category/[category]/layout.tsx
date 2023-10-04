import CategoriesNav from "@/components/CategoriesNav";
import Container from "@/components/Container";
import { ReactNode } from "react";

export default function CategoryLayout({ children }: { children: ReactNode }) {
  return (
    <Container className="grid grid-cols-[85%_1fr]">
      {children}
      <CategoriesNav />
    </Container>
  );
}

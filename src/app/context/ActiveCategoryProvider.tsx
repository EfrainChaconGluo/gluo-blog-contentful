"use client";
import { ReactNode, createContext, useState } from "react";

interface ICategoryContext {
  activeCategory: string;
  handleActiveCategory: (category: string) => void;
}

export const CategoryContext = createContext<ICategoryContext>({
  activeCategory: "",
  handleActiveCategory: () => {},
});

export default function ActiveCategoryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [activeCategory, setActiveCategory] = useState("");
  const handleActiveCategory = (category: string) =>
    setActiveCategory(category);
  return (
    <CategoryContext.Provider value={{ activeCategory, handleActiveCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}

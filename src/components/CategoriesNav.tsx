"use client";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { CategoryContext } from "@/context/ActiveCategoryProvider";
import { getAllTags } from "@/lib/getAllTags";
import { Root } from "@/types/tags";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CategoriesNav() {
  const [tags, setTags] = useState<Root | undefined>();
  const { activeCategory, handleActiveCategory } = useContext(CategoryContext);
  useEffect(() => {
    if (!window.location.pathname.includes("category")) {
      handleActiveCategory("");
    }
    const fetchTags = async () => {
      const data = await getAllTags();
      setTags(data);
    };
    fetchTags();
  }, []);
  return tags ? (
    <nav className="col-span-full row-start-1 flex flex-wrap sm:flex-nowrap gap-8 sm:gap-12 mb-4">
      {tags.items.map((tag) => (
        <Link
          onClick={() => handleActiveCategory(tag.name)}
          href={`/blog/category/${tag.sys.id}`}
          key={tag.sys.id}
          className={`pb-2 border-b-[4px] hover:border-[#e8ff72] ${
            activeCategory === tag.name ? "border-[#e8ff72]" : ""
          }`}
        >
          {tag.name}
        </Link>
      ))}
    </nav>
  ) : (
    <div className="col-span-full row-start-1">
      <Skeleton height={30} width="50%" />
    </div>
  );
}

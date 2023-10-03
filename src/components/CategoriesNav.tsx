import { getAllTags } from "@/app/lib/getAllTags";
import Link from "next/link";
import React from "react";

export default async function CategoriesNav() {
  const data = await getAllTags();
  return (
    <nav className="col-start-4 row-span-full h-full flex flex-col gap-2">
      {data?.items.map((tag) => (
        <Link
          href={`blog/category/${tag.name.toLowerCase().replaceAll(" ", "-")}`}
          key={tag.sys.id}
        >
          {tag.name}
        </Link>
      ))}
    </nav>
  );
}

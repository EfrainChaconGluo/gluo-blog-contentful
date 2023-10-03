"use client";
import { useParams } from "next/navigation";

export default function Category() {
  const { category } = useParams();

  return <div>{category}</div>;
}

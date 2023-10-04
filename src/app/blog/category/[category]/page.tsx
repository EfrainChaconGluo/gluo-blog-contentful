"use client";
import { getAllPosts } from "@/app/lib/getAllPosts";
import { getPostsByTagId } from "@/app/lib/getPostsByTagId";
import CategoriesNav from "@/components/CategoriesNav";
import ClientPost from "@/components/ClientPost";
import Container from "@/components/Container";
import Post from "@/components/Post";
import { Root } from "@/types/posts";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Category() {
  const { category } = useParams();
  const [categoryPosts, setCategoryPosts] = useState<Root | undefined>();

  useEffect(() => {
    getPostsByTagId(category as string).then((data) => setCategoryPosts(data));
  }, []);

  return (
    <main className="min-h-screen">
      <Container className="grid grid-cols-3 gap-4 items-center">
        {/* {JSON.stringify(categoryPosts)} */}
        {categoryPosts?.items.map((post) => (
          <ClientPost
            key={post.sys.id}
            title={post.fields.title}
            thumbnail={post.fields.thumbnail}
            createdAt={post.fields.createdAt}
            readingTime={post.fields.readingTime}
            metaDescription={post.fields.metaDescription}
            slug={post.fields.slug}
            excerpt={post.fields.excerpt}
            author={post.fields.author}
            metaKeywords={post.fields.metaKeywords}
          />
        ))}
      </Container>
    </main>
  );
}

"use client";
import { getPostBySlug } from "@/app/lib/getPostBySlug";
import Container from "@/components/Container";
import { Root } from "@/types/posts";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function BlogArticle() {
  const { slug } = useParams();
  const [post, setPost] = useState<Root | undefined>();
  useEffect(() => {
    getPostBySlug(slug as string).then((post) => setPost(post));
  }, []);
  return (
    <main className="min-h-screen">
      {post ? (
        <>
          <section>
            <Container className="grid grid-cols-2">
              <div>{post?.items[0]?.fields.title}</div>
              <div>hola</div>
            </Container>
          </section>
          <section>
            <Container className="grid grid-cols-[80%_1fr]">
              <div>hola</div>
              <div>hola</div>
            </Container>
          </section>
        </>
      ) : null}
    </main>
  );
}

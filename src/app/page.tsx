import Post from "@/components/Post";
import { Item } from "@/types/posts";
import { getAllPosts } from "./lib/getAllPosts";
import Container from "@/components/Container";
import CategoriesNav from "@/components/CategoriesNav";

export default async function Home() {
  const posts = (await getAllPosts()) as Item[];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Container className="grid grid-cols-4 gap-4 items-center">
        {posts?.map((post) => (
          <Post
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
        <CategoriesNav />
      </Container>
    </main>
  );
}

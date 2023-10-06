import Post from "@/components/Post";
import { getAllPosts } from "../lib/getAllPosts";
import Container from "@/components/Container";
import CategoriesNav from "@/components/CategoriesNav";

export default async function Home() {
  const posts = await getAllPosts();
  return (
    <main className="min-h-screen">
      <Container className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center p-4 md:p-16">
        <CategoriesNav />
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
      </Container>
    </main>
  );
}

import { Item, Root } from "@/types/posts";

export async function getAllPosts() {
  try {
    const res = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT_ID}/entries?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      { cache: "no-store" }
    );
    const data = (await res.json()) as Root;
    const allPosts = data.items.filter(
      (item) => item.sys.contentType.sys.id === "blogPost"
    ) as Item[];
    return allPosts;
  } catch (error) {
    console.log(error);
  }
}

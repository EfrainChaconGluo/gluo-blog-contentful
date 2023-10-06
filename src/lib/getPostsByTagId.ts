import { Root } from "@/types/posts";

export async function getPostsByTagId(id: string) {
  try {
    const res = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT_ID}/entries?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}&metadata.tags.sys.id[in]=${id}`,
      { cache: "no-store" }
    );
    const data = (await res.json()) as Root;
    return data;
  } catch (error) {
    console.log(error);
  }
}

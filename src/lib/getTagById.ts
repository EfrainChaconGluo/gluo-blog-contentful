import { Item } from "@/types/tags";

export async function getTagById(tagId: string) {
  try {
    const res = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT_ID}/tags/${tagId}?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}
          `,
      { cache: "no-store" }
    );

    const data = (await res.json()) as Item;
    return data;
  } catch (error) {
    console.log(error);
  }
}

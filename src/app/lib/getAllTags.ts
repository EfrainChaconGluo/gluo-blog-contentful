import { Root } from "@/types/tags";

export async function getAllTags() {
  try {
    const res = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT_ID}/tags?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}
          `,
      { cache: "no-store" }
    );

    const data = (await res.json()) as Root;
    return data;
  } catch (error) {
    console.log(error);
  }
}

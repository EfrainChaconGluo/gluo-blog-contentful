import { Root } from "@/types/tags";

export async function getAllTags() {
  try {
    const res = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT_ID}/tags?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}
          `,
      { cache: "no-cache" }
    );

    const data = (await res.json()) as Root;
    return data;
  } catch (error) {
    console.log(error);
  }
}

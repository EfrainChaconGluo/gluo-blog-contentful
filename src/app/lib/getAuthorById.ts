import { AuthorFields } from "@/types/posts";

export async function getAuthorById(id: string = "") {
  try {
    const res = await fetch(
      `
      https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT_ID}/entries/${id}?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      { cache: "no-cache" }
    );
    const data = (await res.json()) as { fields: AuthorFields };

    return data;
  } catch (error) {
    console.log(error);
  }
}

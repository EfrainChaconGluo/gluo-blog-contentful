import { Asset } from "@/types/posts";

export async function getAssetById(id: string = "") {
  try {
    const res = await fetch(
      `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT_ID}/assets/${id}?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}
      `,
      { cache: "no-cache" }
    );

    const asset = (await res.json()) as Asset;
    return asset;
  } catch (error) {
    console.log(error);
  }
}

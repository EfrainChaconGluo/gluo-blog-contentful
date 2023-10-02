import { Root } from "@/types";

export async function GET() {
  const res = await fetch(
    `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT_ID}/entries?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}`
  );
  const allPosts = await res.json();
  return Response.json(allPosts);
}

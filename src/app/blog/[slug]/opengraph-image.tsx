import { getAssetById } from "@/app/lib/getAssetById";
import { getPostBySlug } from "@/app/lib/getPostBySlug";
import Image from "next/image";
import { ImageResponse } from "next/server";
import React from "react";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/webp";

export default async function OgImage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const post = await getPostBySlug(slug);
  //   const postImage = await getAssetById(post?.items[0].fields.thumbnail?.sys.id);
  return new ImageResponse(
    (
      <div tw="flex justify-center items-center w-full h-full">
        {post?.items[0].fields.title}
      </div>
    ),
    { ...size }
  );
}

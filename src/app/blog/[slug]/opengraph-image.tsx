import { getAssetById } from "@/app/lib/getAssetById";
import { getPostBySlug } from "@/app/lib/getPostBySlug";
import Image from "next/image";
import { ImageResponse } from "next/server";
import React from "react";

export default async function OgImage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const post = await getPostBySlug(slug);
  const postImage = await getAssetById(post?.items[0].fields.thumbnail?.sys.id);
  return new ImageResponse(
    (
      <Image
        src={`https:${postImage?.fields.file.url}`}
        alt={postImage?.fields.file.fileName!}
        width={300}
        height={300}
      />
    )
  );
}

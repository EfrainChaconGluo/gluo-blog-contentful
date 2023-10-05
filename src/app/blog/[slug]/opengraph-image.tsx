import { getAssetById } from "@/app/lib/getAssetById";
import { getPostBySlug } from "@/app/lib/getPostBySlug";
import Image from "next/image";
import { ImageResponse } from "next/server";
import React from "react";

export const contentType = "image/webp";

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
      <div tw="flex w-32 h-32">
        <Image
          src={`https:${postImage?.fields.file.url}`}
          alt={postImage?.fields.file.fileName!}
          width={300}
          height={300}
          tw="flex"
        />
      </div>
    )
  );
}

import { getAuthorById } from "@/lib/getAuthorById";
import { getAssetById } from "@/lib/getAssetById";
import { Fields } from "@/types/posts";
import Image from "next/image";
import React from "react";
import Link from "next/link";

export default async function Post({
  title,
  thumbnail,
  createdAt,
  readingTime,
  metaDescription,
  slug,
  excerpt,
  author,
  metaKeywords,
}: Fields) {
  const image = await getAssetById(thumbnail?.sys.id);
  const postAuthor = await getAuthorById(author?.sys.id);
  const authorImage = await getAssetById(postAuthor?.fields.photo?.sys.id);
  return (
    <article className="flex flex-col h-full">
      <Link href={`/blog/${slug}`} className="flex flex-col gap-2 h-full">
        <Image
          src={`https:${image?.fields.file.url}`}
          alt={image?.fields.title!}
          width={image?.fields.file.details.image.width}
          height={image?.fields.file.details.image.height}
          className="justify-self-center mb-2"
        />
        <h2 className="text-2xl text-black">{title}</h2>
        <div className="mt-auto flex gap-4 mb-2">
          <small>Fecha: {new Date(createdAt!).toLocaleDateString()}</small>
          <small>{readingTime} min</small>
        </div>
      </Link>
      <footer className="flex gap-2 items-center">
        <Image
          src={`https:${authorImage?.fields.file.url}`}
          alt={postAuthor?.fields.fullName!}
          width={100}
          height={100}
          className="rounded-full w-12 h-12"
        />
        <small>{postAuthor?.fields.fullName}</small>
      </footer>
    </article>
  );
}

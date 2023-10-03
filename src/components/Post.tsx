import { getAuthorById } from "@/app/lib/getAuthorById";
import { getAssetById } from "@/app/lib/getAssetById";
import { Fields } from "@/types/posts";
import Image from "next/image";
import React from "react";

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
  //   console.log(postAuthor);
  return (
    <article className="flex flex-col h-full">
      <Image
        src={`https:${image.fields.file.url}`}
        alt={image.fields.title}
        width={image.fields.file.details.image.width}
        height={image.fields.file.details.image.height}
        className="justify-self-center"
      />
      <div className="mt-auto flex flex-col gap-4">
        <h2 className="text-2xl">{title}</h2>
        <div className="flex gap-4 mb-2">
          <small>Fecha: {new Date(createdAt!).toLocaleDateString()}</small>
          <small>{readingTime} min</small>
        </div>
      </div>
      <footer className="flex gap-2 items-center">
        <Image
          src={`https:${authorImage.fields.file.url}`}
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

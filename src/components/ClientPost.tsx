"use client";
import { getAssetById } from "@/lib/getAssetById";
import { getAuthorById } from "@/lib/getAuthorById";
import { Asset, AuthorFields, Fields } from "@/types/posts";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function ClientPost({
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
  const [postImage, setPostImage] = useState<Asset | undefined>();
  const [postAuthor, setPostAuthor] = useState<
    | {
        fields: AuthorFields;
      }
    | undefined
  >();
  const [authorImage, setAuthorImage] = useState<Asset | undefined>();

  useEffect(() => {
    Promise.all([
      getAssetById(thumbnail?.sys.id),
      getAuthorById(author?.sys.id),
    ]).then(([postImageAsset, authorData]) => {
      setPostImage(postImageAsset);
      setPostAuthor(authorData);

      if (authorData) {
        getAssetById(authorData.fields.photo?.sys.id).then((authorImageAsset) =>
          setAuthorImage(authorImageAsset)
        );
      }
    });
  }, []);

  return (
    <article className="flex flex-col h-full">
      {postImage && postAuthor && authorImage ? (
        <>
          <Link href={`/blog/${slug}`} className="flex flex-col gap-2 h-full">
            <Image
              src={`https:${postImage?.fields.file.url}`}
              alt={postImage?.fields.title!}
              width={postImage?.fields.file.details.image.width}
              height={postImage?.fields.file.details.image.height}
              className="justify-self-center"
            />
            <h2 className="text-2xl">{title}</h2>
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
        </>
      ) : null}
    </article>
  );
}

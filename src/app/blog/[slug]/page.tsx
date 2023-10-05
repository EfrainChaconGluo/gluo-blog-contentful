"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Container from "@/components/Container";
import { Asset, AuthorFields, Root } from "@/types/posts";
import { getAssetById } from "@/app/lib/getAssetById";
import { getPostBySlug } from "@/app/lib/getPostBySlug";
import { getAuthorById } from "@/app/lib/getAuthorById";
import Link from "next/link";
import { CopyLink, Facebook, LinkedIn, Twitter } from "@/components/icons";
import { FacebookShareButton } from "next-share";
import { getTagById } from "@/app/lib/getTagById";
import { Item } from "@/types/tags";

export default function BlogArticle() {
  const { slug } = useParams();
  const [post, setPost] = useState<Root | undefined>();
  const [postImage, setPostImage] = useState<Asset | undefined>();
  const [postAuthor, setPostAuthor] = useState<
    { fields: AuthorFields } | undefined
  >();
  const [postTag, setPostTag] = useState<Item | undefined>();
  const [copyToClipboard, setCopyToClipboard] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const post = await getPostBySlug(slug as string);
      setPost(post);

      if (post) {
        const image = await getAssetById(
          post?.items[0].fields.thumbnail?.sys.id
        );
        const author = await getAuthorById(post.items[0].fields.author?.sys.id);
        const tag = await getTagById(post.items[0].metadata.tags[0].sys.id);
        setPostTag(tag);
        setPostImage(image);
        setPostAuthor(author);
      }
    };
    fetchData();
  }, []);

  const handleCopyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyToClipboard("Enlace copiado al portapepeles");
    setTimeout(() => {
      setCopyToClipboard("");
    }, 3000);
  };
  return (
    <main className="min-h-screen">
      {post ? (
        <>
          <section>
            <Container className="grid grid-cols-2">
              <div className="flex flex-col gap-6 p-4 ">
                <h1 className="text-[40px]">{post?.items[0]?.fields.title}</h1>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-8 text-[#9f9f9f]">
                    <small>
                      {new Date(
                        post?.items[0]?.fields.createdAt!
                      ).toLocaleDateString()}
                    </small>
                    <small>{postAuthor?.fields.fullName}</small>
                    <small>
                      {post.items[0].fields.readingTime} min de lectura
                    </small>
                  </div>
                  <Link
                    href={`/blog/category/${postTag?.sys.id}`}
                    className="bg-[#f7f4f0] w-fit text-sm py-2 px-4 rounded-full"
                  >
                    {postTag?.name}
                  </Link>
                </div>
                <div className="text-[#9f9f9f] flex items-center gap-6">
                  <span>¡Comparte!</span>
                  <button>
                    <LinkedIn />
                  </button>
                  <button>
                    <Twitter />
                  </button>
                  <FacebookShareButton url={window.location.href}>
                    <Facebook />
                  </FacebookShareButton>
                  <button
                    onClick={handleCopyLinkToClipboard}
                    className="flex gap-2 items-center"
                  >
                    <CopyLink />
                    {copyToClipboard && (
                      <span className="text-xs">{copyToClipboard}</span>
                    )}
                  </button>
                </div>
              </div>
              <div>
                {postImage ? (
                  <Image
                    src={`https:${postImage.fields?.file.url}`}
                    alt={postImage.fields?.title}
                    width={postImage.fields?.file.details.image.width}
                    height={postImage.fields?.file.details.image.height}
                  />
                ) : null}
              </div>
            </Container>
          </section>
          <section>
            <Container className="grid grid-cols-[80%_1fr]">
              <div>hola</div>
              <div>hola</div>
            </Container>
          </section>
        </>
      ) : (
        <h2>Loading</h2>
      )}
    </main>
  );
}

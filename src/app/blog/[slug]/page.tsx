"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Container from "@/components/Container";
import { Asset, AuthorFields, Root } from "@/types/posts";
import { getAssetById } from "@/lib/getAssetById";
import { getPostBySlug } from "@/lib/getPostBySlug";
import { getAuthorById } from "@/lib/getAuthorById";
import Link from "next/link";
import {
  Triangle,
  CopyLink,
  Facebook,
  LinkedIn,
  Twitter,
  Arrow,
  Chevron,
} from "@/components/icons";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "next-share";
import { getTagById } from "@/lib/getTagById";
import { Item } from "@/types/tags";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CategoryContext } from "@/context/ActiveCategoryProvider";

export default function BlogArticle() {
  const { slug } = useParams();
  const { handleActiveCategory } = useContext(CategoryContext);
  const [post, setPost] = useState<Root | undefined>();
  const [postImage, setPostImage] = useState<Asset | undefined>();
  const [postAuthor, setPostAuthor] = useState<
    { fields: AuthorFields } | undefined
  >();
  const [postTag, setPostTag] = useState<Item | undefined>();
  const [copyToClipboard, setCopyToClipboard] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [expandContentMenu, setExpandContentMenu] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) setShowScrollButton(true);
      else setShowScrollButton(false);
    });
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
  // console.log(post?.items[0].fields.excerpt?.split("#")[1].split("\n"));
  const subTitles = post?.items[0].fields.excerpt
    ?.split("#")
    .map((item) => item.split("\n")[0])
    .slice(1);

  const content = post?.items[0].fields.excerpt
    ?.split("# ")
    .slice(1)
    .map((el) => el.split("\n").filter((item) => item !== ""));

  const handleCopyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyToClipboard("Enlace copiado al portapepeles");
    setTimeout(() => {
      setCopyToClipboard("");
    }, 3000);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  const handleExpandMenu = () => setExpandContentMenu((prev) => !prev);
  return (
    <main className="min-h-screen flex flex-col gap-6 p-4 lg:p-16">
      <section>
        <Container className="grid md:grid-cols-2">
          <div className="flex flex-col gap-6 p-4 ">
            {post ? (
              <>
                <h1 className="text-[40px] text-black">
                  {post?.items[0]?.fields.title}
                </h1>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-8 text-[#9f9f9f]">
                    <small>
                      {new Date(
                        post?.items[0]?.fields.createdAt!
                      ).toLocaleDateString()}
                    </small>
                    <small>Autor: {postAuthor?.fields.fullName}</small>
                    <small>
                      {post.items[0].fields.readingTime} min de lectura
                    </small>
                  </div>
                  <Link
                    onClick={() => handleActiveCategory(postTag?.name!)}
                    href={`/blog/category/${postTag?.sys.id}`}
                    className="bg-[#f7f4f0] w-fit text-sm py-2 px-4 rounded-full"
                  >
                    {postTag?.name}
                  </Link>
                </div>
                <div className="text-[#9f9f9f] flex items-center gap-6">
                  <span>¡Comparte!</span>
                  <LinkedinShareButton url={window.location.href}>
                    <LinkedIn />
                  </LinkedinShareButton>
                  <TwitterShareButton url={window.location.href}>
                    <Twitter />
                  </TwitterShareButton>
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
              </>
            ) : (
              <Skeleton count={5} height={30} className="mb-2" />
            )}
          </div>
          <div>
            {postImage ? (
              <Image
                src={`https:${postImage.fields?.file.url}`}
                alt={postImage.fields?.title}
                width={postImage.fields?.file.details.image.width}
                height={postImage.fields?.file.details.image.height}
              />
            ) : (
              <Skeleton height="100%" />
            )}
          </div>
        </Container>
      </section>
      <section>
        <Container className="grid lg:grid-cols-[70%_1fr] gap-x-4">
          {post ? (
            <div className="flex flex-col gap-4 p-4">
              {/* <h2 className="text-3xl">{subTitles?.[0]}</h2> */}
              {content?.map((section) => {
                const paragraphs = section.slice(1);
                return (
                  <div
                    key={section[0]}
                    className="flex flex-col gap-2"
                    id={section[0].trim()}
                  >
                    <h2 className="text-3xl text-black">{section[0]}</h2>
                    {paragraphs.map((p) => (
                      <p key={p} className="text-lg">
                        {p}
                      </p>
                    ))}
                  </div>
                );
              })}
            </div>
          ) : (
            <Skeleton count={10} height={30} className="mb-4" />
          )}
          <div className="relative row-start-1 lg:row-start-auto">
            {post ? (
              <nav className="flex flex-col gap-4 p-4 sticky top-0 text-lg max-h-screen">
                <span className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <Triangle className="rotate-90" /> Content
                  </div>
                  <div
                    onClick={handleExpandMenu}
                    className={`${
                      !expandContentMenu ? "rotate-180" : ""
                    } lg:hidden transition-all duration-300 cursor-pointer`}
                  >
                    <Chevron />
                  </div>
                </span>
                <div className="overflow-hidden">
                  <div
                    className={`lg:flex flex-col ${
                      expandContentMenu ? "flex" : "hidden"
                    }`}
                  >
                    {subTitles?.map((subTitle) => (
                      <a
                        key={subTitle}
                        href={`#${subTitle.trim()}`}
                        className="py-4 border-b-[1px]"
                      >
                        {subTitle}
                      </a>
                    ))}
                  </div>
                </div>
              </nav>
            ) : (
              <Skeleton count={5} height={30} className="mb-2" />
            )}
            <button
              onClick={handleScrollToTop}
              className={`fixed bottom-10 right-10 bg-[#e8ff72] w-16 h-16 rounded-full flex justify-center items-center ${
                showScrollButton ? "block" : "hidden"
              }`}
            >
              <Arrow />
            </button>
          </div>
        </Container>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostTemplate } from "@/components/blog/BlogPostTemplate";
import { getPost, getPostSlugs } from "@/content/blog/posts";
import { SITE } from "@/config/site";
import {
  buildArticleTitle,
  buildArticleDescription,
} from "@/lib/seo";

interface RouteParams {
  slug: string;
}

interface PageProps {
  params: Promise<RouteParams>;
}

export function generateStaticParams(): RouteParams[] {
  return getPostSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    return { title: "Article inconnu | L'Espace Libre" };
  }
  const title = buildArticleTitle(post);
  const description = buildArticleDescription(post);
  const canonical = `${SITE.url.replace(/\/$/, "")}/blog/${post.slug}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      locale: SITE.locale,
      siteName: SITE.nom,
      publishedTime: post.publishedAt,
      authors: [post.auteur],
      tags: [...post.tags],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    notFound();
  }
  return (
    <main>
      <BlogPostTemplate post={post} />
    </main>
  );
}

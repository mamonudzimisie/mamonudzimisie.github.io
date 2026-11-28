import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPost from '@/components/BlogPost';
import { getPost, getPostParams } from '@/data/posts';
import { SITE_URL } from '@/lib/site';
import { socialMetadata } from '@/lib/og';

const LANG = 'pl' as const;

export function generateStaticParams() {
  return getPostParams(LANG);
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(LANG, params.slug);
  if (!post) return {};
  const url = `${SITE_URL}/${LANG}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    ...socialMetadata({
      lang: LANG,
      title: post.title,
      description: post.excerpt,
      url,
      image: post.ogImage,
      publishedTime: post.date,
    }),
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(LANG, params.slug);
  if (!post) {
    notFound();
  }
  return <BlogPost post={post} />;
}

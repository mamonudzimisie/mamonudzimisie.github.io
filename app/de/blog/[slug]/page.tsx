import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPost from '@/components/BlogPost';
import { getPost, getPostParams } from '@/data/posts';

const LANG = 'de' as const;

export function generateStaticParams() {
  return getPostParams(LANG);
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(LANG, params.slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(LANG, params.slug);
  if (!post) {
    notFound();
  }
  return <BlogPost post={post} />;
}

import type { Metadata } from 'next';
import BlogList from '@/components/BlogList';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Posts about puzzles, books and screen-free time.',
  alternates: { canonical: `${SITE_URL}/en/blog` },
};

export default function BlogPage() {
  return <BlogList lang="en" />;
}

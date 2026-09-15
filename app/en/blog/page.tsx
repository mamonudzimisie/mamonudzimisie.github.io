import type { Metadata } from 'next';
import BlogList from '@/components/BlogList';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Posts about puzzles, books and screen-free time.',
};

export default function BlogPage() {
  return <BlogList lang="en" />;
}

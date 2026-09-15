import type { Metadata } from 'next';
import BlogList from '@/components/BlogList';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Beiträge über Rätsel, Bücher und Zeit ohne Bildschirm.',
};

export default function BlogPage() {
  return <BlogList lang="de" />;
}

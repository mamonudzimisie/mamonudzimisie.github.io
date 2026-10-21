import type { Metadata } from 'next';
import BlogList from '@/components/BlogList';
import { getPosts } from '@/data/posts';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Beiträge über Rätsel, Bücher und Zeit ohne Bildschirm.',
  // Dopóki nie ma wpisów po niemiecku, pusta strona nie powinna trafiać do Google.
  ...(getPosts('de').length === 0 && { robots: { index: false } }),
};

export default function BlogPage() {
  return <BlogList lang="de" />;
}

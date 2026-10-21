import type { Metadata } from 'next';
import BlogList from '@/components/BlogList';
import { getPosts } from '@/data/posts';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Beiträge über Rätsel, Bücher und Zeit ohne Bildschirm.',
  // Dopóki nie ma wpisów po niemiecku, pusta strona nie powinna trafiać do Google.
  ...(getPosts('de').length === 0 && { robots: { index: false } }),
  alternates: { canonical: `${SITE_URL}/de/blog` },
};

export default function BlogPage() {
  return <BlogList lang="de" />;
}

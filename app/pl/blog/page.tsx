import type { Metadata } from 'next';
import BlogList from '@/components/BlogList';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Wpisy o łamigłówkach, książkach i czasie bez ekranu.',
  alternates: { canonical: `${SITE_URL}/pl/blog` },
};

export default function BlogPage() {
  return <BlogList lang="pl" />;
}

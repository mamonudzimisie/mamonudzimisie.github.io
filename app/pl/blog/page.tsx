import type { Metadata } from 'next';
import BlogList from '@/components/BlogList';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Wpisy o łamigłówkach, książkach i czasie bez ekranu.',
};

export default function BlogPage() {
  return <BlogList lang="pl" />;
}

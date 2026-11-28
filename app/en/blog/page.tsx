import type { Metadata } from 'next';
import BlogList from '@/components/BlogList';
import { SITE_URL } from '@/lib/site';
import { socialMetadata } from '@/lib/og';

const TITLE = 'Blog';
const DESCRIPTION =
  'Puzzle guides: how Killer Sudoku and Kakuro work, how to choose the right level of large print sudoku, and ideas for screen-free time.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/en/blog` },
  ...socialMetadata({ lang: 'en', title: `${TITLE} | ZALKA BOOKS`, description: DESCRIPTION, url: `${SITE_URL}/en/blog` }),
};

export default function BlogPage() {
  return <BlogList lang="en" />;
}

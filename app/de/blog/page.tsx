import type { Metadata } from 'next';
import BlogList from '@/components/BlogList';
import { getPosts } from '@/data/posts';
import { SITE_URL } from '@/lib/site';
import { socialMetadata } from '@/lib/og';

const TITLE = 'Blog';
const DESCRIPTION =
  'Ratgeber rund ums Rätseln: Sudoku im Großdruck als Geschenk, Weihnachts-Wortsuchrätsel für Senioren und Tipps für entspannte Rätselstunden.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  // Dopóki nie ma wpisów po niemiecku, pusta strona nie powinna trafiać do Google.
  ...(getPosts('de').length === 0 && { robots: { index: false } }),
  alternates: { canonical: `${SITE_URL}/de/blog` },
  ...socialMetadata({ lang: 'de', title: `${TITLE} | ZALKA BOOKS`, description: DESCRIPTION, url: `${SITE_URL}/de/blog` }),
};

export default function BlogPage() {
  return <BlogList lang="de" />;
}

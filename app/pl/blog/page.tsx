import type { Metadata } from 'next';
import BlogList from '@/components/BlogList';
import { SITE_URL } from '@/lib/site';
import { socialMetadata } from '@/lib/og';

const TITLE = 'Blog';
const DESCRIPTION =
  'Poradniki o łamigłówkach: jak wybrać wykreślanki dla dziecka i sudoku dużym drukiem dla seniora, zasady Killer Sudoku i Jigsaw, pomysły na prezent.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/pl/blog` },
  ...socialMetadata({ lang: 'pl', title: `${TITLE} | ZALKA BOOKS`, description: DESCRIPTION, url: `${SITE_URL}/pl/blog` }),
};

export default function BlogPage() {
  return <BlogList lang="pl" />;
}

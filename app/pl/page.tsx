import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';
import { getBookBySlug, getFeaturedBooks } from '@/data/books';
import { SITE_URL } from '@/lib/site';

// Kolejność w wachlarzu: pierwsza z przodu, druga po prawej, ostatnia po lewej.
// Trzy tomy jednej serii (Sudoku dużym drukiem): trzy różne książki obok siebie
// dawały misz-masz (Kate, 2026-11-21). Od lewej widać 100, 101, 102.
const HERO_SLUGS = [
  'sudoku-duzym-drukiem-101',
  'sudoku-duzym-drukiem-102',
  'sudoku-duzym-drukiem-100',
];

export const metadata: Metadata = {
  alternates: {
    canonical: `${SITE_URL}/pl`,
    languages: {
      pl: `${SITE_URL}/pl`,
      de: `${SITE_URL}/de`,
      en: `${SITE_URL}/en`,
    },
  },
};

// Układ i teksty strony głównej: components/HomePage.tsx (wspólne dla PL/DE/EN).
export default function HomePagePl() {
  const heroBooks = HERO_SLUGS.flatMap((slug) => getBookBySlug(slug) ?? []);

  return <HomePage lang="pl" heroBooks={heroBooks} featuredBooks={getFeaturedBooks('pl')} />;
}

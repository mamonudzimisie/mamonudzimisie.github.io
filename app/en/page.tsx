import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';
import { getBookBySlug } from '@/data/books';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  alternates: {
    canonical: `${SITE_URL}/en`,
    languages: {
      pl: `${SITE_URL}/pl`,
      de: `${SITE_URL}/de`,
      en: `${SITE_URL}/en`,
    },
  },
};

// Kolejność w wachlarzu: pierwsza z przodu, druga po prawej, ostatnia po lewej.
// Trzy tomy jednej serii (Large Print Sudoku): mieszanka serii i języków dawała
// misz-masz (Kate, 2026-11-21). Od lewej widać 100, 101, 102.
const HERO_SLUGS = [
  'large-print-sudoku-101',
  'large-print-sudoku-102',
  'large-print-sudoku-100',
];

// Układ i teksty strony głównej: components/HomePage.tsx (wspólne dla PL/DE/EN).
export default function HomePageEn() {
  const heroBooks = HERO_SLUGS.flatMap((slug) => getBookBySlug(slug) ?? []);

  // Wyróżnione książki to ten sam zestaw co w wachlarzu.
  return <HomePage lang="en" heroBooks={heroBooks} featuredBooks={heroBooks} />;
}

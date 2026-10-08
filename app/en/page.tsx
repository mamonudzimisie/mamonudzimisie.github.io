import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';
import { getBookBySlug } from '@/data/books';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  alternates: {
    languages: {
      pl: `${SITE_URL}/pl`,
      de: `${SITE_URL}/de`,
      en: `${SITE_URL}/en`,
    },
  },
};

// Angielskie tytuły (Large Print Sudoku 100–102, 300 Sudoku Puzzles 200)
// zajmują widoczne miejsca wachlarza, resztę uzupełnia przekrój polskich i niemieckich (karty
// mają znacznik języka, strona książki — adnotację).
// Kolejność w wachlarzu: pierwsza z przodu, druga po prawej, ostatnia po lewej.
const HERO_SLUGS = [
  'large-print-sudoku-100',
  'large-print-sudoku-101',
  'sudoku-300-puzzles-200',
  'meine-ersten-wortsuchratsel-stufe-1',
  'znajdz-slowko-poziom-latwy',
  'large-print-sudoku-102',
];

// Układ i teksty strony głównej: components/HomePage.tsx (wspólne dla PL/DE/EN).
export default function HomePageEn() {
  const heroBooks = HERO_SLUGS.flatMap((slug) => getBookBySlug(slug) ?? []);

  // Wyróżnione książki to ten sam zestaw co w wachlarzu.
  return <HomePage lang="en" heroBooks={heroBooks} featuredBooks={heroBooks} />;
}

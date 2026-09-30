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

// Jedyny angielski tytuł idzie na przód, resztę uzupełnia przekrój polskich
// i niemieckich (karty mają znacznik języka, strona książki — adnotację).
// Kolejność w wachlarzu: pierwsza z przodu, druga po prawej, ostatnia po lewej.
const HERO_SLUGS = [
  'large-print-sudoku-100',
  'sudoku-300-zagadek-200',
  'meine-ersten-wortsuchratsel-stufe-1',
  'znajdz-slowko-poziom-latwy',
  'meine-ersten-wortsuchratsel-stufe-2',
  'zdobywca-szczytow',
];

// Układ i teksty strony głównej: components/HomePage.tsx (wspólne dla PL/DE/EN).
export default function HomePageEn() {
  const heroBooks = HERO_SLUGS.flatMap((slug) => getBookBySlug(slug) ?? []);

  // Wyróżnione książki to ten sam zestaw co w wachlarzu.
  return <HomePage lang="en" heroBooks={heroBooks} featuredBooks={heroBooks} />;
}

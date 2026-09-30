import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';
import { getBookBySlug, getFeaturedBooks } from '@/data/books';
import { SITE_URL } from '@/lib/site';

// Kolejność w wachlarzu: pierwsza z przodu, druga po prawej, ostatnia po lewej.
const HERO_SLUGS = [
  'znajdz-slowko-poziom-latwy',
  'sudoku-300-zagadek-200',
  'znajdz-slowko-poziom-latwy-6-7',
  'znajdz-slowko-poziom-sredni-7-9',
  'znajdz-slowko-poziom-trudny-10',
  'zdobywca-szczytow',
];

export const metadata: Metadata = {
  alternates: {
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

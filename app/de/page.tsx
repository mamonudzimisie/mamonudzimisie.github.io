import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';
import { getBookBySlug, getFeaturedBooks } from '@/data/books';
import { SITE_URL } from '@/lib/site';

// Kolejność w wachlarzu: pierwsza z przodu, druga po prawej, ostatnia po lewej.
// Zaczynamy od tytułów niemieckich, dalej reszta oferty — karty i strony
// książek i tak oznaczają język treści.
const HERO_SLUGS = [
  // Same niemieckie wydania — polskie okładki w niemieckim hero myliły.
  'meine-ersten-wortsuchratsel-stufe-1',
  'sudoku-grossdruck-103',
  'meine-ersten-wortsuchratsel-stufe-2',
  'sudoku-grossdruck-100',
];

export const metadata: Metadata = {
  alternates: {
    canonical: `${SITE_URL}/de`,
    languages: {
      pl: `${SITE_URL}/pl`,
      de: `${SITE_URL}/de`,
      en: `${SITE_URL}/en`,
    },
  },
};

// Układ i teksty strony głównej: components/HomePage.tsx (wspólne dla PL/DE/EN).
export default function HomePageDe() {
  const heroBooks = HERO_SLUGS.flatMap((slug) => getBookBySlug(slug) ?? []);

  return <HomePage lang="de" heroBooks={heroBooks} featuredBooks={getFeaturedBooks('de')} />;
}

import type { Metadata } from 'next';
import HomePage from '@/components/HomePage';
import { getBookBySlug, getFeaturedBooks } from '@/data/books';
import { SITE_URL } from '@/lib/site';

// Kolejność w wachlarzu: pierwsza z przodu, druga po prawej, ostatnia po lewej.
// Jedna półka „Rätsel in Großdruck” zamiast mieszanki z książkami dla dzieci
// (Kate, 2026-11-21). Po niemiecku wyszły tylko dwa tomy Sudoku Großdruck (100, 103),
// trzecia jest Weihnachts-Wortsuchrätsel, też Großdruck. Od lewej: 100, 103, Weihnachts.
const HERO_SLUGS = [
  'sudoku-grossdruck-103',
  'weihnachts-wortsuchratsel',
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

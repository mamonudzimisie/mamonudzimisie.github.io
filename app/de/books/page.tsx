import type { Metadata } from 'next';
import BookCatalog from '@/components/BookCatalog';
import { books } from '@/data/books';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Bücher',
  description:
    'Alle unsere deutschen Rätselbücher an einem Ort: Suchrätsel für Kinder, Sudoku im Großdruck und Weihnachts-Wortsuchrätsel.',
  alternates: {
    canonical: `${SITE_URL}/de/books`,
    languages: {
      pl: `${SITE_URL}/pl/books`,
      de: `${SITE_URL}/de/books`,
      en: `${SITE_URL}/en/books`,
    },
  },
};

export default function BooksDe() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-3xl font-800 text-navy sm:text-4xl">Bücher</h1>
        <p className="mt-3 max-w-2xl text-ink/70">
          Alle unsere deutschen Bücher an einem Ort, nach Reihen geordnet.
        </p>
        <div className="mt-10">
          <BookCatalog books={books} siteLang="de" />
        </div>
      </div>
    </section>
  );
}

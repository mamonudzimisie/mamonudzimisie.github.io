import type { Metadata } from 'next';
import BookCatalog from '@/components/BookCatalog';
import { books } from '@/data/books';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Katalog książek',
  description:
    'Wszystkie nasze książki z łamigłówkami w jednym miejscu. Filtruj według grupy, kategorii i poziomu trudności.',
  alternates: {
    canonical: `${SITE_URL}/pl/books`,
    languages: {
      pl: `${SITE_URL}/pl/books`,
      de: `${SITE_URL}/de/books`,
      en: `${SITE_URL}/en/books`,
    },
  },
};

export default function KsiazkiPage() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-3xl font-800 text-navy sm:text-4xl">
          Katalog książek
        </h1>
        <p className="mt-3 max-w-2xl text-ink/70">
          Wybierz grupę, kategorię i poziom trudności, a znajdziemy Ci coś w sam raz.
        </p>
        <div className="mt-10">
          <BookCatalog books={books} />
        </div>
      </div>
    </section>
  );
}

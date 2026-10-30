import type { Metadata } from 'next';
import BookCatalog from '@/components/BookCatalog';
import { books } from '@/data/books';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Books',
  description:
    'All our English puzzle books in one place: large print sudoku, classic sudoku, Killer Sudoku and Kakuro.',
  alternates: {
    canonical: `${SITE_URL}/en/books`,
    languages: {
      pl: `${SITE_URL}/pl/books`,
      de: `${SITE_URL}/de/books`,
      en: `${SITE_URL}/en/books`,
    },
  },
};

export default function BooksEn() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-3xl font-800 text-navy sm:text-4xl">Books</h1>
        <div className="mt-10">
          <BookCatalog books={books} siteLang="en" />
        </div>
      </div>
    </section>
  );
}

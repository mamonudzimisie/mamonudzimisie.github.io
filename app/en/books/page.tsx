import { Suspense } from 'react';
import type { Metadata } from 'next';
import BookCatalog from '@/components/BookCatalog';
import { books } from '@/data/books';

export const metadata: Metadata = {
  title: 'Books',
  description:
    'All our puzzle books in one place. Filter by audience, category and language.',
};

export default function BooksEn() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-3xl font-800 text-navy sm:text-4xl">Books</h1>
        <p className="mt-3 max-w-2xl text-ink/70">
          Choose the audience, category and difficulty — we&apos;ll help you find the right
          one. Our English titles are in the works; for now you&apos;ll find our Polish and
          German books below.
        </p>
        <div className="mt-10">
          <Suspense fallback={null}>
            <BookCatalog books={books} siteLang="en" />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

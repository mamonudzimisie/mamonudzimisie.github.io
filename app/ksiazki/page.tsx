import { Suspense } from 'react';
import type { Metadata } from 'next';
import BookCatalog from '@/components/BookCatalog';
import { books } from '@/data/books';

export const metadata: Metadata = {
  title: 'Katalog książek',
  description:
    'Wszystkie książeczki aktywnościowe „Mamo, nudzi mi się!” w jednym miejscu. Filtruj po wieku dziecka i kategorii: wykreślanki, labirynty, kolorowanki.',
};

export default function KsiazkiPage() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-3xl font-800 text-navy sm:text-4xl">
          Katalog książek
        </h1>
        <p className="mt-3 max-w-2xl text-ink/70">
          Wybierz wiek dziecka i kategorię, a znajdziemy Ci coś w sam raz.
        </p>
        <div className="mt-10">
          <Suspense fallback={null}>
            <BookCatalog books={books} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

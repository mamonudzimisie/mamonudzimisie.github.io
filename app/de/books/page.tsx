import { Suspense } from 'react';
import type { Metadata } from 'next';
import BookCatalog from '@/components/BookCatalog';
import { books } from '@/data/books';

export const metadata: Metadata = {
  title: 'Bücher',
  description:
    'Alle unsere Rätselbücher an einem Ort. Filtere nach Zielgruppe, Kategorie und Sprache.',
};

export default function BooksDe() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-3xl font-800 text-navy sm:text-4xl">Bücher</h1>
        <p className="mt-3 max-w-2xl text-ink/70">
          Wähle Zielgruppe, Kategorie und Schwierigkeitsgrad — wir finden das Passende.
          Unsere deutschen Titel sind in Arbeit; über die Sprachauswahl siehst du auch
          unsere polnischen Bücher.
        </p>
        <div className="mt-10">
          <Suspense fallback={null}>
            <BookCatalog books={books} siteLang="de" />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

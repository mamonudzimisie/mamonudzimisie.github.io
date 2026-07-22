'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import BookCard from '@/components/BookCard';
import { AGE_GROUPS, CATEGORY_LABELS, type Book, type BookCategory } from '@/data/books';

export default function BookCatalog({ books }: { books: Book[] }) {
  const searchParams = useSearchParams();
  const initialAge = searchParams.get('wiek') ?? '';

  const [selectedAge, setSelectedAge] = useState<string>(initialAge);
  const [selectedCategory, setSelectedCategory] = useState<BookCategory | ''>('');

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const ageMatch = selectedAge === '' || book.ageRange === selectedAge;
      const categoryMatch = selectedCategory === '' || book.category === selectedCategory;
      return ageMatch && categoryMatch;
    });
  }, [books, selectedAge, selectedCategory]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-ink/70">Wiek:</span>
          <button
            onClick={() => setSelectedAge('')}
            className={`rounded-full px-3 py-1 text-sm font-semibold transition ${
              selectedAge === '' ? 'bg-navy text-white' : 'bg-white/60 text-ink/70'
            }`}
          >
            Wszystkie
          </button>
          {AGE_GROUPS.map((age) => (
            <button
              key={age}
              onClick={() => setSelectedAge(age)}
              className={`rounded-full px-3 py-1 text-sm font-semibold transition ${
                selectedAge === age ? 'bg-navy text-white' : 'bg-white/60 text-ink/70'
              }`}
            >
              {age}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-ink/70">Kategoria:</span>
          <button
            onClick={() => setSelectedCategory('')}
            className={`rounded-full px-3 py-1 text-sm font-semibold transition ${
              selectedCategory === '' ? 'bg-orange text-white' : 'bg-white/60 text-ink/70'
            }`}
          >
            Wszystkie
          </button>
          {(Object.keys(CATEGORY_LABELS) as BookCategory[]).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-3 py-1 text-sm font-semibold transition ${
                selectedCategory === category ? 'bg-orange text-white' : 'bg-white/60 text-ink/70'
              }`}
            >
              {CATEGORY_LABELS[category]}
            </button>
          ))}
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <p className="mt-12 text-center text-ink/60">
          Nie znaleźliśmy jeszcze książek w tej kategorii — zajrzyj tu niedługo!
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

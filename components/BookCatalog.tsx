'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import BookCard from '@/components/BookCard';
import {
  AGE_GROUPS,
  AUDIENCE_LABELS,
  CATEGORY_LABELS,
  type Book,
  type BookAudience,
  type BookCategory,
} from '@/data/books';

export default function BookCatalog({ books }: { books: Book[] }) {
  const searchParams = useSearchParams();
  const initialAge = searchParams.get('wiek') ?? '';
  const initialAudience = (searchParams.get('grupa') as BookAudience | null) ?? '';

  const [selectedAge, setSelectedAge] = useState<string>(initialAge);
  const [selectedAudience, setSelectedAudience] = useState<BookAudience | ''>(initialAudience);
  const [selectedCategory, setSelectedCategory] = useState<BookCategory | ''>('');
  const showAgeFilter = selectedAudience === 'dzieci';

  const availableCategories = useMemo(() => {
    const present = new Set(
      books
        .filter((book) => selectedAudience === '' || book.audience === selectedAudience)
        .map((book) => book.category),
    );
    return (Object.keys(CATEGORY_LABELS) as BookCategory[]).filter((category) =>
      present.has(category),
    );
  }, [books, selectedAudience]);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const ageMatch = selectedAge === '' || book.ageRange === selectedAge;
      const audienceMatch = selectedAudience === '' || book.audience === selectedAudience;
      const categoryMatch = selectedCategory === '' || book.category === selectedCategory;
      return ageMatch && audienceMatch && categoryMatch;
    });
  }, [books, selectedAge, selectedAudience, selectedCategory]);

  return (
    <div>
      <div className="rounded-2xl border border-ink/10 bg-paper-dark p-4 sm:p-5">
        <span className="text-xs font-bold uppercase tracking-wide text-navy/70">Dla kogo:</span>
        <div className="mt-3 flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              setSelectedAudience('');
              setSelectedAge('');
              setSelectedCategory('');
            }}
            className={`rounded-full px-5 py-2.5 text-base font-bold transition ${
              selectedAudience === ''
                ? 'bg-navy text-white shadow-cover'
                : 'bg-white text-ink/80 hover:bg-white/80'
            }`}
          >
            Wszystkie
          </button>
          {(Object.keys(AUDIENCE_LABELS) as BookAudience[]).map((audience) => (
            <button
              key={audience}
              onClick={() => {
                setSelectedAudience(audience);
                if (audience !== 'dzieci') {
                  setSelectedAge('');
                }
                setSelectedCategory('');
              }}
              className={`rounded-full px-5 py-2.5 text-base font-bold transition ${
                selectedAudience === audience
                  ? 'bg-navy text-white shadow-cover'
                  : 'bg-white text-ink/80 hover:bg-white/80'
              }`}
            >
              {AUDIENCE_LABELS[audience]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
        <div
          className={`grid w-full transition-[grid-template-rows] duration-300 ease-in-out ${
            showAgeFilter ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div
            className={`flex flex-wrap items-center gap-2 overflow-hidden transition-opacity duration-150 ${
              showAgeFilter ? 'opacity-100' : 'opacity-0'
            }`}
          >
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
        </div>
        <div
          className={`grid w-full transition-[grid-template-rows] duration-300 ease-in-out ${
            availableCategories.length > 0 ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div
            className={`flex flex-wrap items-center gap-2 overflow-hidden transition-opacity duration-150 ${
              availableCategories.length > 0 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="text-sm font-semibold text-ink/70">Kategoria:</span>
            <button
              onClick={() => setSelectedCategory('')}
              className={`rounded-full px-3 py-1 text-sm font-semibold transition ${
                selectedCategory === '' ? 'bg-orange text-white' : 'bg-white/60 text-ink/70'
              }`}
            >
              Wszystkie
            </button>
            {availableCategories.map((category) => (
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

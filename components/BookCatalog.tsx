'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import BookCard from '@/components/BookCard';
import {
  AGE_GROUPS,
  AUDIENCE_LABELS,
  BOOK_LANGS,
  CATEGORY_LABELS,
  LANG_LABELS,
  type Book,
  type BookAudience,
  type BookCategory,
  type BookLang,
} from '@/data/books';
import { CATALOG_STRINGS, type SiteLang } from '@/lib/catalog-i18n';

export default function BookCatalog({
  books,
  siteLang = 'pl',
}: {
  books: Book[];
  siteLang?: SiteLang;
}) {
  const t = CATALOG_STRINGS[siteLang];
  const searchParams = useSearchParams();
  const initialAge = searchParams.get('wiek') ?? '';
  const initialAudience = (searchParams.get('grupa') as BookAudience | null) ?? '';

  const [selectedAge, setSelectedAge] = useState<string>(initialAge);
  const [selectedAudience, setSelectedAudience] = useState<BookAudience | ''>(initialAudience);
  const [selectedCategory, setSelectedCategory] = useState<BookCategory | ''>('');
  // Domyślnie pokazujemy tylko książki w języku danej wersji strony. Jeśli
  // w tym języku nie ma jeszcze żadnej (np. wersja EN), pokazujemy wszystkie.
  const [selectedLangs, setSelectedLangs] = useState<BookLang[]>(() =>
    books.some((book) => book.lang === siteLang)
      ? [siteLang]
      : BOOK_LANGS.filter((lang) => books.some((book) => book.lang === lang)),
  );
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const showAgeFilter = selectedAudience === 'dzieci';

  // Zamykamy listę języków kliknięciem obok lub Escape.
  useEffect(() => {
    if (!langMenuOpen) {
      return;
    }
    const handlePointerDown = (event: MouseEvent) => {
      if (!langMenuRef.current?.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [langMenuOpen]);

  const toggleLang = (lang: BookLang) => {
    const next = selectedLangs.includes(lang)
      ? // Zawsze zostawiamy przynajmniej jeden zaznaczony język.
        selectedLangs.length === 1
        ? selectedLangs
        : selectedLangs.filter((item) => item !== lang)
      : [...selectedLangs, lang];

    if (next === selectedLangs) {
      return;
    }

    // Wiek i kategoria wybrane wcześniej mogą nie istnieć w nowym zestawie
    // języków — wtedy znikają z listy przycisków, ale dalej by filtrowały.
    const remaining = books.filter((book) => next.includes(book.lang));
    if (selectedAge !== '' && !remaining.some((book) => book.ageRange === selectedAge)) {
      setSelectedAge('');
    }
    if (
      selectedCategory !== '' &&
      !remaining.some((book) => book.category === selectedCategory)
    ) {
      setSelectedCategory('');
    }
    setSelectedLangs(next);
  };

  // Języki, w których w ogóle mamy jakieś książki — resztę chowamy.
  const availableLangs = useMemo(() => {
    const present = new Set(books.map((book) => book.lang));
    return BOOK_LANGS.filter((lang) => present.has(lang) || lang === siteLang);
  }, [books, siteLang]);

  const langBooks = useMemo(
    () => books.filter((book) => selectedLangs.includes(book.lang)),
    [books, selectedLangs],
  );

  const availableAges = useMemo(() => {
    const present = new Set(
      langBooks
        .filter((book) => selectedAudience === '' || book.audience === selectedAudience)
        .map((book) => book.ageRange),
    );
    return AGE_GROUPS.filter((age) => present.has(age));
  }, [langBooks, selectedAudience]);

  const availableCategories = useMemo(() => {
    const present = new Set(
      langBooks
        .filter((book) => selectedAudience === '' || book.audience === selectedAudience)
        .map((book) => book.category),
    );
    return (Object.keys(CATEGORY_LABELS) as BookCategory[]).filter((category) =>
      present.has(category),
    );
  }, [langBooks, selectedAudience]);

  const filteredBooks = useMemo(() => {
    return langBooks.filter((book) => {
      const ageMatch = selectedAge === '' || book.ageRange === selectedAge;
      const audienceMatch = selectedAudience === '' || book.audience === selectedAudience;
      const categoryMatch = selectedCategory === '' || book.category === selectedCategory;
      return ageMatch && audienceMatch && categoryMatch;
    });
  }, [langBooks, selectedAge, selectedAudience, selectedCategory]);

  return (
    <div>
      <div className="rounded-2xl border border-ink/10 bg-paper-dark p-4 sm:p-5">
        <span className="text-xs font-bold uppercase tracking-wide text-navy/70">{t.audienceHeading}</span>
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
            {t.all}
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
              {t.audienceLabels[audience]}
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
            <span className="text-sm font-semibold text-ink/70">{t.age}</span>
            <button
              onClick={() => setSelectedAge('')}
              className={`rounded-full px-3 py-1 text-sm font-semibold transition ${
                selectedAge === '' ? 'bg-navy text-white' : 'bg-white/60 text-ink/70'
              }`}
            >
              {t.all}
            </button>
            {availableAges.map((age) => (
              <button
                key={age}
                onClick={() => setSelectedAge(age)}
                className={`rounded-full px-3 py-1 text-sm font-semibold transition ${
                  selectedAge === age ? 'bg-navy text-white' : 'bg-white/60 text-ink/70'
                }`}
              >
                {t.ageLabels[age]}
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
            <span className="text-sm font-semibold text-ink/70">{t.category}</span>
            <button
              onClick={() => setSelectedCategory('')}
              className={`rounded-full px-3 py-1 text-sm font-semibold transition ${
                selectedCategory === '' ? 'bg-orange text-white' : 'bg-white/60 text-ink/70'
              }`}
            >
              {t.all}
            </button>
            {availableCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-3 py-1 text-sm font-semibold transition ${
                  selectedCategory === category ? 'bg-orange text-white' : 'bg-white/60 text-ink/70'
                }`}
              >
                {t.categoryLabels[category]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 text-xs text-ink/50">
        <span>{t.bookLanguage}</span>
        <div className="relative" ref={langMenuRef}>
          <button
            type="button"
            aria-haspopup="true"
            aria-expanded={langMenuOpen}
            onClick={() => setLangMenuOpen((open) => !open)}
            className="flex items-center gap-1.5 rounded-full border border-ink/15 px-2.5 py-0.5 font-semibold tracking-wide text-ink/60 transition hover:border-ink/30 hover:text-ink/80"
          >
            {selectedLangs
              .slice()
              .sort((a, b) => BOOK_LANGS.indexOf(a) - BOOK_LANGS.indexOf(b))
              .map((lang) => LANG_LABELS[lang])
              .join(', ')}
            <svg
              viewBox="0 0 12 12"
              className={`h-2.5 w-2.5 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M2.5 4.5 6 8l3.5-3.5" />
            </svg>
          </button>
          {langMenuOpen && (
            <div className="absolute left-0 top-full z-20 mt-1.5 min-w-[8rem] rounded-xl border border-ink/10 bg-white p-1 shadow-cover">
              {availableLangs.map((lang) => {
                const active = selectedLangs.includes(lang);
                return (
                  <button
                    key={lang}
                    type="button"
                    role="menuitemcheckbox"
                    aria-checked={active}
                    onClick={() => toggleLang(lang)}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs font-semibold text-ink/70 transition hover:bg-paper-dark"
                  >
                    <span
                      className={`flex h-3.5 w-3.5 items-center justify-center rounded border transition ${
                        active ? 'border-navy bg-navy text-white' : 'border-ink/25 text-transparent'
                      }`}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2.5 6.5 5 9l4.5-5" />
                      </svg>
                    </span>
                    {LANG_LABELS[lang]}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <p className="mt-12 text-center text-ink/60">
          {t.empty}
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => (
            <BookCard key={book.slug} book={book} siteLang={siteLang} />
          ))}
        </div>
      )}
    </div>
  );
}

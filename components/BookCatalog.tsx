'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
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
import { SERIES } from '@/data/series';

export default function BookCatalog({
  books,
  siteLang = 'pl',
}: {
  books: Book[];
  siteLang?: SiteLang;
}) {
  const t = CATALOG_STRINGS[siteLang];
  const [selectedAge, setSelectedAge] = useState<string>('');
  const [selectedAudience, setSelectedAudience] = useState<BookAudience | ''>('');
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

  // Filtry z adresu (?grupa=, ?wiek=) czytamy dopiero w przeglądarce. Dzięki
  // temu statyczny HTML zawiera pełną listę książek, widoczną dla robotów —
  // useSearchParams() wymagałby <Suspense> i eksport zawierałby pusty katalog.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSelectedAge(params.get('wiek') ?? '');
    setSelectedAudience((params.get('grupa') as BookAudience | null) ?? '');
  }, []);

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
      <div className="border-b border-ink/10 pb-6">
        <span className="text-xs font-bold uppercase tracking-wide text-navy/70">{t.audienceHeading}</span>
        <div className="no-scrollbar -mx-4 mt-3 flex items-center gap-2.5 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          <button
            onClick={() => {
              setSelectedAudience('');
              setSelectedAge('');
              setSelectedCategory('');
            }}
            className={`shrink-0 whitespace-nowrap rounded-md border px-4 py-2 text-[0.95rem] font-semibold transition ${
              selectedAudience === ''
                ? 'border-navy bg-navy text-white'
                : 'border-ink/15 text-ink/80 hover:border-ink/40'
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
              className={`shrink-0 whitespace-nowrap rounded-md border px-4 py-2 text-[0.95rem] font-semibold transition ${
                selectedAudience === audience
                  ? 'bg-navy text-white'
                  : 'bg-white text-ink/80 ring-1 ring-ink/10 hover:ring-ink/25'
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
              className={`rounded-md border px-3 py-1 text-sm font-medium transition ${
                selectedAge === '' ? 'border-navy bg-navy text-white' : 'border-ink/15 text-ink/80 hover:border-ink/40'
              }`}
            >
              {t.all}
            </button>
            {availableAges.map((age) => (
              <button
                key={age}
                onClick={() => setSelectedAge(age)}
                className={`rounded-md border px-3 py-1 text-sm font-medium transition ${
                  selectedAge === age ? 'border-navy bg-navy text-white' : 'border-ink/15 text-ink/80 hover:border-ink/40'
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
              className={`rounded-md border px-3 py-1 text-sm font-medium transition ${
                selectedCategory === '' ? 'border-navy bg-navy text-white' : 'border-ink/15 text-ink/80 hover:border-ink/40'
              }`}
            >
              {t.all}
            </button>
            {availableCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-md border px-3 py-1 text-sm font-medium transition ${
                  selectedCategory === category ? 'border-navy bg-navy text-white' : 'border-ink/15 text-ink/80 hover:border-ink/40'
                }`}
              >
                {t.categoryLabels[category]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 text-xs text-ink/70">
        <span>{t.bookLanguage}</span>
        <div className="relative" ref={langMenuRef}>
          <button
            type="button"
            aria-haspopup="true"
            aria-expanded={langMenuOpen}
            onClick={() => setLangMenuOpen((open) => !open)}
            className="flex items-center gap-1.5 rounded-md border border-ink/15 px-2.5 py-0.5 font-semibold tracking-wide text-ink/80 transition hover:border-ink/40"
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
        // Książki pogrupowane w serie (data/series.ts); serie bez książek po
        // filtrowaniu znikają. Kotwica #<seria> pozwala linkować do sekcji.
        <div className="mt-6 space-y-16 sm:space-y-20">
          {SERIES.map(({ id, text }) => {
            const inSeries = filteredBooks.filter((book) => book.series === id);
            if (inSeries.length === 0) return null;
            return (
              <section key={id} id={id} className="scroll-mt-8 border-t border-ink/10 pt-8 sm:pt-10">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                  <h2 className="font-display text-2xl font-700 text-navy sm:text-3xl">{text[siteLang].name}</h2>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink/70">
                    {t.seriesCount(inSeries.length)}
                  </p>
                </div>
                <p className="mt-2 max-w-2xl text-ink/70">{text[siteLang].description}</p>
                <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-12 sm:mt-10 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-4">
                  {inSeries.map((book) => (
                    <BookCard key={book.slug} book={book} siteLang={siteLang} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

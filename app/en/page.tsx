import type { Metadata } from 'next';
import Link from 'next/link';
import AudienceLinksEn from '@/components/AudienceLinksEn';
import BookCard from '@/components/BookCard';
import HeroFan from '@/components/HeroFan';
import { getBookBySlug } from '@/data/books';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  alternates: {
    languages: {
      pl: `${SITE_URL}/pl`,
      de: `${SITE_URL}/de`,
      en: `${SITE_URL}/en`,
    },
  },
};

// Nie mamy jeszcze angielskich tytułów — pokazujemy przekrój polskich
// i niemieckich (karty mają znacznik języka, strona książki — adnotację).
// Kolejność w wachlarzu: pierwsza z przodu, druga po prawej, ostatnia po lewej.
const HERO_SLUGS = [
  'sudoku-300-zagadek-200',
  'meine-ersten-wortsuchratsel-stufe-1',
  'znajdz-slowko-poziom-latwy',
  'sudoku-duzym-drukiem-100',
  'meine-ersten-wortsuchratsel-stufe-2',
  'zdobywca-szczytow',
];

function IconPencil() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M4 20l1-4.5L15.5 5 19 8.5 8.5 19 4 20z" />
      <path d="M13 7l3.5 3.5" />
    </svg>
  );
}

function IconBrain() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M9 4a3 3 0 00-3 3 3 3 0 00-1.5 5.6A3 3 0 007 17a3 3 0 003 3V4z" />
      <path d="M15 4a3 3 0 013 3 3 3 0 011.5 5.6A3 3 0 0117 17a3 3 0 01-3 3V4z" />
    </svg>
  );
}

function IconMoon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5z" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M12 20s-7-4.4-9.5-9C0.8 7.4 2.6 4 6 4c2 0 3.5 1.2 4 2.5.5-1.3 2-2.5 4-2.5 3.4 0 5.2 3.4 3.5 7-2.5 4.6-9.5 9-9.5 9z" />
    </svg>
  );
}

function DoodleStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2l2.2 6.6H21l-5.4 4 2.1 6.6L12 15.2l-5.7 4.2 2.1-6.6L3 8.6h6.8L12 2z" />
    </svg>
  );
}

function DoodleSparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
      <path d="M12 2v5M12 17v5M2 12h5M17 12h5M5 5l3.5 3.5M15.5 15.5L19 19M19 5l-3.5 3.5M8.5 15.5L5 19" />
    </svg>
  );
}

function SquiggleUnderline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 14" fill="none" preserveAspectRatio="none" className={className}>
      <path
        d="M2 9c20-9 30 4 50-2s30-8 50-2 30 6 50 0 30-6 46 1"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function HomePageEn() {
  const heroBooks = HERO_SLUGS.flatMap((slug) => {
    const book = getBookBySlug(slug);
    return book ? [book] : [];
  });

  return (
    <>
      <section className="notebook-grid relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
        <div className="relative mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <span className="relative inline-block animate-fade-up">
              <DoodleSparkle className="absolute -left-5 -top-5 h-6 w-6 text-orange/70" />
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-700 text-ink/70 shadow-cover">
                For kids and adults
              </span>
            </span>

            <h1 className="animate-fade-up mt-6 font-display text-3xl font-800 leading-tight text-navy sm:text-5xl [animation-delay:150ms]">
              Puzzles that pull you in
              <br />
              at{' '}
              <span className="relative inline-block text-orange">
                any age
                <SquiggleUnderline className="absolute -bottom-2 left-0 h-3 w-full text-orange" />
              </span>
            </h1>

            <p className="animate-fade-up mx-auto mt-6 max-w-md text-base leading-relaxed text-ink/80 sm:text-lg lg:mx-0 [animation-delay:250ms]">
              Puzzles that train your brain and give you a break from the screen —
              for everyone who loves a challenge.
            </p>

            <div className="animate-fade-up relative mt-8 flex flex-col items-center gap-3 lg:items-start [animation-delay:300ms]">
              <Link
                href="/en/books"
                className="inline-flex items-center gap-2 rounded-full bg-orange px-8 py-3 text-base font-bold text-white shadow-cover transition hover:bg-orange/90"
              >
                Browse books
                <span aria-hidden="true">→</span>
              </Link>
              <span className="text-sm font-semibold text-ink/70">
                English titles are on the way — for now our books are in Polish and German.
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xs lg:mx-0 lg:max-w-sm">
            <DoodleStar className="absolute -left-6 -top-6 hidden h-6 w-6 rotate-[-15deg] text-orange/70 sm:block" />
            <DoodleStar className="absolute -bottom-2 -left-8 hidden h-4 w-4 rotate-[10deg] text-orange/50 sm:block" />
            <DoodleSparkle className="absolute -right-7 top-8 hidden h-7 w-7 text-yellow-500/60 sm:block" />

            {/* miękki cień na „podłodze" */}
            <div className="absolute inset-x-8 -bottom-3 h-8 rounded-full bg-ink/15 blur-2xl" aria-hidden="true" />

            <HeroFan
              lang="en"
              books={heroBooks.map(({ slug, title, subtitle, coverImage }) => ({ slug, title, subtitle, coverImage }))}
            />
          </div>
        </div>
      </section>

      <section className="relative px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-2xl font-700 text-navy sm:text-3xl">
            Find something for you
          </h2>
          <div className="mt-10">
            <AudienceLinksEn />
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-paper-dark px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-2xl font-700 text-navy sm:text-3xl">
            Featured books
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {heroBooks.map((book) => (
              <BookCard key={book.slug} book={book} siteLang="en" />
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-white px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[280px_1fr] lg:items-start lg:gap-16">
          <div className="text-center lg:text-left">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100 text-2xl lg:mx-0">
              <span aria-hidden="true">🙂</span>
            </div>
            <h2 className="mt-4 font-display text-2xl font-700 leading-snug text-navy sm:text-3xl">
              Why your brain
              <br />
              <span className="relative inline-block">
                loves puzzles
                <SquiggleUnderline className="absolute -bottom-2 left-0 h-2.5 w-full text-green" />
              </span>
            </h2>
          </div>

          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                <IconPencil />
              </div>
              <h3 className="mt-3 font-display text-base font-700 text-navy">Better focus</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink/70">
                Solving puzzles regularly improves your ability to concentrate.
              </p>
            </div>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-light text-green">
                <IconBrain />
              </div>
              <h3 className="mt-3 font-display text-base font-700 text-navy">A fit mind</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink/70">
                Puzzles train memory and logical thinking and keep your mind sharp.
              </p>
            </div>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                <IconMoon />
              </div>
              <h3 className="mt-3 font-display text-base font-700 text-navy">Time to unwind</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink/70">
                Focusing on one task calms you down and gives you distance from constant noise.
              </p>
            </div>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                <IconHeart />
              </div>
              <h3 className="mt-3 font-display text-base font-700 text-navy">Pure fun</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink/70">
                Perfect for travel, a rainy evening or a quick break during the day.
              </p>
            </div>
          </div>
        </div>
        {/* falista krawędź — przejście do stopki */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-10 w-full text-paper-dark sm:h-14"
        >
          <path
            d="M0 30c120 20 240 20 360 0s240-20 360 0 240 20 360 0 240-20 360 0v30H0V30z"
            fill="currentColor"
          />
        </svg>
      </section>
    </>
  );
}

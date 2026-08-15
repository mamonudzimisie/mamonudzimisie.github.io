import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import BookCard from '@/components/BookCard';
import AudienceLinks from '@/components/AudienceLinks';
import { getFeaturedBooks } from '@/data/books';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  alternates: {
    languages: {
      pl: `${SITE_URL}/pl`,
      de: `${SITE_URL}/de`,
    },
  },
};

function IconPencil() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M4 20l1-4.5L15.5 5 19 8.5 8.5 19 4 20z" />
      <path d="M13 7l3.5 3.5" />
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

function DoodleHeart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 20s-7-4.4-9.5-9C0.8 7.4 2.6 4 6 4c2 0 3.5 1.2 4 2.5.5-1.3 2-2.5 4-2.5 3.4 0 5.2 3.4 3.5 7-2.5 4.6-9.5 9-9.5 9z" />
    </svg>
  );
}

function DoodleDashedCircle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 4" className={className}>
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function DoodlePencilSmall({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 20l1-4.5L15.5 5 19 8.5 8.5 19 4 20z" />
      <path d="M13 7l3.5 3.5" />
    </svg>
  );
}

function DoodleSwirl({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className}>
      <path d="M4 8c2-4 8-4 9 0s-3 6-6 4 1-7 5-6 6 5 3 8" />
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

function IconSmiley({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 10.5h.01M15.5 10.5h.01" />
      <path d="M8 14.5c1.2 1.4 2.6 2 4 2s2.8-.6 4-2" />
    </svg>
  );
}

function IconBrain({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 4a3 3 0 00-3 3 3 3 0 00-1.5 5.6A3 3 0 007 17a3 3 0 003 3V4z" />
      <path d="M15 4a3 3 0 013 3 3 3 0 011.5 5.6A3 3 0 0117 17a3 3 0 01-3 3V4z" />
    </svg>
  );
}

function IconMoon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className ?? 'h-6 w-6'}>
      <path d="M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5z" />
    </svg>
  );
}

function IconShield({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export default function HomePage() {
  const featuredBooks = getFeaturedBooks();

  return (
    <>
      <section className="notebook-grid relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
        {/* rozproszone, wyciszone doodle w tle */}
        <DoodleHeart className="pointer-events-none absolute right-[8%] top-[14%] hidden h-8 w-8 rotate-[8deg] text-orange/25 lg:block" />
        <DoodleDashedCircle className="pointer-events-none absolute left-[42%] top-[38%] hidden h-16 w-16 text-green/25 lg:block" />
        <DoodlePencilSmall className="pointer-events-none absolute bottom-[16%] right-[6%] hidden h-10 w-10 rotate-[25deg] text-navy/20 lg:block" />
        <DoodleSwirl className="pointer-events-none absolute bottom-[22%] left-[46%] hidden h-9 w-9 text-green/20 lg:block" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-[4%] top-[4%] hidden font-display text-6xl font-800 text-navy/10 lg:block"
        >
          B
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[8%] left-[38%] hidden font-display text-5xl font-800 text-orange/10 lg:block"
        >
          W
        </span>

        <div className="relative mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <span className="relative inline-block animate-fade-up">
              <DoodleSparkle className="absolute -left-5 -top-5 h-6 w-6 text-orange/70" />
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-700 text-ink/70 shadow-cover">
                Dla dzieci i dorosłych
              </span>
            </span>

            <h1 className="animate-fade-up mt-6 font-display text-3xl font-800 leading-tight text-navy sm:text-5xl [animation-delay:150ms]">
              Łamigłówki, które wciągają
              <br />
              w{' '}
              <span className="relative inline-block text-orange">
                każdym wieku
                <SquiggleUnderline className="absolute -bottom-2 left-0 h-3 w-full text-orange" />
              </span>
            </h1>

            <p className="animate-fade-up mx-auto mt-6 max-w-md text-base leading-relaxed text-ink/80 sm:text-lg lg:mx-0 [animation-delay:250ms]">
              Zagadki, które trenują głowę i dają oddech od ekranu — dla każdego,
              kto lubi wyzwania.
            </p>

            <div className="animate-fade-up relative mt-8 flex flex-col items-center gap-3 lg:items-start [animation-delay:300ms]">
              <Link
                href="/pl/books"
                className="inline-flex items-center gap-2 rounded-full bg-orange px-8 py-3 text-base font-bold text-white shadow-cover transition hover:bg-orange/90"
              >
                Zobacz książki
                <span aria-hidden="true">→</span>
              </Link>
              <span className="relative inline-block">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink/70">
                  Znajdź coś dla siebie
                </span>
                <Image
                  src="/doodles/loop.png"
                  alt=""
                  width={120}
                  height={80}
                  className="pointer-events-none absolute -right-14 -top-1 hidden h-8 w-12 sm:block"
                />
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xs lg:mx-0 lg:max-w-sm">
            <DoodleStar className="absolute -left-6 -top-6 hidden h-6 w-6 rotate-[-15deg] text-orange/70 sm:block" />
            <DoodleStar className="absolute -bottom-2 -left-8 hidden h-4 w-4 rotate-[10deg] text-orange/50 sm:block" />
            <DoodleSparkle className="absolute -right-7 top-8 hidden h-7 w-7 text-yellow-500/60 sm:block" />

            {/* miękki cień na "podłodze" */}
            <div className="absolute inset-x-8 -bottom-3 h-8 rounded-full bg-ink/15 blur-2xl" aria-hidden="true" />

            {/* okładka w tle po lewej, dla dorosłych/trudniejszy poziom */}
            <div className="absolute -left-10 top-10 z-0 w-[58%] -rotate-[16deg] rounded-2xl bg-white p-2 shadow-cover sm:-left-14">
              <Image
                src="/covers/znajdz-slowko-10.png"
                alt="Okładka łamigłówki, poziom trudny"
                width={600}
                height={800}
                className="w-full rounded-xl"
              />
            </div>

            {/* okładka w tle po prawej, starsze dzieci */}
            <div className="absolute -right-8 top-4 z-0 w-[54%] rotate-[18deg] rounded-2xl bg-white p-2 shadow-cover sm:-right-12">
              <Image
                src="/covers/znajdz-slowko-7-9.png"
                alt="Okładka książeczki dla starszych dzieci"
                width={600}
                height={800}
                className="w-full rounded-xl"
              />
            </div>

            <div className="relative z-10 mx-auto w-[62%] -rotate-2 rounded-2xl bg-white p-3 shadow-cover-lg transition hover:rotate-0">
              <Image
                src="/covers/znajdz-slowko-5-6.png"
                alt="Okładka książeczki Znajdź słówko!"
                width={600}
                height={800}
                priority
                className="w-full rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-2xl font-700 text-navy sm:text-3xl">
            Wybierz coś dla siebie
          </h2>
          <div className="mt-10">
            <AudienceLinks />
          </div>
        </div>
      </section>

      {featuredBooks.length > 0 && (
        <section className="border-y border-ink/10 bg-paper-dark px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center font-display text-2xl font-700 text-navy sm:text-3xl">
              Wyróżnione książki
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredBooks.map((book) => (
                <BookCard key={book.slug} book={book} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative bg-white px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[280px_1fr] lg:items-start lg:gap-16">
          <div className="text-center lg:text-left">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100 text-2xl lg:mx-0">
              <span aria-hidden="true">🙂</span>
            </div>
            <h2 className="mt-4 font-display text-2xl font-700 leading-snug text-navy sm:text-3xl">
              Dlaczego Twój mózg
              <br />
              lubi{' '}
              <span className="relative inline-block">
                łamigłówki?
                <SquiggleUnderline className="absolute -bottom-2 left-0 h-2.5 w-full text-green" />
              </span>
            </h2>
          </div>

          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                <IconPencil />
              </div>
              <h3 className="mt-3 font-display text-base font-700 text-navy">Lepsza koncentracja</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink/70">
                Regularne rozwiązywanie łamigłówek poprawia zdolność skupienia.
              </p>
            </div>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-light text-green">
                <IconBrain />
              </div>
              <h3 className="mt-3 font-display text-base font-700 text-navy">Sprawność umysłu</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink/70">
                Łamigłówki ćwiczą pamięć, logiczne myślenie i pomagają utrzymać umysł w formie.
              </p>
            </div>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                <IconMoon />
              </div>
              <h3 className="mt-3 font-display text-base font-700 text-navy">Wyciszenie</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink/70">
                Skupienie na jednym zadaniu wycisza i pozwala odpocząć od nadmiaru bodźców.
              </p>
            </div>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                <IconHeart />
              </div>
              <h3 className="mt-3 font-display text-base font-700 text-navy">Rozrywka</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink/70">
                Świetna zabawa w podróży, w deszczowy wieczór albo w przerwie w ciągu dnia.
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

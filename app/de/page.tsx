import type { Metadata } from 'next';
import AudienceLinksDe from '@/components/AudienceLinksDe';
import BookCard from '@/components/BookCard';
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

export default function HomePageDe() {
  const featuredBooks = getFeaturedBooks('de');

  return (
    <>
      <section className="notebook-grid relative overflow-hidden border-b border-ink/10 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <span className="animate-fade-up inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-700 text-ink/70 shadow-cover">
            Für Kinder und Erwachsene
          </span>

          <h1 className="animate-fade-up mt-6 font-display text-3xl font-800 leading-tight text-navy sm:text-5xl [animation-delay:150ms]">
            Rätsel, die in jedem Alter fesseln
          </h1>

          <p className="animate-fade-up mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink/80 sm:text-lg [animation-delay:250ms]">
            Rätsel, die den Kopf trainieren und für eine Pause vom Bildschirm sorgen —
            für alle, die Herausforderungen lieben.
          </p>
        </div>
      </section>

      <section className="relative px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-2xl font-700 text-navy sm:text-3xl">
            Wähle etwas für dich
          </h2>
          <div className="mt-10">
            <AudienceLinksDe />
          </div>
        </div>
      </section>

      {featuredBooks.length > 0 && (
        <section className="border-y border-ink/10 bg-paper-dark px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center font-display text-2xl font-700 text-navy sm:text-3xl">
              Empfohlene Bücher
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredBooks.map((book) => (
                <BookCard key={book.slug} book={book} siteLang="de" />
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
              Warum dein Gehirn
              <br />
              <span className="relative inline-block">
                Rätsel mag
                <SquiggleUnderline className="absolute -bottom-2 left-0 h-2.5 w-full text-green" />
              </span>
            </h2>
          </div>

          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                <IconPencil />
              </div>
              <h3 className="mt-3 font-display text-base font-700 text-navy">Bessere Konzentration</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink/70">
                Regelmäßiges Rätseln verbessert die Fähigkeit, sich zu konzentrieren.
              </p>
            </div>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-light text-green">
                <IconBrain />
              </div>
              <h3 className="mt-3 font-display text-base font-700 text-navy">Geistige Fitness</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink/70">
                Rätsel trainieren Gedächtnis und logisches Denken und halten den Kopf fit.
              </p>
            </div>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                <IconMoon />
              </div>
              <h3 className="mt-3 font-display text-base font-700 text-navy">Zur Ruhe kommen</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink/70">
                Sich auf eine Aufgabe zu konzentrieren beruhigt und schafft Abstand von der Reizflut.
              </p>
            </div>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                <IconHeart />
              </div>
              <h3 className="mt-3 font-display text-base font-700 text-navy">Unterhaltung</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink/70">
                Perfekt für unterwegs, für einen verregneten Abend oder eine Pause zwischendurch.
              </p>
            </div>
          </div>
        </div>
        {/* wellige Kante — Übergang zur Fußzeile */}
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

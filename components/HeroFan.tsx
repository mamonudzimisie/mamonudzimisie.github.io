'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

export type HeroFanBook = {
  slug: string;
  title: string;
  subtitle: string;
  coverImage: string;
};

type FanLang = 'pl' | 'de' | 'en';

const LABELS: Record<
  FanLang,
  {
    carousel: string;
    region: string;
    cover: (label: string) => string;
    open: (label: string) => string;
    show: (label: string) => string;
    dot: (n: number, count: number, title: string) => string;
    prev: string;
    next: string;
  }
> = {
  pl: {
    carousel: 'karuzela',
    region: 'Polecane książki',
    cover: (label) => `Okładka: ${label}`,
    open: (label) => `Zobacz książkę: ${label}`,
    show: (label) => `Pokaż: ${label}`,
    dot: (n, count, title) => `Pokaż książkę ${n} z ${count}: ${title}`,
    prev: 'Poprzednia książka',
    next: 'Następna książka',
  },
  de: {
    carousel: 'Karussell',
    region: 'Empfohlene Bücher',
    cover: (label) => `Buchcover: ${label}`,
    open: (label) => `Buch ansehen: ${label}`,
    show: (label) => `Anzeigen: ${label}`,
    dot: (n, count, title) => `Buch ${n} von ${count} anzeigen: ${title}`,
    prev: 'Vorheriges Buch',
    next: 'Nächstes Buch',
  },
  en: {
    carousel: 'carousel',
    region: 'Featured books',
    cover: (label) => `Cover: ${label}`,
    open: (label) => `See book: ${label}`,
    show: (label) => `Show: ${label}`,
    dot: (n, count, title) => `Show book ${n} of ${count}: ${title}`,
    prev: 'Previous book',
    next: 'Next book',
  },
};

// Pozycje w wachlarzu względem okładki z przodu: 0 = przód, 1 = prawa, -1 = lewa.
// Pozostałe okładki czekają schowane za przednią.
const POSITIONS: Record<string, { transform: string; z: number; opacity: number }> = {
  '0': { transform: 'translateX(-50%) rotate(-2deg) scale(1)', z: 30, opacity: 1 },
  '1': { transform: 'translateX(-8%) translateY(-4%) rotate(18deg) scale(0.88)', z: 20, opacity: 1 },
  '-1': { transform: 'translateX(-92%) translateY(5%) rotate(-16deg) scale(0.92)', z: 20, opacity: 1 },
  hidden: { transform: 'translateX(-50%) scale(0.7)', z: 0, opacity: 0 },
};

// Lekkie „odbicie” na końcu ruchu — okładka dochodzi na miejsce jak trzymana w ręce.
const SPRING = 'cubic-bezier(0.34, 1.3, 0.64, 1)';
const MAX_TILT = 6; // stopnie

export default function HeroFan({ books, lang = 'pl' }: { books: HeroFanBook[]; lang?: FanLang }) {
  const [front, setFront] = useState(0);
  const [tilt, setTilt] = useState(0);
  const touchX = useRef<number | null>(null);
  const count = books.length;
  const t = LABELS[lang];

  const go = (step: number) => setFront((i) => (i + step + count) % count);

  // Odległość okładki od przedniej, zawinięta do zakresu -n/2..n/2.
  const offset = (index: number) => {
    let d = (index - front + count) % count;
    if (d > count / 2) d -= count;
    return d;
  };

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription={t.carousel}
      aria-label={t.region}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
      // Przechył za kursorem — tylko myszka, dotyk zostawiamy w spokoju.
      onMouseMove={(e) => {
        const box = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - box.left) / box.width; // 0 = lewa krawędź, 1 = prawa
        setTilt((x - 0.5) * 2 * MAX_TILT);
      }}
      onMouseLeave={() => setTilt(0)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      {/* Rezerwuje wysokość wachlarza — okładki są pozycjonowane absolutnie. */}
      <div className="mx-auto aspect-[3/4] w-[62%]" aria-hidden="true" />

      {books.map((book, index) => {
        const d = offset(index);
        const pos = POSITIONS[String(d)] ?? POSITIONS.hidden;
        const isFront = d === 0;
        const label = `${book.title} — ${book.subtitle}`;
        const cover = (
          <Image
            src={book.coverImage}
            // Opis także dla okładek z tyłu — czytniki ekranu i tak je pomijają
            // (aria-hidden na kontenerze), a puste alt zgłaszają audyty SEO.
            alt={t.cover(label)}
            width={600}
            height={800}
            // Trzy widoczne okładki ładujemy od razu — leniwe ładowanie zostawiało
            // na moment puste miejsca po bokach. Reszta czeka na swoją kolej.
            {...(isFront
              ? { priority: true }
              : { loading: Math.abs(d) <= 1 ? ('eager' as const) : ('lazy' as const) })}
            className="w-full rounded-xl"
          />
        );

        return (
          <div
            key={book.slug}
            className={`absolute left-1/2 top-0 w-[62%] rounded-2xl bg-white shadow-cover transition-all duration-[600ms] motion-reduce:transition-none ${
              isFront ? 'p-3 shadow-cover-lg' : 'p-2 blur-[0.5px]'
            }`}
            style={{
              transform: isFront
                ? `translateX(-50%) rotate(${-2 + tilt}deg) scale(1)`
                : pos.transform,
              zIndex: pos.z,
              opacity: pos.opacity === 0 ? 0 : isFront ? 1 : 0.96,
              transitionTimingFunction: SPRING,
              pointerEvents: pos.opacity === 0 ? 'none' : undefined,
            }}
            aria-hidden={!isFront}
          >
            {isFront ? (
              <Link href={`/${lang}/books/${book.slug}`} aria-label={t.open(label)}>
                {cover}
                {/* Błysk po zmianie książki — key wymusza animację od nowa. */}
                <span
                  key={front}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-3 animate-cover-shine overflow-hidden rounded-xl motion-reduce:hidden"
                />
              </Link>
            ) : (
              <button
                type="button"
                tabIndex={-1}
                onClick={() => go(d)}
                className="block w-full cursor-pointer"
                aria-label={t.show(label)}
              >
                {cover}
              </button>
            )}
          </div>
        );
      })}

      {/* Strzałki i kropki wyraźnie widoczne — małe łatwo było przeoczyć. */}
      <div className="relative z-40 mt-8 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={t.prev}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-navy shadow-cover ring-1 ring-ink/10 transition hover:bg-orange hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          {books.map((book, index) => (
            <button
              key={book.slug}
              type="button"
              onClick={() => setFront(index)}
              aria-label={t.dot(index + 1, count, book.title)}
              aria-current={index === front}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === front ? 'w-7 bg-orange' : 'w-2.5 bg-ink/25 hover:bg-ink/45'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={t.next}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-navy shadow-cover ring-1 ring-ink/10 transition hover:bg-orange hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

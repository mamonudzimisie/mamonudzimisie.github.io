'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

export type HeroFanBook = {
  slug: string;
  title: string;
  subtitle: string;
  coverImage: string;};

// Pozycje w wachlarzu względem okładki z przodu: 0 = przód, 1 = prawa, -1 = lewa.
// Pozostałe okładki czekają schowane za przednią.
const POSITIONS: Record<string, { transform: string; z: number; opacity: number }> = {
  '0': { transform: 'translateX(-50%) rotate(-2deg) scale(1)', z: 30, opacity: 1 },
  '1': { transform: 'translateX(-8%) translateY(-4%) rotate(18deg) scale(0.88)', z: 20, opacity: 1 },
  '-1': { transform: 'translateX(-92%) translateY(5%) rotate(-16deg) scale(0.92)', z: 20, opacity: 1 },
  hidden: { transform: 'translateX(-50%) scale(0.7)', z: 0, opacity: 0 },
};

export default function HeroFan({ books }: { books: HeroFanBook[] }) {
  const [front, setFront] = useState(0);
  const touchX = useRef<number | null>(null);
  const count = books.length;

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
      aria-roledescription="karuzela"
      aria-label="Polecane książki"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
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
            alt={isFront ? `Okładka: ${label}` : ''}
            width={600}
            height={800}
            priority={index === 0}
            className="w-full rounded-xl"
          />
        );

        return (
          <div
            key={book.slug}
            className={`absolute left-1/2 top-0 w-[62%] rounded-2xl bg-white shadow-cover transition-all duration-500 ease-out motion-reduce:transition-none ${
              isFront ? 'p-3 shadow-cover-lg' : 'p-2'
            }`}
            style={{
              transform: pos.transform,
              zIndex: pos.z,
              opacity: pos.opacity,
              pointerEvents: pos.opacity === 0 ? 'none' : undefined,
            }}
            aria-hidden={!isFront}
          >
            {isFront ? (
              <Link href={`/pl/books/${book.slug}`} aria-label={`Zobacz książkę: ${label}`}>
                {cover}
              </Link>
            ) : (
              <button
                type="button"
                tabIndex={-1}
                onClick={() => go(d)}
                className="block w-full cursor-pointer"
                aria-label={`Pokaż: ${label}`}
              >
                {cover}
              </button>
            )}
          </div>
        );
      })}

      <div className="relative z-40 mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Poprzednia książka"
          className="flex h-7 w-7 items-center justify-center rounded-full text-ink/35 transition hover:text-orange"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <div className="flex items-center gap-1.5">
          {books.map((book, index) => (
            <button
              key={book.slug}
              type="button"
              onClick={() => setFront(index)}
              aria-label={`Pokaż książkę ${index + 1} z ${count}: ${book.title}`}
              aria-current={index === front}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === front ? 'w-5 bg-orange' : 'w-2 bg-ink/20 hover:bg-ink/40'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Następna książka"
          className="flex h-7 w-7 items-center justify-center rounded-full text-ink/35 transition hover:text-orange"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CATALOG_STRINGS, type SiteLang } from '@/lib/catalog-i18n';

export function IconEye({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// Przycisk „Zajrzyj do środka” z podglądem kilku stron książki na stronie.
export default function SamplePreview({
  pages,
  bookTitle,
  amazonUrl,
  siteLang,
  variant = 'button',
}: {
  pages: string[];
  bookTitle: string;
  amazonUrl: string;
  siteLang: SiteLang;
  // 'button' — sam przycisk „Zajrzyj do środka”; 'strip' — pasek miniatur stron
  // widoczny od razu, kliknięcie otwiera ten sam podgląd na wybranej stronie.
  variant?: 'button' | 'strip';
}) {
  const t = CATALOG_STRINGS[siteLang];
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const last = pages.length - 1;
  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(() => setIndex((i) => Math.min(last, i + 1)), [last]);
  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, close, prev, next]);

  const navBtn =
    'absolute top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-2xl font-bold text-navy shadow-cover transition hover:bg-white disabled:pointer-events-none disabled:opacity-0 z-10';

  // Podgląd jak w otwartej książce: przy nieparzystej liczbie stron pierwsza
  // stoi sama (jak prawa strona po otwarciu okładki), dalej pary stron.
  const spreads: number[][] = [];
  for (let i = pages.length % 2; i < pages.length; i += 2) spreads.push([i, i + 1]);
  if (pages.length % 2) spreads.unshift([0]);

  const stripRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const updateArrows = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);
  useEffect(() => {
    updateArrows();
    window.addEventListener('resize', updateArrows);
    return () => window.removeEventListener('resize', updateArrows);
  }, [updateArrows]);
  const scrollStrip = (dir: 1 | -1) => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <>
      {variant === 'strip' ? (
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <h2 className="font-display text-2xl font-800 text-navy">{t.detail.lookInside}</h2>
            <p className="text-sm text-ink/60">{t.detail.sampleHint}</p>
          </div>
          <div className="relative mt-5">
            <ul
              ref={stripRef}
              onScroll={updateArrows}
              className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-6 overflow-x-auto px-4 pb-10 pt-2 sm:mx-0 sm:scroll-px-1 sm:px-1"
            >
              {spreads.map((spread) => (
                <li key={spread[0]} className="shrink-0 snap-start">
                  <button
                    type="button"
                    onClick={(e) => {
                      triggerRef.current = e.currentTarget;
                      setIndex(spread[0]);
                      setOpen(true);
                    }}
                    className="flex rounded-md bg-white p-1.5 shadow-cover transition hover:-translate-y-1"
                    aria-label={`${t.detail.lookInside}: ${t.detail.samplePage(spread[0] + 1, pages.length)}`}
                  >
                    {spread.map((i, k) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={i}
                        src={pages[i]}
                        alt=""
                        loading="lazy"
                        className={`aspect-[17/22] h-[13rem] w-auto object-cover sm:h-[20rem] ${
                          spread.length === 2 ? (k === 0 ? 'rounded-l-sm border-r border-navy/10' : 'rounded-r-sm') : 'rounded-sm'
                        }`}
                      />
                    ))}
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => scrollStrip(-1)}
              disabled={!canPrev}
              aria-label={t.detail.samplePrev}
              className={`${navBtn} !top-[calc(50%-1rem)] left-0 sm:-left-5`}
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => scrollStrip(1)}
              disabled={!canNext}
              aria-label={t.detail.sampleNext}
              className={`${navBtn} !top-[calc(50%-1rem)] right-0 sm:-right-5`}
            >
              ›
            </button>
          </div>
        </div>
      ) : (
      <button
        ref={triggerRef}
        type="button"
        onClick={(e) => {
          triggerRef.current = e.currentTarget;
          setIndex(0);
          setOpen(true);
        }}
        className="inline-flex items-center gap-2 text-sm font-semibold text-ink/70 underline decoration-dotted decoration-ink/40 underline-offset-4 hover:text-orange"
      >
        <IconEye className="h-4 w-4" />
        {t.detail.lookInside}
      </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${t.detail.lookInside}: ${bookTitle}`}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy/90 px-4 py-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label={t.detail.sampleClose}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-2xl leading-none text-navy hover:bg-white"
          >
            ×
          </button>

          <div
            className="relative flex max-h-[calc(100vh-9rem)] w-full max-w-2xl justify-center"
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (dx > 40) prev();
              else if (dx < -40) next();
              touchX.current = null;
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pages[index]}
              alt={`${bookTitle} — ${t.detail.samplePage(index + 1, pages.length)}`}
              className="max-h-[calc(100vh-9rem)] w-auto rounded-md bg-white object-contain shadow-cover"
            />
            <button type="button" onClick={prev} disabled={index === 0} aria-label={t.detail.samplePrev} className={`${navBtn} left-0 sm:-left-14`}>
              ‹
            </button>
            <button type="button" onClick={next} disabled={index === last} aria-label={t.detail.sampleNext} className={`${navBtn} right-0 sm:-right-14`}>
              ›
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <p className="text-sm font-semibold text-white/80" aria-live="polite">
              {t.detail.samplePage(index + 1, pages.length)}
            </p>
            {amazonUrl && (
              <a
                href={amazonUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-block rounded-full bg-orange px-6 py-2 text-sm font-bold text-white transition hover:bg-orange/90"
              >
                {t.card.buy}
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}

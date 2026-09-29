import type { Metadata } from 'next';
import Link from 'next/link';
import { downloadSets } from '@/data/downloads';
import { getBookBySlug } from '@/data/books';
import { SITE_URL } from '@/lib/site';

const TITLE = 'Wykreślanki do druku dla dzieci – materiały do pobrania';
const DESCRIPTION =
  'Darmowe wykreślanki do wydrukowania dla dzieci 5–7 lat. Jesienne i halloweenowe plansze z rozwiązaniami w PDF – do użytku w domu, przedszkolu i szkole.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/pl/materialy` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/og/pl.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export default function MaterialyPage() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-3xl font-800 text-navy sm:text-4xl">
          Materiały do pobrania
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink/70">
          Masz ochotę sprawdzić, czy wykreślanki spodobają się dziecku? Pobierz darmowe
          plansze, wydrukuj i usiądźcie razem z kredkami. Śmiało kopiuj je dla rodzeństwa,
          przedszkola albo całej klasy.
        </p>

        <div className="mt-10 space-y-6">
          {downloadSets.map((set) => (
            <article key={set.slug} className="rounded-lg bg-white/70 p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h2 className="font-display text-2xl font-800 text-navy">{set.title}</h2>
                {set.isNew && (
                  <span className="rounded-full bg-orange-light px-3 py-0.5 text-xs font-bold text-orange">
                    Nowość
                  </span>
                )}
              </div>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink/75">{set.description}</p>

              <ul className="mt-4 divide-y divide-navy/10 border-t border-navy/10">
                {set.variants.map((variant) => {
                  const book = variant.bookSlug ? getBookBySlug(variant.bookSlug) : undefined;
                  return (
                    <li
                      key={variant.pdf}
                      className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3"
                    >
                      <span className="w-20 shrink-0 rounded-full bg-navy px-3 py-1 text-center text-xs font-bold text-white">
                        {variant.level}
                      </span>
                      <span className="min-w-0 flex-1 basis-56 text-sm text-ink/80">
                        {variant.note}
                        {book && (
                          <>
                            {' · '}
                            <Link
                              href={`/pl/books/${book.slug}`}
                              className="font-semibold text-navy underline underline-offset-4 hover:text-orange"
                            >
                              więcej w książce
                            </Link>
                          </>
                        )}
                      </span>
                      <a
                        href={variant.pdf}
                        download
                        aria-label={`Pobierz PDF: ${set.title}, ${variant.level}`}
                        className="inline-flex items-baseline gap-2 rounded-full bg-orange px-5 py-2 text-sm font-bold text-white shadow-cover transition hover:bg-orange/90"
                      >
                        Pobierz PDF
                        <span className="text-xs font-semibold text-white/80">
                          {variant.pages} stron
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { downloads } from '@/data/downloads';
import { getBookBySlug } from '@/data/books';
import { SITE_URL } from '@/lib/site';

const TITLE = 'Wykreślanki do druku dla dzieci – materiały do pobrania';
const DESCRIPTION =
  'Darmowe wykreślanki do wydrukowania dla dzieci 5–7 lat. Jesienne plansze z rozwiązaniami w PDF – do użytku w domu, przedszkolu i szkole.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/pl/materialy` },
  openGraph: { title: TITLE, description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export default function MaterialyPage() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-3xl font-800 text-navy sm:text-4xl">
          Materiały do pobrania
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink/70">
          Masz ochotę sprawdzić, czy wykreślanki spodobają się dziecku? Pobierz darmowe
          plansze, wydrukuj i usiądźcie razem z kredkami. Śmiało kopiuj je dla rodzeństwa,
          przedszkola albo całej klasy.
        </p>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {downloads.map((item) => {
            const book = item.bookSlug ? getBookBySlug(item.bookSlug) : undefined;
            return (
              <li key={item.slug} className="flex gap-5 rounded-lg bg-white/70 p-5">
                <a href={item.pdf} download className="shrink-0" tabIndex={-1} aria-hidden="true">
                  <Image
                    src={item.thumbnail}
                    alt=""
                    width={120}
                    height={155}
                    unoptimized
                    className="w-24 rounded border border-navy/10 bg-white shadow-cover sm:w-28"
                  />
                </a>
                <div className="flex flex-col">
                  <p className="inline-block self-start rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">
                    {item.level}
                  </p>
                  <h2 className="mt-2 font-display text-xl font-800 text-navy">{item.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-ink/75">{item.description}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4">
                    <a
                      href={item.pdf}
                      download
                      className="inline-block rounded-full bg-orange px-5 py-2 text-sm font-bold text-white shadow-cover transition hover:bg-orange/90"
                    >
                      Pobierz PDF
                    </a>
                    <span className="text-xs text-ink/60">{item.pages} stron</span>
                    {book && (
                      <Link
                        href={`/pl/books/${book.slug}`}
                        className="text-sm font-semibold text-navy underline underline-offset-4 hover:text-orange"
                      >
                        Więcej w książce →
                      </Link>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

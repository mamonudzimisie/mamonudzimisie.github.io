import type { Metadata } from 'next';
import Link from 'next/link';
import { downloadSetsEn } from '@/data/downloads';
import { getBookBySlug } from '@/data/books';
import { SITE_URL } from '@/lib/site';

const TITLE = 'Free Printable Large Print Sudoku – Easy Puzzles to Print';
const DESCRIPTION =
  'Free printable large print sudoku: easy puzzles with big grids and big digits, a short how-to-play guide and full solutions. PDF for home, senior centres and clubs.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/en/free-printables` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/og/en.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

// Layout and styling mirror the Polish page (app/pl/materialy/page.tsx).
export default function FreePrintablesPage() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-3xl font-800 text-navy sm:text-4xl">Free printables</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink/70">
          Want to see whether our puzzles are for you? Download a free set, print it at home and
          grab a pencil. Feel free to copy it for family, friends, a senior centre or a club.
        </p>

        <div className="mt-10 space-y-6">
          {downloadSetsEn.map((set) => (
            <article key={set.slug} className="rounded-lg bg-white/70 p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h2 className="font-display text-2xl font-800 text-navy">{set.title}</h2>
                {set.isNew && (
                  <span className="rounded-full bg-orange-light px-3 py-0.5 text-xs font-bold text-orange">
                    New
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
                      <span className="shrink-0 rounded-full bg-navy px-3 py-1 text-center text-xs font-bold text-white">
                        {variant.level}
                      </span>
                      <span className="min-w-0 flex-1 basis-56 text-sm text-ink/80">
                        {variant.note}
                        {book && (
                          <>
                            {' · '}
                            <Link
                              href={`/en/books/${book.slug}`}
                              className="font-semibold text-navy underline underline-offset-4 hover:text-orange"
                            >
                              the full book for beginners
                            </Link>
                          </>
                        )}
                      </span>
                      <a
                        href={variant.pdf}
                        download
                        aria-label={`Download PDF: ${set.title}, ${variant.level}`}
                        className="inline-flex items-baseline gap-2 rounded-full bg-orange px-5 py-2 text-sm font-bold text-white shadow-cover transition hover:bg-orange/90"
                      >
                        Download PDF
                        <span className="text-xs font-semibold text-white/80">
                          {variant.pages} pages
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

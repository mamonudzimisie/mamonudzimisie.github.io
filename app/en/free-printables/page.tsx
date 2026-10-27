import type { Metadata } from 'next';
import Link from 'next/link';
import { downloadSetsEn } from '@/data/downloads';
import { getBookBySlug } from '@/data/books';
import { SITE_URL } from '@/lib/site';
import { downloadPreview } from '@/lib/downloadPreview';

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
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-3xl font-800 text-navy sm:text-4xl">Free printables</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink/70">
          Want to see whether our puzzles are for you? Download a free set, print it at home and
          grab a pencil. Feel free to copy it for family, friends, a senior centre or a club.
        </p>

        <div className="mt-10 space-y-6">
          {downloadSetsEn.map((set) => (
            <article
              key={set.slug}
              className="grid gap-6 rounded-lg bg-paper-soft p-5 sm:grid-cols-[10rem_1fr] sm:p-7 lg:grid-cols-[13rem_1fr] lg:gap-10"
            >
              {downloadPreview(set) && (
                <div className="mx-auto w-32 sm:mx-0 sm:w-full" aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={downloadPreview(set)}
                    alt=""
                    loading="lazy"
                    className="aspect-[17/22] w-full rotate-[-2deg] rounded-[3px] bg-white object-cover p-1 shadow-cover"
                  />
                </div>
              )}
              <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h2 className="font-display text-2xl font-800 text-navy">{set.title}</h2>
                {set.isNew && (
                  <span className="rounded bg-orange-light px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wider text-orange-ink">
                    New
                  </span>
                )}
              </div>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink/75">{set.description}</p>

              <ul className="mt-4 divide-y divide-navy/10 border-t border-navy/10">
                {set.variants.map((variant, variantIndex) => {
                  const book = variant.bookSlug ? getBookBySlug(variant.bookSlug) : undefined;
                  return (
                    <li
                      key={variant.pdf}
                      className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3"
                    >
                      <span className="shrink-0 rounded border border-navy/25 px-2.5 py-1 text-center text-[0.7rem] font-semibold uppercase tracking-wider text-navy">
                        {variant.level}
                      </span>
                      <span className="min-w-0 flex-1 basis-56 text-sm text-ink/80">
                        {variant.note}
                        {book && (
                          <>
                            {' · '}
                            <Link
                              href={`/en/books/${book.slug}`}
                              className="font-semibold text-navy underline underline-offset-4 hover:text-orange-ink"
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
                        className={`inline-flex items-baseline gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition ${
                          variantIndex === 0
                            ? 'bg-orange text-white hover:bg-orange/90'
                            : 'border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white'
                        }`}
                      >
                        Download PDF
                        <span className="text-xs font-semibold opacity-80">
                          {variant.pages} pages
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

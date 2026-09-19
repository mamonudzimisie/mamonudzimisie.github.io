import Image from 'next/image';
import Link from 'next/link';
import { LANG_LABELS, getBookBySlug, type Book } from '@/data/books';
import { CATALOG_STRINGS, type SiteLang } from '@/lib/catalog-i18n';
import { SITE_URL } from '@/lib/site';
import SamplePreview, { IconEye } from '@/components/SamplePreview';

export default function BookDetail({ book, siteLang }: { book: Book; siteLang: SiteLang }) {
  const t = CATALOG_STRINGS[siteLang];
  const levelLinks = book.forWhom
    ? (
        [
          [book.forWhom.easier, t.detail.easierLevel],
          [book.forWhom.harder, t.detail.harderLevel],
        ] as const
      ).flatMap(([slug, label]) => {
        const other = slug ? getBookBySlug(slug) : undefined;
        return other ? [{ book: other, label }] : [];
      })
    : [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: book.title,
    description: book.description,
    inLanguage: book.lang,
    image: `${SITE_URL}${book.coverImage}`,
    brand: {
      '@type': 'Brand',
      name: 'ZALKA BOOKS',
    },
    ...(book.comingSoon
      ? {}
      : {
          offers: {
            '@type': 'Offer',
            url: book.amazonUrl,
            availability: 'https://schema.org/InStock',
          },
        }),
  };

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16">
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-2">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[23.25rem]">
          <div
            className="absolute inset-0 translate-x-[10px] translate-y-3 rotate-[1deg] rounded-lg bg-white/90"
            aria-hidden="true"
          />
          <div className="book-cover-frame absolute inset-0 overflow-hidden rounded-lg border-[5px] border-white/80 rotate-[0.4deg]">
            <Image
              src={book.coverImage}
              alt={t.card.coverAlt(book.title)}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="inline-block rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">
              {t.ageLabels[book.ageRange as keyof typeof t.ageLabels] ?? book.ageRange}
            </p>
            <p className="inline-block rounded-full border border-navy/25 px-3 py-1 text-xs font-bold text-navy/70">
              {t.detail.language}: {t.langNames[book.lang]} ({LANG_LABELS[book.lang]})
            </p>
          </div>
          <h1 lang={book.lang} className="mt-4 font-display text-3xl font-800 text-navy sm:text-4xl">
            {book.title}
          </h1>
          <p lang={book.lang} className="mt-1 text-lg text-ink/70">
            {book.detailSubtitle ?? book.subtitle}
          </p>
          <p className="mt-2 text-sm font-semibold text-orange">
            {t.categoryLabels[book.category]}
          </p>
          {/* Opisu i tytułu nie tłumaczymy — czytelnik ma wiedzieć, w jakim
              języku są zagadki. Zamiast tego wyraźna adnotacja. */}
          {book.lang !== siteLang && (
            <p className="mt-6 rounded-md border-l-[3px] border-orange bg-orange-light/60 px-4 py-3 text-sm text-ink/80">
              {t.detail.foreignLanguageNote(t.langNames[book.lang])}
            </p>
          )}

          <p lang={book.lang} className="mt-6 leading-relaxed text-ink/80">
            {book.description}
          </p>

          <ul lang={book.lang} className="mt-6 space-y-2">
            {book.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-ink/80">
                <span className="mt-0.5 text-green">✓</span>
                {feature}
              </li>
            ))}
          </ul>

          <dl className="relative mt-6 grid grid-cols-1 divide-y divide-navy/[0.08] rounded-md bg-white/[0.32] sm:grid-cols-2 sm:divide-y-0">
            <div className="px-5 py-[15px]">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.04em] text-navy/[0.62]">
                {t.detail.format}
              </dt>
              <dd className="mt-[6px] text-[18px] font-bold text-navy">21,6 × 27,9 cm</dd>
              <p className="mt-[5px] text-[12.5px] text-ink/[0.58]">
                {book.formatInches} · {t.detail.formatNote}
              </p>
            </div>
            <div className="px-5 py-[15px]">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.04em] text-navy/[0.62]">
                {t.detail.volume}
              </dt>
              <dd className="mt-[6px] text-[18px] font-bold text-navy">
                {t.detail.pages(book.pageCount)}
              </dd>
              <p className="mt-[5px] text-[12.5px] text-ink/[0.58]">{t.detail.binding}</p>
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[60%] w-px -translate-x-1/2 -translate-y-1/2 bg-navy/[0.08] sm:block"
            />
          </dl>

          <div className="mt-8">
            {book.comingSoon ? (
              <span className="inline-block rounded-full bg-orange-light px-6 py-3 text-sm font-bold text-orange">
                {t.detail.comingSoon}
              </span>
            ) : (
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-block rounded-full bg-orange px-8 py-3 text-base font-bold text-white shadow-cover transition hover:bg-orange/90"
                >
                  {t.card.buy}
                </a>
                {book.samplePages?.length ? (
                  <SamplePreview
                    pages={book.samplePages}
                    bookTitle={book.title}
                    amazonUrl={book.amazonUrl}
                    siteLang={siteLang}
                  />
                ) : (
                  <a
                    href={book.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-ink/70 underline decoration-dotted decoration-ink/40 underline-offset-4 hover:text-orange"
                  >
                    <IconEye className="h-4 w-4" />
                    {t.detail.lookInside}
                  </a>
                )}
              </div>
            )}
          </div>

          <Link
            href={`/${siteLang}/books`}
            className="mt-8 inline-block text-sm font-semibold text-navy underline underline-offset-4 hover:text-orange"
          >
            {t.detail.backToCatalog}
          </Link>
        </div>
      </div>

      {book.forWhom && (
        <div className="mx-auto mt-14 max-w-5xl rounded-lg bg-white/[0.32] px-6 py-8 sm:px-10">
          <h2 className="font-display text-2xl font-800 text-navy">{t.detail.forWhom}</h2>
          <div lang={book.lang} className="mt-4 max-w-3xl space-y-3 leading-relaxed text-ink/80">
            {book.forWhom.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {levelLinks.length > 0 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {levelLinks.map(({ book: other, label }) => (
                <Link
                  key={other.slug}
                  href={`/${siteLang}/books/${other.slug}`}
                  className="group flex items-center gap-4 rounded-md bg-white/70 p-3 transition hover:bg-white"
                >
                  <div className="relative aspect-[3/4] w-16 shrink-0 overflow-hidden rounded border-2 border-white shadow-cover">
                    <Image
                      src={other.coverImage}
                      alt={t.card.coverAlt(other.title)}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.04em] text-navy/[0.62]">
                      {label}
                    </p>
                    <p lang={other.lang} className="mt-1 font-bold text-navy group-hover:text-orange">
                      {other.title} — {other.subtitle}
                    </p>
                    <p className="text-sm text-ink/70">
                      {t.ageLabels[other.ageRange as keyof typeof t.ageLabels] ?? other.ageRange}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

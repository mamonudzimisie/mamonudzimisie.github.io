import Image from 'next/image';
import Link from 'next/link';
import { LANG_LABELS, books, getBookBySlug, type Book } from '@/data/books';
import { CATALOG_STRINGS, canonicalBookHref, type SiteLang } from '@/lib/catalog-i18n';
import { SITE_URL } from '@/lib/site';
import SamplePreview, { IconEye } from '@/components/SamplePreview';
import BookCard from '@/components/BookCard';
import { COVER_TINTS } from '@/data/coverTints';

// Linia zaufania pod przyciskiem zakupu (bez opinii — tylko fakty o zakupie).
const TRUST: Record<SiteLang, string> = {
  pl: 'Bezpieczny zakup na Amazonie · wysyłka i zwroty przez Amazon',
  de: 'Sicher bei Amazon kaufen · Versand und Rückgabe über Amazon',
  en: 'Secure checkout on Amazon · shipping and returns by Amazon',
};

const RELATED_TITLE: Record<SiteLang, string> = {
  pl: 'Może Ci się też spodobać',
  de: 'Das könnte dir auch gefallen',
  en: 'You might also like',
};

// Trzy inne książki dla tej samej grupy: najpierw w języku strony, potem
// w języku tej książki, na końcu pozostałe. Bez zapowiedzi i bez tej samej.
function relatedBooks(book: Book, siteLang: SiteLang): Book[] {
  const pool = books.filter((b) => b.slug !== book.slug && !b.comingSoon);
  // Najpierw ten sam język strony i ta sama grupa, potem ten sam język i inna
  // grupa, dopiero na końcu inne języki — polecenia w obcym języku myliły.
  const rank = (b: Book) =>
    (b.lang === siteLang ? 0 : b.lang === book.lang ? 2 : 4) + (b.audience === book.audience ? 0 : 1);
  return [...pool].sort((a, b) => rank(a) - rank(b)).slice(0, 3);
}

// Format w calach w języku strony, a nie książki (np. polska książka na stronie DE → „Zoll”).
const INCH_UNIT: Record<SiteLang, string> = { pl: 'cala', de: 'Zoll', en: 'in' };

function localizedInches(formatInches: string, siteLang: SiteLang) {
  const [w, h] = formatInches.match(/\d+(?:[.,]\d+)?/g) ?? [];
  if (!w || !h) return formatInches;
  const num = (n: string) => (siteLang === 'en' ? n.replace(',', '.') : n.replace('.', ','));
  return `${num(w)} × ${num(h)} ${INCH_UNIT[siteLang]}`;
}

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

  // Samo Book, bez Product/Offer: Google wymaga w Offer ceny, a ceny na
  // Amazonie się zmieniają — nieaktualna cena jest gorsza niż jej brak.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: `${book.title} — ${book.subtitle}`,
    description: book.seo?.description ?? book.description,
    url: `${SITE_URL}${canonicalBookHref(book)}`,
    inLanguage: book.lang,
    bookFormat: `https://schema.org/${book.hardcover ? 'Hardcover' : 'Paperback'}`,
    numberOfPages: book.pageCount,
    ...(book.isbn ? { isbn: book.isbn } : {}),
    image: `${SITE_URL}${book.coverImage}`,
    publisher: {
      '@type': 'Organization',
      name: 'ZALKA BOOKS',
      url: SITE_URL,
    },
  };

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16">
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:gap-16">
        {/* Okładka na jasnym tle w odcieniu jej własnego koloru (data/coverTints.ts). */}
        <div
          className="flex items-center justify-center self-start rounded-xl px-[12%] py-[10%]"
          style={{ backgroundColor: COVER_TINTS[book.coverImage] ?? '#F6F2EC' }}
        >
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[23.25rem]">
          <div className="book-cover-frame absolute inset-0 overflow-hidden rounded-[1px_6px_6px_1px]">
            <Image
              src={book.coverImage}
              alt={t.card.coverAlt(book.title)}
              fill
              unoptimized
              className="object-cover"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/15 via-white/10 to-transparent"
            />
          </div>
        </div>
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="inline-block rounded border border-navy/25 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-navy">
              {t.categoryLabels[book.category]}
            </p>
            <p className="inline-block rounded border border-navy/25 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-navy">
              {t.ageLabels[book.ageRange as keyof typeof t.ageLabels] ?? book.ageRange}
            </p>
            <p className="inline-block rounded border border-navy/25 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-navy">
              {t.detail.language}: {t.langNames[book.lang]} ({LANG_LABELS[book.lang]})
            </p>
          </div>
          <h1 lang={book.lang} className="mt-4 font-display text-3xl font-800 text-navy sm:text-4xl">
            {book.title}
          </h1>
          <p lang={book.lang} className="mt-1 text-lg text-ink/70">
            {book.detailSubtitle ?? book.subtitle}
          </p>
          {/* Na telefonie przycisk zakupu od razu pod tytułem — główny jest ~1400 px niżej. */}
          {!book.comingSoon && (
            <a
              href={book.amazonUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-5 inline-block rounded-md bg-orange px-6 py-3 text-base font-semibold text-white transition hover:bg-orange/90 sm:hidden"
            >
              {t.card.buy}
            </a>
          )}
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

          <dl className="relative mt-6 grid grid-cols-1 divide-y divide-navy/[0.08] rounded-md bg-paper-soft sm:grid-cols-2 sm:divide-y-0">
            <div className="px-5 py-[15px]">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.04em] text-navy/[0.62]">
                {t.detail.format}
              </dt>
              <dd className="mt-[6px] text-[18px] font-bold text-navy">
                {book.hardcover ? '21 × 27,9 cm' : '21,6 × 27,9 cm'}
              </dd>
              <p className="mt-[5px] text-[12.5px] text-ink/[0.58]">
                {localizedInches(book.formatInches, siteLang)} ·{' '}
                {book.hardcover ? t.detail.formatNoteHardcover : t.detail.formatNote}
              </p>
            </div>
            <div className="px-5 py-[15px]">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.04em] text-navy/[0.62]">
                {t.detail.volume}
              </dt>
              <dd className="mt-[6px] text-[18px] font-bold text-navy">
                {t.detail.pages(book.pageCount)}
              </dd>
              <p className="mt-[5px] text-[12.5px] text-ink/[0.58]">
                {book.hardcover ? t.detail.bindingHardcover : t.detail.binding}
              </p>
            </div>
            {book.isbn && (
              <div className="px-5 py-[15px] sm:col-span-2 sm:border-t sm:border-navy/[0.08]">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.04em] text-navy/[0.62]">
                  ISBN
                </dt>
                <dd className="mt-[6px] text-[15px] font-bold text-navy">{book.isbn}</dd>
              </div>
            )}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[15px] hidden h-[60px] w-px -translate-x-1/2 bg-navy/[0.08] sm:block"
            />
          </dl>

          <div className="mt-8">
            {book.comingSoon ? (
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <span className="inline-block rounded-md bg-orange-light px-6 py-3 text-sm font-semibold text-orange">
                  {t.detail.comingSoon}
                </span>
                {/* przed premierą podgląd z własnych stron, bez przycisku „Kup” */}
                {book.samplePages?.length ? (
                  <SamplePreview
                    pages={book.samplePages}
                    bookTitle={book.title}
                    amazonUrl=""
                    siteLang={siteLang}
                  />
                ) : null}
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-block rounded-md bg-orange px-8 py-3.5 text-base font-semibold text-white transition hover:bg-orange/90"
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
                    className="inline-flex items-center gap-2 text-sm font-semibold text-ink/70 underline decoration-dotted decoration-ink/40 underline-offset-4 hover:text-orange-ink"
                  >
                    <IconEye className="h-4 w-4" />
                    {t.detail.lookInside}
                  </a>
                )}
              </div>
            )}
            {!book.comingSoon && (
              <p className="mt-4 flex items-center gap-2 text-xs text-ink/70">
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0 text-green" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 8.5 6.5 12 13 4.5" />
                </svg>
                {TRUST[siteLang]}
              </p>
            )}
          </div>

          <Link
            href={`/${siteLang}/books`}
            className="mt-8 inline-block text-sm font-semibold text-navy underline underline-offset-4 hover:text-orange-ink"
          >
            {t.detail.backToCatalog}
          </Link>
        </div>
      </div>

      {book.samplePages?.length ? (
        <div className="mx-auto mt-14 max-w-6xl border-t border-navy/[0.08] pt-10">
          <SamplePreview
            pages={book.samplePages}
            bookTitle={book.title}
            amazonUrl={book.comingSoon ? '' : book.amazonUrl}
            siteLang={siteLang}
            variant="strip"
          />
        </div>
      ) : null}

      {book.forWhom && (
        <div className="mx-auto mt-14 max-w-6xl border-t border-navy/[0.08] pt-10">
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
                  className="group flex items-center gap-4 rounded-md bg-paper-soft p-3 transition hover:bg-paper-soft-hover"
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
                    <p lang={other.lang} className="mt-1 font-bold text-navy group-hover:text-orange-ink">
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

      {relatedBooks(book, siteLang).length > 0 && (
        <div className="mx-auto mt-16 max-w-6xl border-t border-navy/[0.08] pt-10">
          <h2 className="font-display text-2xl font-800 text-navy sm:text-3xl">{RELATED_TITLE[siteLang]}</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 lg:grid-cols-3">
            {relatedBooks(book, siteLang).map((other) => (
              <BookCard key={other.slug} book={other} siteLang={siteLang} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

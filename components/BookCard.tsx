import Image from 'next/image';
import Link from 'next/link';
import { LANG_LABELS, type Book } from '@/data/books';
import { bookHref, CATALOG_STRINGS, type SiteLang } from '@/lib/catalog-i18n';

export default function BookCard({
  book,
  siteLang = 'pl',
}: {
  book: Book;
  siteLang?: SiteLang;
}) {
  const t = CATALOG_STRINGS[siteLang];
  const href = bookHref(book, siteLang);
  const title = book.cardTitle ?? book.title;

  // Okładka na gołym tle strony, pod nią tytuł i jedna linia metadanych.
  // Jeden główny link (szczegóły) i dyskretny link do Amazona — bez ściany
  // pomarańczowych przycisków w katalogu.
  const age = t.ageLabels[book.ageRange as keyof typeof t.ageLabels] ?? book.ageRange;
  const meta = [
    t.categoryLabels[book.category],
    age,
    book.hardcover ? t.detail.bindingHardcover : null,
    book.lang !== siteLang ? LANG_LABELS[book.lang] : null,
  ].filter(Boolean);

  return (
    <article className="group flex flex-col">
      <Link
        href={href}
        className="relative block overflow-hidden rounded-lg bg-[radial-gradient(120%_90%_at_50%_0%,#FBF5EC_0%,#EFE2D2_100%)] px-4 pb-6 pt-7 sm:px-8 sm:pb-9 sm:pt-10"
      >
        {/* miękki cień „półki” pod okładką */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-4 left-1/2 h-3 w-[60%] -translate-x-1/2 rounded-full bg-black/15 blur-md sm:bottom-7"
        />
        {book.comingSoon && (
          <span className="absolute right-3 top-3 z-10 rounded-sm bg-orange px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-white">
            {t.card.comingSoon}
          </span>
        )}
        <div className="relative mx-auto aspect-[3/4] w-[70%] max-w-[14rem] rounded-[5px] shadow-cover transition duration-300 group-hover:-translate-y-1.5 group-hover:shadow-cover-lg">
          <Image
            src={book.coverImage}
            alt={t.card.coverAlt(title)}
            fill
            unoptimized
            className="rounded-[5px] object-cover"
          />
          {/* lekki grzbiet: cień przy lewej krawędzi okładki */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-3 rounded-l-[5px] bg-gradient-to-r from-black/15 via-white/10 to-transparent"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col pt-4 sm:pt-5">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink/70 sm:text-[0.7rem] sm:tracking-[0.16em]">
          {meta.join(' · ')}
        </p>
        <h3 className="mt-2 font-display text-lg font-700 leading-snug text-navy sm:text-xl">
          <Link href={href} className="transition-colors hover:text-orange-ink">
            {title}
          </Link>
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-ink/70">{book.subtitle}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-1 pt-4 text-sm font-medium">
          <Link href={href} className="text-navy transition-colors hover:text-orange-ink">
            {t.card.details} <span aria-hidden="true">→</span>
          </Link>
          {!book.comingSoon && (
            <a
              href={book.amazonUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="text-orange-ink underline decoration-orange-ink/30 underline-offset-4 transition hover:decoration-orange-ink"
            >
              {t.card.buy}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

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
        className="relative block rounded-sm bg-paper-dark/70 px-8 pb-8 pt-10 transition-colors duration-300 group-hover:bg-paper-dark"
      >
        {book.comingSoon && (
          <span className="absolute right-3 top-3 z-10 rounded-sm bg-orange px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-white">
            {t.card.comingSoon}
          </span>
        )}
        <div className="relative mx-auto aspect-[3/4] w-[62%] max-w-[13rem] shadow-cover transition duration-300 group-hover:-translate-y-1.5 group-hover:shadow-cover-lg">
          <Image
            src={book.coverImage}
            alt={t.card.coverAlt(title)}
            fill
            unoptimized
            className="rounded-[2px] object-cover"
          />
          {/* lekki grzbiet: cień przy lewej krawędzi okładki */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-3 rounded-l-[2px] bg-gradient-to-r from-black/15 via-white/10 to-transparent"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col pt-5">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink/50">
          {meta.join(' · ')}
        </p>
        <h3 className="mt-2 font-display text-xl font-700 leading-snug text-navy">
          <Link href={href} className="transition-colors hover:text-orange">
            {title}
          </Link>
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-ink/65">{book.subtitle}</p>
        <div className="mt-auto flex items-center gap-5 pt-4 text-sm font-medium">
          <Link href={href} className="text-navy transition-colors hover:text-orange">
            {t.card.details} <span aria-hidden="true">→</span>
          </Link>
          {!book.comingSoon && (
            <a
              href={book.amazonUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="text-orange underline decoration-orange/30 underline-offset-4 transition hover:decoration-orange"
            >
              {t.card.buy}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

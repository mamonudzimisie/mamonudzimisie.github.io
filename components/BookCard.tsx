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

  // Jak u wydawnictw (Taschen, Dwie Siostry): okładka stoi wprost na tle
  // strony, z cieniem i grzbietem, wyrównana do wspólnej dolnej linii; pod nią
  // krótki, wyśrodkowany podpis. Jeden główny link (szczegóły) i dyskretny
  // link do Amazona — bez ściany przycisków w katalogu.
  const age = t.ageLabels[book.ageRange as keyof typeof t.ageLabels] ?? book.ageRange;
  const meta = [
    t.categoryLabels[book.category],
    age,
    book.hardcover ? t.detail.bindingHardcover : null,
    book.lang !== siteLang ? LANG_LABELS[book.lang] : null,
  ].filter(Boolean);

  return (
    <article className="group flex flex-col text-center">
      <Link href={href} className="relative flex aspect-[5/6] items-end justify-center px-[9%]">
        {book.comingSoon && (
          <span className="absolute left-1/2 top-0 z-10 -translate-x-1/2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-orange-ink">
            {t.card.comingSoon}
          </span>
        )}
        <span className="relative block w-full max-w-[13.5rem] transition duration-300 ease-out group-hover:-translate-y-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={book.coverImage}
            alt={t.card.coverAlt(title)}
            loading="lazy"
            className="block h-auto w-full rounded-[1px_4px_4px_1px] shadow-[0_1px_2px_rgba(31,42,72,0.12),0_14px_26px_-10px_rgba(31,42,72,0.32)] transition-shadow duration-300 group-hover:shadow-[0_1px_2px_rgba(31,42,72,0.12),0_22px_34px_-12px_rgba(31,42,72,0.38)]"
          />
          {/* grzbiet: cień i odblask przy lewej krawędzi */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-[5%] rounded-l-[1px] bg-gradient-to-r from-black/20 via-white/15 to-transparent"
          />
        </span>
      </Link>
      <div className="flex flex-1 flex-col items-center pt-5">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink/70 sm:text-[0.7rem]">
          {meta.join(' · ')}
        </p>
        <h3 className="mt-1.5 font-display text-lg font-700 leading-snug text-navy sm:text-xl">
          <Link href={href} className="transition-colors hover:text-orange-ink">
            {title}
          </Link>
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-ink/70">{book.subtitle}</p>
        <div className="mt-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-3 text-sm font-medium">
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

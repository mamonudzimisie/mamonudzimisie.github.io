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

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-ink/10 bg-white/50 transition duration-300 hover:border-ink/20 hover:bg-white/80">
      <Link href={href} className="relative block bg-paper-dark p-6">
        <span className="absolute left-4 top-4 z-10 flex items-center gap-1.5">
          <span className="rounded bg-navy px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-white">
            {t.ageLabels[book.ageRange as keyof typeof t.ageLabels] ?? book.ageRange}
          </span>
          {/* Znacznik języka pokazujemy tylko dla książek w innym języku niż wersja strony. */}
          {book.lang !== siteLang && (
            <span className="rounded border border-navy/25 bg-white/90 px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-navy/70">
              {LANG_LABELS[book.lang]}
            </span>
          )}
          {book.hardcover && (
            <span className="rounded bg-green px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-white">
              {t.detail.bindingHardcover}
            </span>
          )}
        </span>
        {book.comingSoon && (
          <span className="absolute right-4 top-4 z-10 rounded bg-orange px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-white">
            {t.card.comingSoon}
          </span>
        )}
        <div className="relative mx-auto aspect-[3/4] w-40 shadow-cover transition duration-300 group-hover:-translate-y-1 sm:w-44">
          <Image
            src={book.coverImage}
            alt={t.card.coverAlt(title)}
            fill
            unoptimized
            className="rounded-sm object-cover"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-xl font-700 leading-snug text-navy">{title}</h3>
        <p className="text-sm text-ink/70">
          <span className="font-semibold">{t.categoryLabels[book.category]}</span>
          {' · '}
          {book.subtitle}
        </p>
        <div className="mt-auto flex items-center gap-3 pt-4">
          <Link
            href={href}
            className="text-sm font-medium text-navy underline decoration-navy/25 underline-offset-4 transition hover:text-orange hover:decoration-orange"
          >
            {t.card.details}
          </Link>
          {!book.comingSoon && (
            <a
              href={book.amazonUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="ml-auto rounded-md bg-orange px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange/90"
            >
              {t.card.buy}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

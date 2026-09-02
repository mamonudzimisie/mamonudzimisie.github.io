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

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white/60 transition hover:-translate-y-1 hover:shadow-cover">
      <Link href={href} className="relative block bg-paper-dark p-6">
        <span className="absolute left-4 top-4 z-10 flex items-center gap-1.5">
          <span className="rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">
            {t.ageLabels[book.ageRange as keyof typeof t.ageLabels] ?? book.ageRange}
          </span>
          {/* Znacznik języka pokazujemy tylko dla książek w innym języku niż wersja strony. */}
          {book.lang !== siteLang && (
            <span className="rounded-full border border-navy/25 bg-white/90 px-2 py-1 text-xs font-bold tracking-wide text-navy/70">
              {LANG_LABELS[book.lang]}
            </span>
          )}
        </span>
        {book.comingSoon && (
          <span className="absolute right-4 top-4 z-10 rounded-full bg-orange px-3 py-1 text-xs font-bold text-white">
            {t.card.comingSoon}
          </span>
        )}
        <div className="relative mx-auto aspect-[3/4] w-40 shadow-cover sm:w-44">
          <Image
            src={book.coverImage}
            alt={t.card.coverAlt(book.title)}
            fill
            unoptimized
            className="rounded-md object-cover"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-xl font-700 text-navy">{book.title}</h3>
        <p className="text-sm text-ink/70">
          <span className="font-semibold">{t.categoryLabels[book.category]}</span>
          {' · '}
          {book.subtitle}
        </p>
        <div className="mt-auto flex items-center gap-3 pt-4">
          <Link
            href={href}
            className="text-sm font-semibold text-navy underline underline-offset-4 hover:text-orange"
          >
            {t.card.details}
          </Link>
          {!book.comingSoon && (
            <a
              href={book.amazonUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="ml-auto rounded-full bg-orange px-4 py-2 text-sm font-bold text-white transition hover:bg-orange/90"
            >
              {t.card.buy}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

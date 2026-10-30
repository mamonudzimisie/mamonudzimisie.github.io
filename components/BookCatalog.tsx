import Link from 'next/link';
import BookCard from '@/components/BookCard';
import { BOOK_LANGS, type Book } from '@/data/books';
import { CATALOG_STRINGS, type SiteLang } from '@/lib/catalog-i18n';
import { SERIES } from '@/data/series';

// Katalog bez filtrów: książki w języku strony, pogrupowane w serie
// (data/series.ts) w tej samej kolejności co drzwi na stronie głównej.
// Książki w innych językach są w katalogach pozostałych wersji strony —
// na dole tylko linki do nich. Kotwica #<seria> pozwala linkować do sekcji.
export default function BookCatalog({
  books,
  siteLang = 'pl',
}: {
  books: Book[];
  siteLang?: SiteLang;
}) {
  const t = CATALOG_STRINGS[siteLang];
  const ownBooks = books.filter((book) => book.lang === siteLang);
  const otherLangs = BOOK_LANGS.filter(
    (lang) => lang !== siteLang && books.some((book) => book.lang === lang),
  );

  return (
    <div>
      <div className="space-y-16 sm:space-y-20">
        {SERIES.map(({ id, text }) => {
          const inSeries = ownBooks.filter((book) => book.series === id);
          if (inSeries.length === 0) return null;
          return (
            <section key={id} id={id} className="scroll-mt-8 border-t border-ink/10 pt-8 sm:pt-10">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <h2 className="font-display text-2xl font-700 text-navy sm:text-3xl">{text[siteLang].name}</h2>
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink/70">
                  {t.seriesCount(inSeries.length)}
                </p>
              </div>
              <p className="mt-2 max-w-2xl text-ink/70">{text[siteLang].description}</p>
              <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-12 sm:mt-10 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-16 lg:grid-cols-4">
                {inSeries.map((book) => (
                  <BookCard key={book.slug} book={book} siteLang={siteLang} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {otherLangs.length > 0 && (
        <div className="mt-16 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-ink/10 pt-8 text-ink/70">
          <span>{t.otherLangs}</span>
          {otherLangs.map((lang) => (
            <Link
              key={lang}
              href={`/${lang}/books`}
              className="font-medium text-navy transition-colors hover:text-orange-ink"
            >
              {t.otherLangLinks[lang]} <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

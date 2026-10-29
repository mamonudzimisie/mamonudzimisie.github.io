import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BookDetail from '@/components/BookDetail';
import { books, getBookBySlug, getEditions } from '@/data/books';
import { canonicalBookHref, shouldIndexDetail } from '@/lib/catalog-i18n';
import { SITE_URL } from '@/lib/site';

const SECTION = 'en' as const;

// Każda książka ma stronę w obu sekcjach, żeby interfejs nie zmieniał języka
// pod użytkownikiem. Do indeksu trafia tylko wersja zgodna z językiem książki
// — patrz canonicalBookHref() w lib/catalog-i18n.ts.
export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const book = getBookBySlug(params.slug);
  if (!book) {
    return {};
  }
  const title = book.seo?.title ?? `${book.title} — ${book.subtitle}`;
  const description = book.seo?.description ?? book.description;
  const indexable = shouldIndexDetail(book, SECTION);
  // Poziomy obrazek 1200×630 ze scripts/make_og.py — pionowa okładka źle się przycina.
  const ogImage = `/og/books/${book.slug}.jpg`;
  // hreflang tylko na stronie indeksowanej: kopie w innych sekcjach mają
  // canonical do niej, więc i tak nie trafiają do wyników.
  const editions = indexable ? getEditions(book) : [];
  const languages = editions.length
    ? Object.fromEntries(editions.map((edition) => [edition.lang, `${SITE_URL}${canonicalBookHref(edition)}`]))
    : undefined;
  return {
    title,
    description,
    keywords: book.seo?.keywords,
    alternates: { canonical: `${SITE_URL}${canonicalBookHref(book)}`, languages },
    robots: indexable ? undefined : { index: false, follow: true },
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function BookPage({ params }: { params: { slug: string } }) {
  const book = getBookBySlug(params.slug);

  if (!book) {
    notFound();
  }

  return <BookDetail book={book} siteLang={SECTION} />;
}

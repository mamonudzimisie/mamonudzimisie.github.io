import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { books, getBookBySlug, CATEGORY_LABELS } from '@/data/books';

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const book = getBookBySlug(params.slug);
  if (!book) {
    return {};
  }
  return {
    title: `${book.title} — ${book.subtitle}`,
    description: book.description,
    openGraph: {
      title: `${book.title} — ${book.subtitle}`,
      description: book.description,
      images: [{ url: book.coverImage }],
    },
  };
}

export default function BookPage({ params }: { params: { slug: string } }) {
  const book = getBookBySlug(params.slug);

  if (!book) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: book.title,
    description: book.description,
    image: `https://mamonudzimisie.com${book.coverImage}`,
    brand: {
      '@type': 'Brand',
      name: 'Mamo, nudzi mi się!',
    },
    ...(book.comingSoon
      ? {}
      : {
          offers: {
            '@type': 'Offer',
            url: book.amazonUrl,
            availability: 'https://schema.org/InStock',
            priceCurrency: 'PLN',
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
        <div className="relative mx-auto aspect-[3/4] w-full max-w-sm">
          <Image
            src={book.coverImage}
            alt={`Okładka książki ${book.title}`}
            fill
            unoptimized
            className="rounded-md object-cover shadow-cover"
          />
        </div>
        <div>
          <p className="inline-block rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">
            {book.ageRange}
          </p>
          <h1 className="mt-4 font-display text-3xl font-800 text-navy sm:text-4xl">
            {book.title}
          </h1>
          <p className="mt-1 text-lg text-ink/70">{book.subtitle}</p>
          <p className="mt-2 text-sm font-semibold text-orange">
            {CATEGORY_LABELS[book.category]}
          </p>
          <p className="mt-6 leading-relaxed text-ink/80">{book.description}</p>

          <ul className="mt-6 space-y-2">
            {book.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-ink/80">
                <span className="mt-0.5 text-green">✓</span>
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            {book.comingSoon ? (
              <span className="inline-block rounded-full bg-orange-light px-6 py-3 text-sm font-bold text-orange">
                Ta książka wkrótce się pojawi
              </span>
            ) : (
              <a
                href={book.amazonUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-block rounded-full bg-orange px-8 py-3 text-base font-bold text-white shadow-cover transition hover:bg-orange/90"
              >
                Zobacz na Amazon
              </a>
            )}
          </div>

          <Link
            href="/ksiazki"
            className="mt-8 inline-block text-sm font-semibold text-navy underline underline-offset-4 hover:text-orange"
          >
            ← Wróć do katalogu
          </Link>
        </div>
      </div>
    </section>
  );
}

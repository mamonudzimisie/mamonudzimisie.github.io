import type { Metadata } from 'next';
import Link from 'next/link';
import BookCard from '@/components/BookCard';
import { getBookBySlug, type Book } from '@/data/books';
import type { Landing } from '@/data/landings';
import { SITE_URL } from '@/lib/site';

export function landingMetadata(landing: Landing): Metadata {
  const url = `${SITE_URL}/${landing.lang}/${landing.slug}`;
  const ogImage = `/og/${landing.lang}.jpg`;
  return {
    title: landing.seoTitle,
    description: landing.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      title: landing.seoTitle,
      description: landing.seoDescription,
      url,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: landing.seoTitle,
      description: landing.seoDescription,
      images: [ogImage],
    },
  };
}

// Strona docelowa pod frazę: wstęp, książki (karty jak w katalogu), „jak
// wybrać”, FAQ i linki do wpisów. Treść w data/landings.ts.
export default function LandingPage({ landing }: { landing: Landing }) {
  const landingBooks = landing.bookSlugs
    .map((slug) => getBookBySlug(slug))
    .filter((book): book is Book => Boolean(book && !book.comingSoon));
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: landing.faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-ink">{landing.eyebrow}</p>
        <h1 className="mt-3 font-display text-3xl font-800 text-navy sm:text-4xl">{landing.h1}</h1>
        <div className="mt-5 max-w-3xl space-y-4 leading-relaxed text-ink/80">
          {landing.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <h2 className="mt-14 font-display text-2xl font-800 text-navy sm:text-3xl">{landing.booksHeading}</h2>
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 sm:gap-x-8 lg:grid-cols-4">
          {landingBooks.map((book) => (
            <BookCard key={book.slug} book={book} siteLang={landing.lang} />
          ))}
        </div>

        <div className="mt-16 max-w-3xl space-y-12">
          {landing.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-display text-2xl font-800 text-navy">{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-4 leading-relaxed text-ink/80">
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-ink/80 marker:text-orange">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div>
            <h2 className="font-display text-2xl font-800 text-navy">{landing.faqHeading}</h2>
            <dl className="mt-4 divide-y divide-navy/10 border-y border-navy/10">
              {landing.faq.map(({ q, a }) => (
                <div key={q} className="py-4">
                  <dt className="font-semibold text-navy">{q}</dt>
                  <dd className="mt-1 leading-relaxed text-ink/80">{a}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="font-display text-2xl font-800 text-navy">{landing.linksHeading}</h2>
            <ul className="mt-4 space-y-2">
              {landing.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-semibold text-navy underline underline-offset-4 hover:text-orange-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

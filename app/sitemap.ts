import type { MetadataRoute } from 'next';
import { books } from '@/data/books';
import { canonicalBookHref } from '@/lib/catalog-i18n';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '/pl',
    '/pl/books',
    '/pl/about',
    '/de',
    '/de/books',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  // Tylko wersja kanoniczna — bliźniacza sekcja ma noindex.
  const bookRoutes = books.map((book) => ({
    url: `${SITE_URL}${canonicalBookHref(book)}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...bookRoutes];
}

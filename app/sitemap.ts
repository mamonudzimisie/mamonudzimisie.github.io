import type { MetadataRoute } from 'next';
import { books } from '@/data/books';
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

  const bookRoutes = books.map((book) => ({
    url: `${SITE_URL}/pl/books/${book.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...bookRoutes];
}

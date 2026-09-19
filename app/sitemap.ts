import type { MetadataRoute } from 'next';
import { books } from '@/data/books';
import { getAllPosts } from '@/data/posts';
import { canonicalBookHref } from '@/lib/catalog-i18n';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '/pl',
    '/pl/books',
    '/pl/about',
    '/pl/materialy',
    '/de',
    '/de/books',
    '/pl/blog',
    '/de/blog',
    '/en',
    '/en/books',
    '/en/blog',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  // Tylko wersja kanoniczna — bliźniacza sekcja ma noindex.
  const bookRoutes = books.map((book) => ({
    url: `${SITE_URL}${canonicalBookHref(book)}`,
    lastModified: new Date(),
  }));

  const postRoutes = getAllPosts().map((post) => ({
    url: `${SITE_URL}/${post.lang}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticRoutes, ...bookRoutes, ...postRoutes];
}

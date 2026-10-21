import type { MetadataRoute } from 'next';
import { books } from '@/data/books';
import { getAllPosts, getPosts } from '@/data/posts';
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
    '/en',
    '/en/books',
    '/en/free-printables',
    // Pusty blog to „thin content” — lista trafia do sitemapy dopiero z pierwszym wpisem.
    ...(['pl', 'de', 'en'] as const).filter((lang) => getPosts(lang).length > 0).map((lang) => `/${lang}/blog`),
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

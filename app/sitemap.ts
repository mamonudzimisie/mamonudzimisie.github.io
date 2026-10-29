import type { MetadataRoute } from 'next';
import { books } from '@/data/books';
import { landings } from '@/data/landings';
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
    ...landings.map((landing) => `/${landing.lang}/${landing.slug}`),
    // Pusty blog to „thin content” — lista trafia do sitemapy dopiero z pierwszym wpisem.
    ...(['pl', 'de', 'en'] as const).filter((lang) => getPosts(lang).length > 0).map((lang) => `/${lang}/blog`),
  ].map((route) => ({ url: `${SITE_URL}${route}` }));

  // Tylko wersja kanoniczna — bliźniacza sekcja ma noindex.
  // Bez lastModified: data budowania przy każdym wdrożeniu ogłaszałaby, że wszystko
  // się zmieniło, a Google uczy się takie daty ignorować. Prawdziwe daty mają tylko wpisy.
  const bookRoutes = books.map((book) => ({ url: `${SITE_URL}${canonicalBookHref(book)}` }));

  const postRoutes = getAllPosts().map((post) => ({
    url: `${SITE_URL}/${post.lang}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticRoutes, ...bookRoutes, ...postRoutes];
}

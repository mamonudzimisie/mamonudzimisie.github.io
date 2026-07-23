import type { MetadataRoute } from 'next';
import { books } from '@/data/books';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/ksiazki', '/o-nas', '/blog', '/blog/zabawy-bez-ekranu-dla-5-latka'].map(
    (route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
    }),
  );

  const bookRoutes = books.map((book) => ({
    url: `${SITE_URL}/ksiazki/${book.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...bookRoutes];
}

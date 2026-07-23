import type { MetadataRoute } from 'next';
import { books } from '@/data/books';

const siteUrl = 'https://zalkabooks.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/ksiazki', '/o-nas', '/blog', '/blog/zabawy-bez-ekranu-dla-5-latka'].map(
    (route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
    }),
  );

  const bookRoutes = books.map((book) => ({
    url: `${siteUrl}/ksiazki/${book.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...bookRoutes];
}

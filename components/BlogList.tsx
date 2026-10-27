import Link from 'next/link';
import { getPosts, type PostLang } from '@/data/posts';

const TEXT = {
  pl: { heading: 'Blog', empty: 'Wkrótce pojawią się tu pierwsze wpisy.', more: 'Czytaj', locale: 'pl-PL' },
  de: { heading: 'Blog', empty: 'Die ersten Beiträge folgen bald.', more: 'Lesen', locale: 'de-DE' },
  en: { heading: 'Blog', empty: 'Our first posts are coming soon.', more: 'Read', locale: 'en-GB' },
};

export function formatPostDate(date: string, lang: PostLang) {
  return new Date(date).toLocaleDateString(TEXT[lang].locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogList({ lang }: { lang: PostLang }) {
  const t = TEXT[lang];
  const posts = getPosts(lang);

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-4xl font-800 text-navy sm:text-5xl">{t.heading}</h1>
        {posts.length === 0 ? (
          <p className="mt-6 text-ink/80">{t.empty}</p>
        ) : (
          <ul className="mt-12 grid gap-x-10 gap-y-14 sm:grid-cols-2">
            {posts.map((post) => (
              <li key={post.slug}>
                <article className="group relative flex h-full flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-paper-dark">
                    {post.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.image}
                        alt=""
                        loading="lazy"
                        className={`h-full w-full transition duration-500 group-hover:scale-[1.03] ${
                          post.image.startsWith('/covers/')
                            ? 'object-contain p-6 drop-shadow-[0_14px_18px_rgba(30,28,25,0.25)]'
                            : 'object-cover'
                        }`}
                      />
                    ) : null}
                  </div>
                  <time dateTime={post.date} className="mt-5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink/70">
                    {formatPostDate(post.date, lang)}
                  </time>
                  <h2 className="mt-2 font-display text-2xl font-700 leading-snug text-navy">
                    {/* Link rozciągnięty na całą kartę (after:inset-0). */}
                    <Link
                      href={`/${lang}/blog/${post.slug}`}
                      className="transition-colors after:absolute after:inset-0 group-hover:text-orange-ink"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 leading-relaxed text-ink/70">{post.excerpt}</p>
                  <span aria-hidden="true" className="mt-4 text-sm font-medium text-navy">
                    {t.more} →
                  </span>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

import Link from 'next/link';
import { getPosts, type PostLang } from '@/data/posts';

const TEXT = {
  pl: { heading: 'Blog', empty: 'Wkrótce pojawią się tu pierwsze wpisy.', more: 'Czytaj dalej →', locale: 'pl-PL' },
  de: { heading: 'Blog', empty: 'Die ersten Beiträge folgen bald.', more: 'Weiterlesen →', locale: 'de-DE' },
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
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl font-800 text-navy sm:text-4xl">{t.heading}</h1>
        {posts.length === 0 ? (
          <p className="mt-6 text-ink/80">{t.empty}</p>
        ) : (
          <ul className="mt-8 space-y-8">
            {posts.map((post) => (
              <li key={post.slug}>
                <article>
                  <time dateTime={post.date} className="text-sm text-ink/60">
                    {formatPostDate(post.date, lang)}
                  </time>
                  <h2 className="mt-1 font-display text-xl font-700 text-navy">
                    <Link href={`/${lang}/blog/${post.slug}`} className="hover:text-orange">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-2 leading-relaxed text-ink/80">{post.excerpt}</p>
                  <Link
                    href={`/${lang}/blog/${post.slug}`}
                    className="mt-2 inline-block font-semibold text-navy underline underline-offset-4 hover:text-orange"
                  >
                    {t.more}
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

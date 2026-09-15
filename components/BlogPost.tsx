import Link from 'next/link';
import type { Post } from '@/data/posts';
import { formatPostDate } from './BlogList';

const BACK = { pl: '← Wszystkie wpisy', de: '← Alle Beiträge', en: '← All posts' };

export default function BlogPost({ post }: { post: Post }) {
  return (
    <article className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <Link href={`/${post.lang}/blog`} className="text-sm font-semibold text-navy hover:text-orange">
          {BACK[post.lang]}
        </Link>
        <h1 className="mt-4 font-display text-3xl font-800 text-navy sm:text-4xl">{post.title}</h1>
        <time dateTime={post.date} className="mt-2 block text-sm text-ink/60">
          {formatPostDate(post.date, post.lang)}
        </time>
        <div
          className="mt-6 space-y-4 leading-relaxed text-ink/80 text-lg [&_a]:font-semibold [&_a]:text-navy [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:rounded-r-xl [&_blockquote]:border-l-4 [&_blockquote]:border-orange [&_blockquote]:bg-orange-light/60 [&_blockquote]:px-5 [&_blockquote]:py-3 [&_h2]:!mt-12 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-800 [&_h2]:text-navy [&_h3]:!mt-8 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-700 [&_h3]:text-navy [&_hr]:!my-10 [&_hr]:border-ink/10 [&_img]:rounded-lg [&_li]:ml-6 [&_li]:pl-1 [&_li]:marker:text-orange [&_ol]:list-decimal [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </article>
  );
}

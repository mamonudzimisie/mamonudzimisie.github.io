import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { getBookBySlug } from '@/data/books';

export type PostLang = 'pl' | 'de' | 'en';

export type Post = {
  slug: string;
  lang: PostLang;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  html: string;
};

// Każdy post to plik Markdown: data/posts/<język>/<slug>.md
// Wystarczy dodać nowy plik — zostanie wczytany automatycznie podczas budowania.
const POSTS_DIR = path.join(process.cwd(), 'data', 'posts');

const BOOK_LABELS = {
  pl: { details: 'Zobacz książkę', amazon: 'Kup na Amazon' },
  de: { details: 'Zum Buch', amazon: 'Bei Amazon kaufen' },
  en: { details: 'See the book', amazon: 'Buy on Amazon' },
};

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Znacznik w osobnej linii: {{ksiazki slug-1 slug-2}} → siatka kart z okładkami.
function renderBookCards(slugs: string[], lang: PostLang): string {
  const t = BOOK_LABELS[lang];
  const cards = slugs
    .map((slug) => getBookBySlug(slug))
    .filter((book): book is NonNullable<typeof book> => Boolean(book))
    .map(
      (book) => `
  <div class="flex gap-4 rounded-2xl bg-white/70 p-4 shadow-sm ring-1 ring-ink/10">
    <a href="/${lang}/books/${book.slug}" class="shrink-0">
      <img src="${book.coverImage}" alt="${escapeHtml(`${book.title} — ${book.subtitle}`)}" loading="lazy" class="!m-0 w-24 rounded-md shadow-cover" />
    </a>
    <div class="flex flex-col">
      <p class="!m-0 font-display font-700 leading-tight text-navy">${escapeHtml(book.title)}</p>
      <p class="!m-0 text-sm text-ink/70">${escapeHtml(book.subtitle)} · ${escapeHtml(book.ageRange)}</p>
      <div class="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-3 text-sm">
        <a href="/${lang}/books/${book.slug}" class="font-semibold text-navy underline underline-offset-4 hover:text-orange">${t.details}</a>
        <a href="${book.amazonUrl}" target="_blank" rel="noopener" class="font-semibold text-orange underline underline-offset-4">${t.amazon}</a>
      </div>
    </div>
  </div>`,
    )
    .join('');
  return `<div class="not-prose my-8 grid gap-4 sm:grid-cols-2">${cards}</div>`;
}

function renderMarkdown(content: string, lang: PostLang): string {
  // [ \t]* zamiast \s* — \s zjadałoby puste linie po znaczniku i następny
  // nagłówek przyklejałby się do bloku HTML (Markdown by go nie rozpoznał).
  const withBooks = content.replace(/^\{\{ksiazki[ \t]+([^}\n]+)\}\}[ \t]*$/gm, (_, slugs: string) =>
    `\n${renderBookCards(slugs.trim().split(/\s+/), lang)}\n`,
  );
  return marked.parse(withBooks) as string;
}

function toDateString(value: unknown): string {
  return value instanceof Date ? value.toISOString().slice(0, 10) : String(value);
}

export function getPosts(lang: PostLang): Post[] {
  const dir = path.join(POSTS_DIR, lang);
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, file), 'utf8'));
      return {
        slug: file.replace(/\.md$/, ''),
        lang,
        title: String(data.title),
        excerpt: String(data.excerpt ?? ''),
        date: toDateString(data.date),
        html: renderMarkdown(content, lang),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

// `output: 'export'` nie pozwala na pustą listę w generateStaticParams().
// Gdy w danym języku nie ma jeszcze postów, generujemy jedną stronę-zaślepkę,
// która i tak zwraca 404 (getPost jej nie znajdzie).
export const EMPTY_POST_SLUG = '_brak-postow';

export function getPostParams(lang: PostLang): { slug: string }[] {
  const slugs = getPosts(lang).map((post) => post.slug);
  return (slugs.length > 0 ? slugs : [EMPTY_POST_SLUG]).map((slug) => ({ slug }));
}

export function getAllPosts(): Post[] {
  return [...getPosts('pl'), ...getPosts('de'), ...getPosts('en')];
}

export function getPost(lang: PostLang, slug: string): Post | undefined {
  return getPosts(lang).find((post) => post.slug === slug);
}

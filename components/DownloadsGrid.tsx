import Link from 'next/link';
import type { DownloadGroup, DownloadSet } from '@/data/downloads';
import { getBookBySlug } from '@/data/books';
import { downloadPreview } from '@/lib/downloadPreview';

// Lista darmowych zestawów do druku: niskie kafelki w siatce, pogrupowane
// w działy. Poprzedni układ (jeden wysoki blok z dużym podglądem na zestaw)
// rósł o cały ekran z każdym nowym PDF-em. Wspólne dla /pl/materialy
// i /en/free-printables; nagłówki działów i skróty do nich pokazują się
// dopiero, gdy działów jest więcej niż jeden.

type Lang = 'pl' | 'en';

const GROUP_ORDER: DownloadGroup[] = ['sudoku', 'kids'];

const TEXT = {
  pl: {
    groups: {
      sudoku: { title: 'Sudoku i odmiany', note: 'dla dorosłych' },
      kids: { title: 'Wykreślanki dla dzieci', note: '5–7 lat' },
    },
    isNew: 'Nowość',
    pdf: 'PDF',
    pages: (n: number) => `${n} str.`,
    aria: (title: string, level: string) => `Pobierz PDF: ${title}, ${level}`,
    nav: 'Działy materiałów',
  },
  en: {
    groups: {
      sudoku: { title: 'Sudoku and variants', note: 'for adults' },
      kids: { title: 'Word searches for kids', note: '' },
    },
    isNew: 'New',
    pdf: 'PDF',
    pages: (n: number) => `${n} pages`,
    aria: (title: string, level: string) => `Download PDF: ${title}, ${level}`,
    nav: 'Printable sections',
  },
} as const;

function Card({ set, lang }: { set: DownloadSet; lang: Lang }) {
  const t = TEXT[lang];
  const preview = downloadPreview(set);
  return (
    <article className="flex gap-4 rounded-lg bg-paper-soft p-4 sm:gap-5 sm:p-5">
      {preview && (
        <div className="w-20 shrink-0 sm:w-24" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt=""
            loading="lazy"
            className="aspect-[17/22] w-full rounded-[2px] bg-white object-cover p-0.5 shadow-cover"
          />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <h3 className="font-display text-xl font-800 leading-tight text-navy">{set.title}</h3>
          {set.isNew && (
            <span className="rounded bg-orange-light px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-orange-ink">
              {t.isNew}
            </span>
          )}
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-ink/75">{set.description}</p>

        <ul className="mt-3 divide-y divide-navy/10 border-t border-navy/10">
          {set.variants.map((variant) => {
            const book = variant.bookSlug ? getBookBySlug(variant.bookSlug) : undefined;
            return (
              <li key={variant.pdf} className="flex items-center justify-between gap-3 py-2.5">
                <div className="min-w-0 text-sm">
                  <span className="font-semibold text-navy">{variant.level}</span>
                  <span className="block text-[0.8rem] leading-snug text-ink/70">
                    {variant.note}
                    {book && (
                      <>
                        {' · '}
                        <Link
                          href={`/${lang}/books/${book.slug}`}
                          className="font-semibold text-navy underline underline-offset-2 hover:text-orange-ink"
                        >
                          {variant.bookLabel ?? book.title}
                        </Link>
                      </>
                    )}
                  </span>
                </div>
                <a
                  href={variant.pdf}
                  download
                  aria-label={t.aria(set.title, variant.level)}
                  className="inline-flex shrink-0 items-baseline gap-1.5 rounded-md bg-orange px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-orange/90"
                >
                  {t.pdf}
                  <span className="text-xs font-semibold opacity-80">{t.pages(variant.pages)}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {set.post && (
          <p className="mt-auto pt-2 text-sm">
            <Link
              href={set.post.href}
              className="font-semibold text-navy underline underline-offset-4 hover:text-orange-ink"
            >
              {set.post.label}
            </Link>
            <span aria-hidden="true" className="text-navy"> →</span>
          </p>
        )}
      </div>
    </article>
  );
}

export default function DownloadsGrid({ sets, lang }: { sets: DownloadSet[]; lang: Lang }) {
  const t = TEXT[lang];
  const groups = GROUP_ORDER.map((id) => ({
    id,
    ...t.groups[id],
    sets: sets.filter((set) => set.group === id),
  })).filter((group) => group.sets.length > 0);
  const many = groups.length > 1;

  return (
    <>
      {many && (
        <nav aria-label={t.nav} className="mt-7 flex flex-wrap gap-2.5">
          {groups.map((group) => (
            <a
              key={group.id}
              href={`#${group.id}`}
              className="rounded-full border border-navy/25 px-4 py-1.5 text-sm font-semibold text-navy transition hover:border-navy hover:bg-navy hover:text-white"
            >
              {group.title}
              <span className="ml-1.5 font-normal opacity-70">{group.sets.length}</span>
            </a>
          ))}
        </nav>
      )}

      {groups.map((group) => (
        <section key={group.id} id={group.id} className={`scroll-mt-24 ${many ? 'mt-12' : 'mt-10'}`}>
          {many && (
            <div className="mb-5 flex items-baseline gap-3 border-b border-navy/15 pb-2.5">
              <h2 className="font-display text-2xl font-800 text-navy">{group.title}</h2>
              {group.note && <span className="text-sm text-ink/70">{group.note}</span>}
            </div>
          )}
          <div className="grid gap-5 lg:grid-cols-2">
            {group.sets.map((set) => (
              <Card key={set.slug} set={set} lang={lang} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

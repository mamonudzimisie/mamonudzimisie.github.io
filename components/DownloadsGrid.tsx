import Link from 'next/link';
import type { DownloadGroup, DownloadSet } from '@/data/downloads';
import { getBookBySlug } from '@/data/books';

// Lista darmowych zestawów do druku: jeden wiersz na zestaw (tytuł, opis,
// przyciski PDF po prawej), bez obrazków, pogrupowane w działy. Kafelki
// z podglądami źle się skanowało wzrokiem już przy pięciu zestawach. Wspólne dla /pl/materialy
// i /en/free-printables; nagłówki działów pokazują się dopiero, gdy działów
// jest więcej niż jeden. To, co wspólne dla działu (liczba plansz, rozwiązania),
// stoi raz w nagłówku, a opis zestawu mieści się w jednej linijce.

type Lang = 'pl' | 'en';

// Wykreślanki dla dzieci na górze: to one są sezonowe i do nich prowadzą piny.
const GROUP_ORDER: DownloadGroup[] = ['kids', 'sudoku'];

const TEXT = {
  pl: {
    groups: {
      sudoku: { title: 'Sudoku i odmiany', note: 'dla dorosłych · zasady z rysunkiem, 6 zagadek i rozwiązania' },
      kids: { title: 'Wykreślanki dla dzieci', note: '5–7 lat · po 5 plansz z rozwiązaniami' },
    },
    isNew: 'Nowość',
    pdf: 'PDF',
    pages: (n: number) => `${n} str.`,
    aria: (title: string, level: string) => `Pobierz PDF: ${title}, ${level}`,
    books: 'Więcej plansz w książce:',
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
    books: 'More in the book:',
  },
} as const;

function Row({ set, lang }: { set: DownloadSet; lang: Lang }) {
  const t = TEXT[lang];
  // Książki, do których prowadzi zestaw — jedna krótka linijka zamiast linku przy każdej wersji.
  const books = set.variants.flatMap((variant) => {
    const book = variant.bookSlug ? getBookBySlug(variant.bookSlug) : undefined;
    return book ? [{ slug: book.slug, label: set.variants.length > 1 ? variant.level : book.title }] : [];
  });
  return (
    <li className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <h3 className="font-display text-lg font-800 leading-tight text-navy">{set.title}</h3>
          {set.isNew && (
            <span className="rounded bg-orange-light px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-orange-ink">
              {t.isNew}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm leading-snug text-ink/70">{set.description}</p>
        {(set.post || books.length > 0) && (
          <p className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-[0.8rem] text-ink/70">
            {set.post && (
              <Link
                href={set.post.href}
                className="font-semibold text-navy underline underline-offset-2 hover:text-orange-ink"
              >
                {set.post.label}
              </Link>
            )}
            {books.length > 0 && (
              <span>
                {t.books}{' '}
                {books.map((book, index) => (
                  <span key={book.slug}>
                    {index > 0 && ', '}
                    <Link
                      href={`/${lang}/books/${book.slug}`}
                      className="font-semibold text-navy underline underline-offset-2 hover:text-orange-ink"
                    >
                      {book.label}
                    </Link>
                  </span>
                ))}
              </span>
            )}
          </p>
        )}
      </div>

      <div className="flex shrink-0 flex-wrap gap-2">
        {set.variants.map((variant) => (
          <a
            key={variant.pdf}
            href={variant.pdf}
            download
            title={`${variant.note} · ${t.pages(variant.pages)}`}
            aria-label={t.aria(set.title, variant.level)}
            className="inline-flex items-baseline gap-1.5 rounded-md bg-orange px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-orange/90"
          >
            {variant.level}
            <span className="text-xs font-semibold opacity-80">{t.pdf}</span>
          </a>
        ))}
      </div>
    </li>
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
      {groups.map((group) => (
        <section key={group.id} id={group.id} className="mt-10 max-w-4xl scroll-mt-24">
          {many && (
            <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-navy/25 pb-2.5">
              <h2 className="font-display text-2xl font-800 text-navy">{group.title}</h2>
              {group.note && <span className="text-sm text-ink/70">{group.note}</span>}
            </div>
          )}
          <ul className="divide-y divide-navy/10">
            {group.sets.map((set) => (
              <Row key={set.slug} set={set} lang={lang} />
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}

import Link from 'next/link';
import { books } from '@/data/books';
import type { BookSeries } from '@/data/series';
import { CATALOG_STRINGS, type SiteLang } from '@/lib/catalog-i18n';

// „Drzwi” na stronie głównej: po jednych na serię (albo kilka małych serii
// razem), w kolejności ważności. Pierwsze dwoje to główne filary — duże,
// w jednym rzędzie; reszta mniejsza, po trzy w rzędzie. Strona główna nie pokazuje pojedynczych książek — każde drzwi
// prowadzą na stronę serii (data/landings.ts). Liczą się tylko książki w języku strony,
// więc na /de nie ma polskich okładek.
type Door = { series: BookSeries[]; label: string; description: string; href: string };

const DOORS: Record<SiteLang, Door[]> = {
  pl: [
    {
      series: ['znajdz-slowko'],
      label: 'Wykreślanki dla dzieci',
      description: 'Znajdź słówko! — pięć poziomów od 5 do 13 lat',
      href: '/pl/wykreslanki-dla-dzieci',
    },
    {
      series: ['sudoku-duzy-druk'],
      label: 'Sudoku dużym drukiem',
      description: 'Dla seniorów i na prezent — duże cyfry, wyraźne kratki',
      href: '/pl/sudoku-dla-seniorow',
    },
    {
      series: ['lamiglowki-logiczne'],
      label: 'Sudoku i warianty',
      description: 'Klasyczne sudoku, Killer Sudoku i inne łamigłówki liczbowe',
      href: '/pl/sudoku-i-warianty',
    },
    {
      series: ['wykreslanki-jezykowe'],
      label: 'Wykreślanki językowe',
      description: 'Angielski i niemiecki — słówka i zwroty utrwalane w zdaniach',
      href: '/pl/wykreslanki-jezykowe',
    },
    {
      // Na razie jedna polska książka w serii — drzwi prowadzą prosto do niej.
      // Własna strona serii, gdy dojdzie druga wykreślanka tematyczna.
      series: ['wykreslanki-tematyczne'],
      label: 'Wykreślanki o górach',
      description: 'Zdobywca Szczytów — 75 plansz z nazwami polskich szczytów',
      href: '/pl/books/zdobywca-szczytow',
    },
  ],
  de: [
    {
      series: ['meine-ersten-wortsuchratsel'],
      label: 'Suchrätsel für Kinder',
      description: 'Meine ersten Wortsuchrätsel — für Kinder von 5 bis 7 Jahren',
      href: '/de/suchraetsel-fuer-kinder',
    },
    {
      series: ['sudoku-duzy-druk', 'wykreslanki-tematyczne'],
      label: 'Rätsel im Großdruck',
      description: 'Sudoku und Suchrätsel mit großer, gut lesbarer Schrift',
      href: '/de/raetsel-grossdruck',
    },
  ],
  en: [
    {
      series: ['sudoku-duzy-druk'],
      label: 'Large Print Sudoku',
      description: 'For seniors and as a gift — big digits, clear grids',
      href: '/en/large-print-sudoku',
    },
    {
      series: ['lamiglowki-logiczne'],
      label: 'Sudoku & variants',
      description: 'Classic sudoku, Killer Sudoku, Kakuro and more',
      href: '/en/sudoku-variants',
    },
  ],
};

// Mniejsze linki pod drzwiami — wszystko, co nie jest serią książek.
const EXTRAS: Record<SiteLang, { href: string; label: string }[]> = {
  pl: [
    { href: '/pl/materialy', label: 'Zagadki do pobrania' },
    { href: '/pl/books', label: 'Wszystkie książki' },
    { href: '/pl/blog', label: 'Blog' },
  ],
  de: [
    { href: '/de/books', label: 'Alle Bücher' },
    { href: '/de/blog', label: 'Blog' },
  ],
  en: [
    { href: '/en/free-printables', label: 'Free printables' },
    { href: '/en/books', label: 'All books' },
    { href: '/en/blog', label: 'Blog' },
  ],
};

// Okładki stoją prosto obok siebie, lekko na siebie zachodząc — jak na
// półce. Bez obracania: obrócone małe obrazki na zwykłym ekranie zawsze
// miały postrzępione krawędzie. Środkowa jest z przodu i odrobinę wyższa.
function CoverStack({ images, small }: { images: string[]; small: boolean }) {
  const ordered = images.length === 3 ? [images[1], images[0], images[2]] : images;
  const front = images.length === 3 ? 1 : -1;
  return (
    <div className={`flex items-end justify-center ${small ? 'h-28 sm:h-32' : 'h-32 sm:h-44'}`} aria-hidden="true">
      {ordered.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          loading="lazy"
          className={`relative block w-auto rounded-[1px_3px_3px_1px] transition duration-300 group-hover:-translate-y-1 ${
            i === front
              ? 'z-10 h-full shadow-[0_2px_4px_rgba(31,42,72,0.15),0_16px_24px_-10px_rgba(31,42,72,0.4)]'
              : 'h-[86%] shadow-[0_1px_3px_rgba(31,42,72,0.15),0_10px_18px_-10px_rgba(31,42,72,0.35)]'
          } ${i > 0 ? (small ? '-ml-9 sm:-ml-10' : '-ml-10 sm:-ml-14') : ''}`}
        />
      ))}
    </div>
  );
}

export default function SeriesDoors({ lang }: { lang: SiteLang }) {
  const doors = DOORS[lang].flatMap((door) => {
    const inDoor = books.filter((b) => door.series.includes(b.series) && b.lang === lang && !b.comingSoon);
    if (inDoor.length === 0) return [];
    // Wyróżnione najpierw, żeby na wierzchu stała najlepsza okładka.
    const covers = [...inDoor]
      .sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
      .slice(0, 3)
      // Miniatury 320 px (scripts/cover-thumbs.py).
      .map((b) => b.coverImage.replace('/covers/', '/covers/thumbs/'));
    return [{ ...door, covers, count: inDoor.length }];
  });

  const card = (door: (typeof doors)[number], small: boolean) => (
    <Link
      key={door.href}
      href={door.href}
      className={`group flex flex-col rounded-lg bg-paper-soft transition-colors hover:bg-paper-soft-hover ${
        small ? 'px-5 pb-5 pt-6' : 'px-5 pb-6 pt-7 sm:px-8 sm:pb-8 sm:pt-9'
      }`}
    >
      <CoverStack images={door.covers} small={small} />
      <div className={`flex items-end justify-between gap-4 ${small ? 'mt-5' : 'mt-6 sm:mt-8'}`}>
        <div className="min-w-0">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink/60">
            {CATALOG_STRINGS[lang].seriesCount(door.count)}
          </p>
          <h3
            className={`mt-1 font-display font-700 leading-tight text-navy ${small ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'}`}
          >
            {door.label}
          </h3>
          <p className={`mt-2 leading-snug text-ink/70 ${small ? 'text-sm' : 'text-sm sm:text-base'}`}>{door.description}</p>
        </div>
        <span
          aria-hidden="true"
          className="shrink-0 pb-1 text-navy/60 transition group-hover:translate-x-0.5 group-hover:text-orange-ink"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
  const rest = doors.slice(2);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">{doors.slice(0, 2).map((door) => card(door, false))}</div>
      {rest.length > 0 && (
        <div className={`mt-4 grid gap-4 sm:mt-6 sm:grid-cols-2 sm:gap-6 ${rest.length >= 3 ? 'lg:grid-cols-3' : ''}`}>
          {rest.map((door) => card(door, true))}
        </div>
      )}

      <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-base font-medium text-navy">
        {EXTRAS[lang].map((extra) => (
          <li key={extra.href}>
            <Link href={extra.href} className="transition-colors hover:text-orange-ink">
              {extra.label} <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

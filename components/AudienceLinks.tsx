import Link from 'next/link';
import { books, type BookAudience } from '@/data/books';
import type { SiteLang } from '@/lib/catalog-i18n';

type Text = { label: string; description: string };

// Wygląd kafelków jest wspólny dla wszystkich języków — tu zmieniamy tylko teksty.
// `landing`: strona docelowa grupy w danym języku (data/landings.ts) — kafelek
// prowadzi na nią zamiast do katalogu z filtrem ?grupa=, którego Google nie indeksuje.
const AUDIENCES: {
  audience: BookAudience;
  text: Record<SiteLang, Text>;
  landing?: Partial<Record<SiteLang, string>>;
}[] = [
  {
    audience: 'dzieci',
    text: {
      pl: { label: 'Dla dzieci', description: 'Zabawa i nauka w jednym' },
      de: { label: 'Für Kinder', description: 'Spielen und Lernen in einem' },
      en: { label: 'For kids', description: 'Fun and learning in one' },
    },
    landing: { pl: '/pl/wykreslanki-dla-dzieci' },
  },
  {
    audience: 'dorosli',
    text: {
      pl: { label: 'Dla dorosłych', description: 'Trening umysłu i relaks' },
      de: { label: 'Für Erwachsene', description: 'Gehirntraining und Entspannung' },
      en: { label: 'For adults', description: 'Brain training and relaxation' },
    },
  },
  {
    audience: 'duzy-druk',
    text: {
      pl: { label: 'Duży druk', description: 'Wygodna, czytelna czcionka' },
      de: { label: 'Großdruck', description: 'Angenehme, gut lesbare Schrift' },
      en: { label: 'Large print', description: 'Comfortable, easy-to-read type' },
    },
    landing: { pl: '/pl/sudoku-dla-seniorow', de: '/de/raetsel-grossdruck', en: '/en/large-print-sudoku' },
  },
];

// Dział z materiałami istnieje tylko w wersjach, które mają tu wpis.
// `pages` to podglądy stron do wydruku pokazane w kafelku zamiast okładek
// (miniatury 320 px z scripts/cover-thumbs.py).
const DOWNLOADS: Partial<Record<SiteLang, Text & { href: string; pages: string[] }>> = {
  pl: {
    href: '/pl/materialy',
    label: 'Do pobrania',
    description: 'Zagadki do wydruku w domu',
    pages: ['/materialy/thumbs/wykreslanki-jesien-5-6-lat.webp', '/materialy/thumbs/wykreslanki-halloween-5-6-lat.webp'],
  },
  en: {
    href: '/en/free-printables',
    label: 'Free printables',
    description: 'Puzzles to print at home',
    pages: ['/samples/large-print-sudoku-100/thumbs/4.webp', '/samples/large-print-sudoku-100/thumbs/5.webp'],
  },
};

// Trzy okładki z danej grupy: najpierw w języku strony, potem pozostałe.
function coversFor(audience: BookAudience, lang: SiteLang): string[] {
  const group = books.filter((book) => book.audience === audience && !book.comingSoon);
  const own = group.filter((b) => b.lang === lang);
  // Dwie okładki w języku strony wystarczą na stos — bez obcych okładek.
  const sorted = own.length >= 2 ? own : [...own, ...group.filter((b) => b.lang !== lang)];
  // Miniatury 320 px (scripts/cover-thumbs.py) — pełne okładki pomniejszone
  // do ~70 px i przechylone wyglądały na postrzępione.
  return sorted.slice(0, 3).map((book) => book.coverImage.replace('/covers/', '/covers/thumbs/'));
}

// Okładki stoją prosto obok siebie, lekko na siebie zachodząc — jak na
// półce. Bez obracania: obrócone małe obrazki na zwykłym ekranie zawsze
// miały postrzępione krawędzie. Środkowa jest z przodu i odrobinę wyższa.
function CoverStack({ images, pages }: { images: string[]; pages?: boolean }) {
  const ordered = images.length === 3 ? [images[1], images[0], images[2]] : images;
  const front = images.length === 3 ? 1 : -1;
  return (
    <div className="flex h-24 items-end justify-center sm:h-36" aria-hidden="true">
      {ordered.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          loading="lazy"
          className={`relative block w-auto rounded-[1px_3px_3px_1px] transition duration-300 group-hover:-translate-y-1 ${
            pages ? 'bg-white p-1.5' : ''
          } ${
            i === front
              ? 'z-10 h-full shadow-[0_2px_4px_rgba(31,42,72,0.15),0_16px_24px_-10px_rgba(31,42,72,0.4)]'
              : 'h-[86%] shadow-[0_1px_3px_rgba(31,42,72,0.15),0_10px_18px_-10px_rgba(31,42,72,0.35)]'
          } ${i > 0 ? '-ml-9 sm:-ml-12' : ''}`}
        />
      ))}
    </div>
  );
}

export default function AudienceLinks({ lang = 'pl' }: { lang?: SiteLang }) {
  const downloads = DOWNLOADS[lang];
  const cards = [
    ...AUDIENCES.map(({ audience, text, landing }) => ({
      href: landing?.[lang] ?? `/${lang}/books?grupa=${encodeURIComponent(audience)}`,
      images: coversFor(audience, lang),
      pages: false,
      ...text[lang],
    })),
    ...(downloads ? [{ ...downloads, images: downloads.pages, pages: true }] : []),
  ];

  return (
    <div className={`grid grid-cols-2 gap-3 sm:gap-5 ${cards.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
      {cards.map((card) => (
        <Link
          key={card.href}
          href={card.href}
          className="group flex flex-col rounded-lg bg-paper-soft px-3 pb-4 pt-5 transition-colors hover:bg-paper-soft-hover sm:px-5 sm:pb-5 sm:pt-6"
        >
          <CoverStack images={card.images} pages={card.pages} />
          <div className="mt-4 flex items-end justify-between gap-2 sm:mt-5 sm:gap-3">
            <div className="min-w-0">
              <h3 className="font-display text-lg font-700 leading-tight text-navy sm:text-[1.375rem]">{card.label}</h3>
              <p className="mt-1 text-xs leading-snug text-ink/70 sm:text-sm">{card.description}</p>
            </div>
            <span
              aria-hidden="true"
              className="shrink-0 pb-0.5 text-navy/60 transition group-hover:translate-x-0.5 group-hover:text-orange-ink"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

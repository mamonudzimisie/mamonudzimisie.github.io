import Image from 'next/image';
import Link from 'next/link';
import { books, type BookAudience } from '@/data/books';
import type { SiteLang } from '@/lib/catalog-i18n';

type Text = { label: string; description: string };

// Wygląd kafelków jest wspólny dla wszystkich języków — tu zmieniamy tylko teksty.
const AUDIENCES: { audience: BookAudience; text: Record<SiteLang, Text> }[] = [
  {
    audience: 'dzieci',
    text: {
      pl: { label: 'Dla dzieci', description: 'Zabawa i nauka w jednym' },
      de: { label: 'Für Kinder', description: 'Spielen und Lernen in einem' },
      en: { label: 'For kids', description: 'Fun and learning in one' },
    },
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
  },
];

// Dział z materiałami istnieje tylko w wersjach, które mają tu wpis.
// `pages` to podglądy stron do wydruku pokazane w kafelku zamiast okładek.
const DOWNLOADS: Partial<Record<SiteLang, Text & { href: string; pages: string[] }>> = {
  pl: {
    href: '/pl/materialy',
    label: 'Do pobrania',
    description: 'Zagadki do wydruku w domu',
    pages: ['/materialy/wykreslanki-jesien-5-6-lat.webp', '/materialy/wykreslanki-halloween-5-6-lat.webp'],
  },
  en: {
    href: '/en/free-printables',
    label: 'Free printables',
    description: 'Puzzles to print at home',
    pages: ['/samples/large-print-sudoku-100/4.webp', '/samples/large-print-sudoku-100/5.webp'],
  },
};

// Trzy okładki z danej grupy: najpierw w języku strony, potem pozostałe.
function coversFor(audience: BookAudience, lang: SiteLang): string[] {
  const group = books.filter((book) => book.audience === audience && !book.comingSoon);
  const sorted = [...group.filter((b) => b.lang === lang), ...group.filter((b) => b.lang !== lang)];
  return sorted.slice(0, 3).map((book) => book.coverImage);
}

// Mały stos: środkowa okładka z przodu, dwie po bokach lekko przechylone.
const STACK = [
  'left-[12%] rotate-[-9deg] z-0',
  'left-1/2 -translate-x-1/2 z-10',
  'right-[12%] rotate-[9deg] z-0',
];

function CoverStack({ images, pages }: { images: string[]; pages?: boolean }) {
  const ordered = images.length === 3 ? [images[1], images[0], images[2]] : images;
  const slots = images.length === 3 ? STACK : ['left-[24%] rotate-[-6deg] z-0', 'right-[24%] rotate-[6deg] z-10'];
  return (
    <div className="relative h-[5.5rem] sm:h-40" aria-hidden="true">
      {ordered.map((src, i) => (
        <div
          key={src}
          className={`absolute bottom-0 aspect-[3/4] w-[34%] max-w-[6.75rem] overflow-hidden rounded-[4px] shadow-cover transition duration-300 group-hover:-translate-y-1 ${
            pages ? 'bg-white p-1' : ''
          } ${slots[i]}`}
        >
          <Image src={src} alt="" fill unoptimized className={pages ? 'object-contain p-1' : 'object-cover'} />
        </div>
      ))}
    </div>
  );
}

export default function AudienceLinks({ lang = 'pl' }: { lang?: SiteLang }) {
  const downloads = DOWNLOADS[lang];
  const cards = [
    ...AUDIENCES.map(({ audience, text }) => ({
      href: `/${lang}/books?grupa=${encodeURIComponent(audience)}`,
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
          className="group flex flex-col rounded-lg bg-[#EFE6D8] px-3 pb-4 pt-5 transition-colors hover:bg-[#EADFCE] sm:px-5 sm:pb-5 sm:pt-6"
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

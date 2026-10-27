import Link from 'next/link';
import type { BookAudience } from '@/data/books';
import type { SiteLang } from '@/lib/catalog-i18n';

type IconProps = { className?: string };

function IconKid({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8.5 6.2c.3-2 2-3 3.4-2" />
      <circle cx="12" cy="13" r="6.5" />
      <path d="M9.6 12.3h.01M14.4 12.3h.01" strokeWidth="2.4" />
      <path d="M9 15.6c1.2 1.2 4.8 1.2 6 0" />
    </svg>
  );
}

function IconAdult({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 4a3 3 0 00-3 3 3 3 0 00-1.5 5.6A3 3 0 007 17a3 3 0 003 3V4z" />
      <path d="M15 4a3 3 0 013 3 3 3 0 011.5 5.6A3 3 0 0117 17a3 3 0 01-3 3V4z" />
    </svg>
  );
}

function IconLargePrint({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-4.35-4.35" />
      <path d="M8 12.5l2.5-5 2.5 5M8.9 10.7h3.2" />
    </svg>
  );
}

function IconDownload({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 3h7l4 4v14H7V3z" />
      <path d="M14 3v4h4" />
      <path d="M12.5 10.5v6M10 14l2.5 2.5L15 14" />
    </svg>
  );
}

type Text = { label: string; description: string };

// Wygląd kafelków jest wspólny dla wszystkich języków — tu zmieniamy tylko teksty.
const AUDIENCES: {
  audience: BookAudience;
  Icon: (props: IconProps) => JSX.Element;
  // tło kafelka + kolor ikony i strzałki
  color: string;
  text: Record<SiteLang, Text>;
}[] = [
  {
    audience: 'dzieci',
    Icon: IconKid,
    color: 'text-navy',
    text: {
      pl: { label: 'Dla dzieci', description: 'Zabawa i nauka w jednym' },
      de: { label: 'Für Kinder', description: 'Spielen und Lernen in einem' },
      en: { label: 'For kids', description: 'Fun and learning in one' },
    },
  },
  {
    audience: 'dorosli',
    Icon: IconAdult,
    color: 'text-navy',
    text: {
      pl: { label: 'Dla dorosłych', description: 'Trening umysłu i relaks' },
      de: { label: 'Für Erwachsene', description: 'Gehirntraining und Entspannung' },
      en: { label: 'For adults', description: 'Brain training and relaxation' },
    },
  },
  {
    audience: 'duzy-druk',
    Icon: IconLargePrint,
    color: 'text-navy',
    text: {
      pl: { label: 'Duży druk', description: 'Wygodna, czytelna czcionka' },
      de: { label: 'Großdruck', description: 'Angenehme, gut lesbare Schrift' },
      en: { label: 'Large print', description: 'Comfortable, easy-to-read type' },
    },
  },
];

// Dział z materiałami istnieje tylko w wersjach, które mają tu wpis.
const DOWNLOADS: Partial<Record<SiteLang, Text & { href: string }>> = {
  pl: { href: '/pl/materialy', label: 'Do pobrania', description: 'Zagadki do wydruku w domu' },
  en: { href: '/en/free-printables', label: 'Free printables', description: 'Puzzles to print at home' },
};

export default function AudienceLinks({ lang = 'pl' }: { lang?: SiteLang }) {
  const downloads = DOWNLOADS[lang];
  const cards = [
    ...AUDIENCES.map(({ audience, Icon, color, text }) => ({
      href: `/${lang}/books?grupa=${encodeURIComponent(audience)}`,
      Icon,
      color,
      ...text[lang],
    })),
    ...(downloads ? [{ ...downloads, Icon: IconDownload, color: 'text-navy' }] : []),
  ];
  // Przy czterech kafelkach w rzędzie robi się ciasno — mniejsze odstępy i ikony.
  const four = cards.length === 4;

  return (
    <div className={`grid gap-5 ${four ? 'sm:grid-cols-2 lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
      {cards.map((card) => (
        <Link
          key={card.href}
          href={card.href}
          className={`group flex items-center gap-4 rounded-lg border border-ink/10 bg-white/50 p-5 transition hover:border-ink/25 hover:bg-white/80 ${
            four ? 'lg:gap-3 lg:p-4' : ''
          } ${card.color}`}
        >
          <span className="shrink-0" aria-hidden="true">
            <card.Icon className={`h-11 w-11 text-orange ${four ? 'lg:h-10 lg:w-10' : ''}`} />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-lg font-700 leading-tight text-navy">{card.label}</h3>
            <p className="mt-1 text-sm leading-snug text-ink/70">{card.description}</p>
          </div>
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center text-navy/50 transition group-hover:translate-x-0.5 group-hover:text-orange"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </Link>
      ))}
    </div>
  );
}

import { Fragment, type CSSProperties } from 'react';
import Link from 'next/link';
import AudienceLinks from '@/components/AudienceLinks';
import BookCard from '@/components/BookCard';
import HeroFan from '@/components/HeroFan';
import type { Book } from '@/data/books';
import type { SiteLang } from '@/lib/catalog-i18n';

// Wspólny układ strony głównej dla wszystkich języków. Zmiana wyglądu tutaj
// trafia od razu do /pl, /de i /en — w STRINGS różnią się tylko teksty.

type IconProps = { className?: string };

type Strings = {
  badge: string;
  // Opcjonalny okrzyk w osobnej, największej linii nad nagłówkiem.
  titleShout?: string;
  // Kolejne linie nagłówka przed wyróżnioną końcówką (łamane tylko na dużych ekranach).
  titleLines: string[];
  titlePrefix: string;
  // Litery wyróżnionego słowa są wciągane pod falkę i wyskakują z powrotem
  // (raz, po wejściu na stronę) — we wszystkich językach.
  titleAccent: string;
  lead: string;
  cta: string;
  // Opcjonalna adnotacja pod przyciskiem.
  note?: string;
  benefits: [string, string][];
  audiencesTitle: string;
  audiencesLead: string;
  featuredTitle: string;
  whyLine: string;
  whyPrefix: string;
  whyAccent: string;
  reasons: { title: string; text: string }[];
  // Wyciszona litera w tle sekcji hero.
  doodleLetter: string;
};

const STRINGS: Record<SiteLang, Strings> = {
  pl: {
    badge: 'Dla dzieci i dorosłych',
    titleShout: 'Uwaga,',
    titleLines: ['te zagadki'],
    titlePrefix: '',
    titleAccent: 'wciągają',
    lead: 'Przy tym relaksują, ćwiczą umysł i dają chwilę oddechu. Dla małych i dużych!',
    cta: 'Zobacz książki',
    benefits: [
      ['Rozwijają', 'spostrzegawczość'],
      ['Dają relaks', 'bez ekranu'],
      ['Dla całej', 'rodziny'],
    ],
    audiencesTitle: 'Znajdź coś dla siebie',
    audiencesLead: 'Łamigłówki na każdą okazję — dla dzieci, dorosłych i całej rodziny.',
    featuredTitle: 'Wyróżnione książki',
    whyLine: 'Dlaczego Twój mózg',
    whyPrefix: 'lubi',
    whyAccent: 'łamigłówki?',
    reasons: [
      {
        title: 'Lepsza koncentracja',
        text: 'Regularne rozwiązywanie łamigłówek poprawia zdolność skupienia.',
      },
      {
        title: 'Sprawność umysłu',
        text: 'Łamigłówki ćwiczą pamięć, logiczne myślenie i pomagają utrzymać umysł w formie.',
      },
      {
        title: 'Wyciszenie',
        text: 'Skupienie na jednym zadaniu wycisza i pozwala odpocząć od nadmiaru bodźców.',
      },
      {
        title: 'Rozrywka',
        text: 'Świetna zabawa w podróży, w deszczowy wieczór albo w przerwie w ciągu dnia.',
      },
    ],
    doodleLetter: 'W',
  },
  de: {
    badge: 'Für Kinder und Erwachsene',
    titleShout: 'Achtung,',
    titleLines: ['diese Rätsel'],
    titlePrefix: '',
    titleAccent: 'fesseln',
    lead: 'Dabei entspannen sie, trainieren den Kopf und schenken eine kleine Atempause. Für Groß und Klein!',
    cta: 'Bücher ansehen',
    benefits: [
      ['Schärfen die', 'Aufmerksamkeit'],
      ['Entspannung', 'ohne Bildschirm'],
      ['Für die ganze', 'Familie'],
    ],
    audiencesTitle: 'Finde etwas für dich',
    audiencesLead: 'Rätsel für jede Gelegenheit — für Kinder, Erwachsene und die ganze Familie.',
    featuredTitle: 'Empfohlene Bücher',
    whyLine: 'Warum dein Gehirn',
    whyPrefix: '',
    whyAccent: 'Rätsel mag',
    reasons: [
      {
        title: 'Bessere Konzentration',
        text: 'Regelmäßiges Rätseln verbessert die Fähigkeit, sich zu konzentrieren.',
      },
      {
        title: 'Geistige Fitness',
        text: 'Rätsel trainieren Gedächtnis und logisches Denken und halten den Kopf fit.',
      },
      {
        title: 'Zur Ruhe kommen',
        text: 'Sich auf eine Aufgabe zu konzentrieren beruhigt und schafft Abstand von der Reizflut.',
      },
      {
        title: 'Unterhaltung',
        text: 'Perfekt für unterwegs, für einen verregneten Abend oder eine Pause zwischendurch.',
      },
    ],
    doodleLetter: 'R',
  },
  en: {
    badge: 'For kids and adults',
    titleShout: 'Warning:',
    titleLines: ['these puzzles'],
    titlePrefix: 'are',
    titleAccent: 'addictive',
    lead: 'They also help you relax, keep your mind sharp and give you a moment to breathe. For kids and grown-ups alike!',
    cta: 'Browse books',
    note: 'Our first English title is out — the rest of our books are in Polish and German for now.',
    benefits: [
      ['Sharpen', 'attention'],
      ['Screen-free', 'relaxation'],
      ['For the whole', 'family'],
    ],
    audiencesTitle: 'Find something for you',
    audiencesLead: 'Puzzles for every occasion — for kids, adults and the whole family.',
    featuredTitle: 'Featured books',
    whyLine: 'Why your brain',
    whyPrefix: '',
    whyAccent: 'loves puzzles',
    reasons: [
      {
        title: 'Better focus',
        text: 'Solving puzzles regularly improves your ability to concentrate.',
      },
      {
        title: 'A fit mind',
        text: 'Puzzles train memory and logical thinking and keep your mind sharp.',
      },
      {
        title: 'Time to unwind',
        text: 'Focusing on one task calms you down and gives you distance from constant noise.',
      },
      {
        title: 'Pure fun',
        text: 'Perfect for travel, a rainy evening or a quick break during the day.',
      },
    ],
    doodleLetter: 'P',
  },
};

function IconPencil({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 20l1-4.5L15.5 5 19 8.5 8.5 19 4 20z" />
      <path d="M13 7l3.5 3.5" />
    </svg>
  );
}

function IconHeart({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 20s-7-4.4-9.5-9C0.8 7.4 2.6 4 6 4c2 0 3.5 1.2 4 2.5.5-1.3 2-2.5 4-2.5 3.4 0 5.2 3.4 3.5 7-2.5 4.6-9.5 9-9.5 9z" />
    </svg>
  );
}

function IconBrain({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 4a3 3 0 00-3 3 3 3 0 00-1.5 5.6A3 3 0 007 17a3 3 0 003 3V4z" />
      <path d="M15 4a3 3 0 013 3 3 3 0 011.5 5.6A3 3 0 0117 17a3 3 0 01-3 3V4z" />
    </svg>
  );
}

function IconLeaf({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 19c-1-8 4-14 15-14 0 10-5 15-13 14" />
      <path d="M4 21c2-6 6-10 11-12" />
    </svg>
  );
}

function IconMoon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5z" />
    </svg>
  );
}

function DoodleStar({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2l2.2 6.6H21l-5.4 4 2.1 6.6L12 15.2l-5.7 4.2 2.1-6.6L3 8.6h6.8L12 2z" />
    </svg>
  );
}

function DoodleSparkle({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
      <path d="M12 2v5M12 17v5M2 12h5M17 12h5M5 5l3.5 3.5M15.5 15.5L19 19M19 5l-3.5 3.5M8.5 15.5L5 19" />
    </svg>
  );
}

function DoodleDashedCircle({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 4" className={className}>
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function DoodleSwirl({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className}>
      <path d="M4 8c2-4 8-4 9 0s-3 6-6 4 1-7 5-6 6 5 3 8" />
    </svg>
  );
}

// Słowo rozbite na litery do animacji „wciągania” (globals.css, .drain-letter).
// Czytnik ekranu dostaje całe słowo z ukrytej kopii; same litery są dla niego
// niewidoczne. NFC sklei ewentualne „a + ogonek” w jedno „ą”, żeby ogonek nie
// trafił do osobnego spanu. Rozbicie wyłącza kerning między literami: dla
// „wciągają” Baloo 2 nie ma żadnych par, dla „fesseln”/„addictive” to
// 0,017/0,005 em (~1 px przy 60 px) — niewidoczne.
function DrainWord({ word }: { word: string }) {
  const letters = Array.from(word.normalize('NFC'));
  return (
    <>
      <span className="sr-only">{word}</span>
      <span aria-hidden="true">
        {letters.map((letter, i) => (
          <span
            key={i}
            className="drain-letter"
            style={{ '--i': i } as CSSProperties}
          >
            {letter}
          </span>
        ))}
      </span>
    </>
  );
}

function SquiggleUnderline({ className }: IconProps) {
  return (
    <svg viewBox="0 0 200 14" fill="none" preserveAspectRatio="none" className={className}>
      <path
        d="M2 9c20-9 30 4 50-2s30-8 50-2 30 6 50 0 30-6 46 1"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// Falista krawędź na dole sekcji — kolor (text-*) to tło sekcji poniżej.
function WaveEdge({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-10 w-full sm:h-14 ${className}`}
    >
      <path
        d="M0 30c120 20 240 20 360 0s240-20 360 0 240 20 360 0 240-20 360 0v30H0V30z"
        fill="currentColor"
      />
    </svg>
  );
}

// Ikony i kolory stałe — kolejność odpowiada STRINGS[lang].benefits / .reasons.
const BENEFIT_ICONS = [
  { Icon: IconBrain, color: 'text-orange' },
  { Icon: IconLeaf, color: 'text-green' },
  { Icon: IconHeart, color: 'text-sky-600' },
];

const REASON_ICONS = [
  { Icon: IconPencil, color: 'bg-yellow-100 text-yellow-600' },
  { Icon: IconBrain, color: 'bg-green-light text-green' },
  { Icon: IconMoon, color: 'bg-sky-100 text-sky-600' },
  { Icon: IconHeart, color: 'bg-rose-100 text-rose-500' },
];

export default function HomePage({
  lang,
  heroBooks,
  featuredBooks,
}: {
  lang: SiteLang;
  // Kolejność w wachlarzu: pierwsza z przodu, druga po prawej, ostatnia po lewej.
  heroBooks: Book[];
  featuredBooks: Book[];
}) {
  const t = STRINGS[lang];

  return (
    <>
      <section className="notebook-grid relative overflow-hidden px-4 pb-24 pt-12 sm:px-6 sm:pb-32 sm:pt-20">
        {/* rozproszone, wyciszone doodle w tle */}
        <IconHeart className="pointer-events-none absolute right-[8%] top-[14%] hidden h-8 w-8 rotate-[8deg] text-orange/25 lg:block" />
        <DoodleDashedCircle className="pointer-events-none absolute right-[3%] top-[46%] hidden h-16 w-16 text-green/25 lg:block" />
        <IconPencil className="pointer-events-none absolute bottom-[16%] right-[6%] hidden h-10 w-10 rotate-[25deg] text-navy/20 lg:block" />
        <DoodleSwirl className="pointer-events-none absolute bottom-[22%] left-[46%] hidden h-9 w-9 text-green/20 lg:block" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-[4%] top-[4%] hidden font-display text-6xl font-800 text-navy/10 lg:block"
        >
          B
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[8%] left-[38%] hidden font-display text-5xl font-800 text-orange/10 lg:block"
        >
          {t.doodleLetter}
        </span>

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="text-center lg:text-left">
            <span className="relative inline-block animate-fade-up">
              <DoodleSparkle className="absolute -left-5 -top-5 h-6 w-6 text-orange/70" />
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-700 text-navy shadow-cover">
                {t.badge}
              </span>
            </span>

            <h1 className="animate-fade-up mt-6 font-display text-4xl font-800 leading-[1.1] text-navy sm:text-5xl lg:text-6xl [animation-delay:150ms]">
              {t.titleShout && (
                <span className="block text-6xl sm:text-7xl lg:text-8xl">{t.titleShout}</span>
              )}
              {t.titleLines.map((line, index) => (
                <Fragment key={line}>
                  {index > 0 && (
                    <>
                      <br className="hidden lg:inline" />{' '}
                    </>
                  )}
                  {line}
                </Fragment>
              ))}{' '}
              <br />
              {t.titlePrefix && <>{t.titlePrefix} </>}
              <span className="relative inline-block text-orange">
                <DrainWord word={t.titleAccent} />
                <SquiggleUnderline className="drain-squiggle absolute -bottom-2 left-0 h-3 w-full text-orange" />
              </span>
            </h1>

            <p className="animate-fade-up mx-auto mt-8 max-w-lg text-base leading-relaxed text-ink/80 sm:text-xl lg:mx-0 [animation-delay:250ms]">
              {t.lead}
            </p>

            <div className="animate-fade-up mt-8 flex flex-col items-center gap-4 lg:items-start [animation-delay:300ms]">
              <Link
                href={`/${lang}/books`}
                className="inline-flex items-center gap-3 rounded-full bg-orange px-9 py-4 text-lg font-bold text-white shadow-cover transition hover:bg-orange/90"
              >
                {t.cta}
                <span aria-hidden="true">→</span>
              </Link>
              {t.note && <span className="text-sm font-semibold text-ink/70">{t.note}</span>}
            </div>

            <ul className="animate-fade-up mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 text-left text-sm font-semibold leading-snug text-ink/80 lg:justify-start [animation-delay:350ms]">
              {t.benefits.map(([first, second], index) => {
                const { Icon, color } = BENEFIT_ICONS[index];
                return (
                  <li key={first} className="flex items-center gap-3">
                    <Icon className={`h-9 w-9 shrink-0 ${color}`} />
                    <span>
                      {first}
                      <br />
                      {second}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:mx-0 lg:max-w-md lg:justify-self-end">
            <DoodleStar className="absolute -left-6 -top-6 hidden h-6 w-6 rotate-[-15deg] text-orange/70 sm:block" />
            <DoodleStar className="absolute -bottom-2 -left-8 hidden h-4 w-4 rotate-[10deg] text-orange/50 sm:block" />
            <DoodleSparkle className="absolute -right-7 top-8 hidden h-7 w-7 text-yellow-500/60 sm:block" />

            {/* miękki cień na "podłodze" */}
            <div className="absolute inset-x-8 -bottom-3 h-8 rounded-full bg-ink/15 blur-2xl" aria-hidden="true" />

            <HeroFan
              lang={lang}
              books={heroBooks.map(({ slug, title, subtitle, coverImage }) => ({ slug, title, subtitle, coverImage }))}
            />
          </div>
        </div>

        <WaveEdge className="text-paper" />
      </section>

      <section className="relative px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center font-display text-3xl font-800 text-navy sm:text-4xl">
            <span className="relative inline-block">
              {t.audiencesTitle}
              <DoodleSparkle className="absolute -right-8 -top-3 hidden h-6 w-6 text-orange/70 sm:block" />
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-base text-ink/70 sm:text-lg">
            {t.audiencesLead}
          </p>
          <div className="mt-10">
            <AudienceLinks lang={lang} />
          </div>
        </div>
      </section>

      {featuredBooks.length > 0 && (
        <section className="border-y border-ink/10 bg-paper-dark px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center font-display text-2xl font-700 text-navy sm:text-3xl">
              {t.featuredTitle}
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredBooks.map((book) => (
                <BookCard key={book.slug} book={book} siteLang={lang} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="relative bg-white px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[280px_1fr] lg:items-start lg:gap-16">
          <div className="text-center lg:text-left">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100 text-2xl lg:mx-0">
              <span aria-hidden="true">🙂</span>
            </div>
            <h2 className="mt-4 font-display text-2xl font-700 leading-snug text-navy sm:text-3xl">
              {t.whyLine}{' '}
              <br />
              {t.whyPrefix && `${t.whyPrefix} `}
              <span className="relative inline-block">
                {t.whyAccent}
                <SquiggleUnderline className="absolute -bottom-2 left-0 h-2.5 w-full text-green" />
              </span>
            </h2>
          </div>

          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {t.reasons.map((reason, index) => {
              const { Icon, color } = REASON_ICONS[index];
              return (
                <div key={reason.title}>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-3 font-display text-base font-700 text-navy">{reason.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">{reason.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* przejście do stopki */}
        <WaveEdge className="text-paper-dark" />
      </section>
    </>
  );
}

import { Fragment } from 'react';
import Link from 'next/link';
import HeroFan from '@/components/HeroFan';
import OpenBook from '@/components/OpenBook';
import SeriesDoors from '@/components/SeriesDoors';
import { getBookBySlug } from '@/data/books';
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
  // Wyróżnione słowo; pod nim rysuje się falka (raz, po wejściu na stronę).
  titleAccent: string;
  lead: string;
  cta: string;
  // Opcjonalna adnotacja pod przyciskiem.
  note?: string;
  benefits: [string, string][];
  audiencesTitle: string;
  audiencesLead: string;
  // Sekcja z otwartą książką (strony przykładowe zamiast zdjęcia produktu).
  inside: { eyebrow: string; title: string; text: string; link: string; slug: string };
  whyLine: string;
  whyPrefix: string;
  whyAccent: string;
  reasons: { title: string; text: string }[];
  // Wyciszona litera w tle sekcji hero.
};

const STRINGS: Record<SiteLang, Strings> = {
  pl: {
    badge: 'Dla dzieci i dorosłych',
    titleShout: 'Uwaga,',
    titleLines: ['te zagadki'],
    titlePrefix: '',
    titleAccent: 'wciągają',
    lead: 'Łamigłówki, zadania logiczne i matematyczne, które wciągają, a przy tym relaksują i ćwiczą umysł.',
    cta: 'Zobacz książki',
    benefits: [
      ['Rozwijają', 'spostrzegawczość'],
      ['Relaks', 'bez ekranu'],
      ['Dla każdego', 'od 5 do 105 lat'],
    ],
    audiencesTitle: 'Wybierz coś dla siebie',
    audiencesLead: 'Łamigłówki na każdą okazję dla całej rodziny.',
    inside: {
      eyebrow: 'Zajrzyj do środka',
      title: 'Duży druk, który naprawdę widać',
      text: 'Dwie zagadki na stronę, wyraźne kratki i cyfry, które nie męczą oczu. Tak wygląda środek naszych książek z sudoku dużym drukiem.',
      link: 'Zobacz książkę',
      slug: 'sudoku-duzym-drukiem-100',
    },
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
  },
  de: {
    badge: 'Für Kinder und Erwachsene',
    titleShout: 'Achtung,',
    titleLines: ['diese Rätsel'],
    titlePrefix: '',
    titleAccent: 'fesseln',
    lead: 'Mitmachbücher, Rätsel und Logikaufgaben, die fesseln und dabei entspannen und den Kopf trainieren.',
    cta: 'Bücher ansehen',
    benefits: [
      ['Schärfen die', 'Aufmerksamkeit'],
      ['Entspannung', 'ohne Bildschirm'],
      ['Für alle von 5', 'bis 105 Jahren'],
    ],
    audiencesTitle: 'Finde etwas für dich',
    audiencesLead: 'Rätsel für jede Gelegenheit — für Kinder, Erwachsene und die ganze Familie.',
    inside: {
      eyebrow: 'Ein Blick hinein',
      title: 'Großdruck, den man wirklich lesen kann',
      text: 'Zwei Rätsel pro Seite, klare Kästchen und Ziffern, die die Augen schonen. So sehen unsere Sudoku-Bücher im Großdruck von innen aus.',
      link: 'Zum Buch',
      slug: 'sudoku-grossdruck-100',
    },
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
  },
  en: {
    badge: 'For kids and adults',
    titleShout: 'Warning:',
    titleLines: ['these puzzles'],
    titlePrefix: 'are',
    titleAccent: 'addictive',
    lead: "Activity books, puzzles and logic games so addictive you won't put them down, and they help you relax and keep your mind sharp.",
    cta: 'Browse books',
    benefits: [
      ['Sharpen', 'attention'],
      ['Screen-free', 'relaxation'],
      ['For everyone', 'aged 5 to 105'],
    ],
    audiencesTitle: 'Find something for you',
    audiencesLead: 'Puzzles for every occasion — for kids, adults and the whole family.',
    inside: {
      eyebrow: 'Look inside',
      title: 'Large print you can actually read',
      text: 'Two puzzles per page, clear grids and digits that are easy on the eyes. This is what the inside of our large print sudoku books looks like.',
      link: 'See the book',
      slug: 'large-print-sudoku-100',
    },
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
  },
};

function SquiggleUnderline({ className }: IconProps) {
  return (
    <svg viewBox="0 0 200 14" fill="none" preserveAspectRatio="none" className={className}>
      <path
        d="M2 9c20-9 30 4 50-2s30-8 50-2 30 6 50 0 30-6 46 1"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// Ikony i kolory stałe — kolejność odpowiada STRINGS[lang].benefits / .reasons.


export default function HomePage({
  lang,
  heroBooks,
}: {
  lang: SiteLang;
  // Kolejność w wachlarzu: pierwsza z przodu, druga po prawej, ostatnia po lewej.
  heroBooks: Book[];
  // Dawna lista wyróżnionych — strona główna ma teraz drzwi do serii (SeriesDoors).
  featuredBooks?: Book[];
}) {
  const t = STRINGS[lang];

  return (
    <>
      <section className="relative overflow-hidden px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-20">
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="text-center lg:text-left">
            <span className="inline-flex animate-fade-up items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-ink/70">
              <span className="h-px w-8 bg-orange" aria-hidden="true" />
              {t.badge}
            </span>

            <h1 className="animate-fade-up relative z-[35] mt-6 font-display text-5xl font-800 leading-[1.05] text-navy sm:text-6xl lg:text-7xl [animation-delay:150ms]">
              {/* „Uwaga,” to tylko zapowiedź — mniejsza od zdania, które niesie treść. */}
              {t.titleShout && (
                <span className="mb-2 block text-2xl font-600 italic text-navy/60 sm:text-3xl lg:text-4xl">{t.titleShout}</span>
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
                {t.titleAccent}
                <SquiggleUnderline className="squiggle-draw absolute -bottom-2 left-0 h-3 w-full text-orange" />
              </span>
            </h1>

            <p className="animate-fade-up mx-auto mt-8 max-w-lg text-base leading-relaxed text-ink/80 sm:text-xl lg:mx-0 [animation-delay:250ms]">
              {t.lead}
            </p>

            <div className="animate-fade-up mt-8 flex flex-col items-center gap-4 lg:items-start [animation-delay:300ms]">
              <Link
                href={`/${lang}/books`}
                className="inline-flex items-center gap-3 rounded-md bg-orange px-8 py-4 text-base font-semibold text-white transition hover:bg-orange/90 sm:text-lg"
              >
                {t.cta}
                <span aria-hidden="true">→</span>
              </Link>
              {t.note && <span className="text-sm font-semibold text-ink/70">{t.note}</span>}
            </div>

            <ul className="animate-fade-up mt-10 hidden flex-wrap justify-center sm:flex gap-x-6 gap-y-2 border-t border-ink/10 pt-6 text-sm text-ink/70 lg:justify-start [animation-delay:350ms]">
              {t.benefits.map(([first, second]) => (
                <li key={first} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-orange" aria-hidden="true" />
                  {first} {second}
                </li>
              ))}
            </ul>
          </div>

          {/* Ciepły łuk za wachlarzem — jak okno księgarni. Okładki stoją na nim
              i lekko wystają poza krawędź, co daje głębię bez ciężkiego bloku. */}
          <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:mx-0 lg:max-w-[34rem] lg:justify-self-end">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-[54px] top-[-8%] rounded-t-full bg-[#F3DDB0]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-[54px] top-[-8%] rounded-t-full bg-[radial-gradient(70%_45%_at_50%_28%,rgba(255,255,255,0.35),transparent_75%)]"
            />
            {/* cienka linia „parapetu”, na którym stoją książki */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-[4%] bottom-[54px] h-px bg-ink/20" />
            <div className="relative px-10 pt-10 sm:px-14">
              <HeroFan
                lang={lang}
                books={heroBooks.map(({ slug, title, subtitle, coverImage }) => ({ slug, title, subtitle, coverImage }))}
              />
            </div>
          </div>
        </div>

      </section>

      <section className="relative px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-3xl font-700 text-navy sm:text-4xl">{t.audiencesTitle}</h2>
            <p className="max-w-md text-base text-ink/65 sm:text-right">{t.audiencesLead}</p>
          </div>
          <div className="mt-10">
            <SeriesDoors lang={lang} />
          </div>
        </div>
      </section>

      {(() => {
        const insideBook = getBookBySlug(t.inside.slug);
        const pages = insideBook?.samplePages;
        if (!insideBook || !pages || pages.length < 5) return null;
        return (
          <section className="px-4 py-20 sm:px-6 sm:py-28">
            <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div>
                <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-ink/70">
                  <span className="h-px w-8 bg-orange" aria-hidden="true" />
                  {t.inside.eyebrow}
                </p>
                <h2 className="mt-4 font-display text-4xl font-700 leading-[1.1] text-navy sm:text-5xl">{t.inside.title}</h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/75">{t.inside.text}</p>
                <Link
                  href={`/${lang}/books/${insideBook.slug}`}
                  className="mt-7 inline-flex items-center gap-2 font-medium text-navy transition-colors hover:text-orange-ink"
                >
                  {t.inside.link} <span aria-hidden="true">→</span>
                </Link>
              </div>
              {/* strony 4 i 5 to pierwsza rozkładówka z łamigłówkami */}
              <OpenBook left={pages[3]} right={pages[4]} />
            </div>
          </section>
        );
      })()}

      {/* Jasna, ciepła sekcja z numerami zamiast ikon. Ciemny blok przed
          stopką był za ciężki. */}
      <section className="relative overflow-hidden bg-[#F6E6DC] px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="font-display text-4xl font-700 leading-[1.1] text-navy sm:text-5xl">
              {t.whyLine}{' '}
              {t.whyPrefix && `${t.whyPrefix} `}
              <span className="italic text-orange">{t.whyAccent}</span>
            </h2>
          </div>

          <ol className="grid gap-x-12 sm:grid-cols-2">
            {t.reasons.map((reason, index) => (
              <li key={reason.title} className="border-t border-navy/15 pb-10 pt-6">
                <span
                  aria-hidden="true"
                  className="font-display text-5xl italic leading-none text-orange/80"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 font-display text-2xl font-700 text-navy">{reason.title}</h3>
                <p className="mt-2 leading-relaxed text-ink/70">{reason.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

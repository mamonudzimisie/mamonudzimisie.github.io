import type { Metadata } from 'next';
import Link from 'next/link';
import { SOCIALS } from '@/components/SocialLinks';
import { BOOK_LANGS, books } from '@/data/books';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'O nas',
  description:
    'Poznaj naszą historię i podejście do tworzenia książek z łamigłówkami dla dzieci i dorosłych.',
  alternates: { canonical: `${SITE_URL}/pl/about` },
};

// Ściana okładek: każda okładka raz (wydania językowe mają osobne pliki),
// lekko przechylone na przemian, jak rozłożone na stole.
const TILTS = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', 'rotate-0', '-rotate-1'];

export default function ONasPage() {
  const published = books.filter((b) => !b.comingSoon);
  // 24 dzieli się przez 4, 6 i 8 kolumn — bez osieroconej okładki w ostatnim rzędzie.
  const covers = Array.from(new Set(published.map((b) => b.coverImage))).slice(0, 24);
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 sm:gap-5 lg:grid-cols-8" aria-hidden="true">
          {covers.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src.replace('/covers/', '/covers/thumbs/')}
              alt=""
              loading="lazy"
              className={`tilt-smooth aspect-[17/22] w-full rounded-[1px_3px_3px_1px] object-cover shadow-[0_1px_2px_rgba(31,42,72,0.12),0_10px_18px_-8px_rgba(31,42,72,0.3)] ${TILTS[i % TILTS.length]}`}
            />
          ))}
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-2xl">
        <h1 className="font-display text-4xl font-800 text-navy sm:text-5xl">O nas</h1>
        <div className="mt-6 space-y-4 leading-relaxed text-ink/80">
          <p>
            Tworzymy książki z łamigłówkami — dla dzieci, dorosłych i wszystkich, którzy
            lubią zająć czymś głowę. Zaczęliśmy od wykreślanek dla najmłodszych, a dziś
            projektujemy zadania na każdy poziom trudności.
          </p>
          <p>
            Zależy nam na tym, żeby łamigłówka faktycznie wciągała: dawała chwilę
            skupienia, trochę wysiłku i satysfakcję z rozwiązania. Bez pośpiechu i bez
            ekranu.
          </p>
          <p>
            Nie mówimy, że ekrany są złe — czasem po prostu się przydają. Chcemy tylko
            dać alternatywę: prostą, papierową i naprawdę dobrze zaprojektowaną.
          </p>
          <p>
            Wszystkie nasze książki znajdziesz na Amazon — zapraszamy do{' '}
            <Link
              href="/pl/books"
              className="font-semibold text-navy underline underline-offset-4 hover:text-orange-ink"
            >
              katalogu
            </Link>
            .
          </p>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-ink/10 py-8">
          <div>
            <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink/70">Tytułów</dt>
            <dd className="mt-1 font-display text-5xl font-700 text-navy">{published.length}</dd>
          </div>
          <div>
            <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ink/70">Języki</dt>
            <dd className="mt-1 font-display text-5xl font-700 text-navy">{BOOK_LANGS.length}</dd>
          </div>
        </dl>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {SOCIALS.map(({ name, namePl, href, handle, Icon, text }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-lg bg-paper-soft p-5 transition hover:bg-paper-soft-hover"
          >
            <span
              aria-hidden="true"
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white ${text}`}
            >
              <Icon className="h-6 w-6" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-lg font-700 leading-tight text-navy">
                Obserwuj nas na {namePl}!
              </span>
              <span className="mt-1 block text-sm text-ink/70 group-hover:text-orange-ink">{handle}</span>
            </span>
          </a>
        ))}
        </div>
      </div>
    </section>
  );
}

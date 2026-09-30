import Link from 'next/link';
import type { SiteLang } from '@/lib/catalog-i18n';
import NotFoundTitle from './NotFoundTitle';

// GitHub Pages ma jeden plik 404.html na całą domenę. W HTML-u są więc wszystkie
// trzy wersje językowe, a skrypt wstawiony przed treścią ustawia data-nf na <html>
// po początku adresu (/de/…, /en/…) — jeszcze zanim przeglądarka cokolwiek narysuje,
// więc tekst nie „przeskakuje”. Widoczność wersji: reguły .nf-* w globals.css.
// Bez JS zostaje wersja polska.
export const NOT_FOUND_STRINGS: Record<
  SiteLang,
  { pageTitle: string; title: string; text: string; links: { href: string; label: string }[] }
> = {
  pl: {
    pageTitle: 'Nie znaleziono strony | ZALKA BOOKS',
    title: 'Ups, nie ma takiej strony',
    text: 'Chyba ta strona się gdzieś zgubiła — może w labiryncie?',
    links: [
      { href: '/pl', label: 'Strona główna' },
      { href: '/pl/books', label: 'Katalog książek' },
      { href: '/pl/materialy', label: 'Materiały do pobrania' },
    ],
  },
  de: {
    pageTitle: 'Seite nicht gefunden | ZALKA BOOKS',
    title: 'Hoppla, diese Seite gibt es nicht',
    text: 'Die Seite hat sich wohl verlaufen — vielleicht im Labyrinth?',
    links: [
      { href: '/de', label: 'Startseite' },
      { href: '/de/books', label: 'Alle Bücher' },
    ],
  },
  en: {
    pageTitle: 'Page not found | ZALKA BOOKS',
    title: 'Oops, this page doesn’t exist',
    text: 'It seems to have wandered off — maybe into a maze?',
    links: [
      { href: '/en', label: 'Home' },
      { href: '/en/books', label: 'All books' },
    ],
  },
};

const TITLES = { de: NOT_FOUND_STRINGS.de.pageTitle, en: NOT_FOUND_STRINGS.en.pageTitle };

const DETECT_LANG = `(function(){var l=location.pathname.split('/')[1];var t=${JSON.stringify(TITLES)};if(t[l]){var h=document.documentElement;h.setAttribute('data-nf',l);h.lang=l;document.title=t[l];}})();`;

export default function NotFoundContent() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <script dangerouslySetInnerHTML={{ __html: DETECT_LANG }} />
      <NotFoundTitle titles={TITLES} />
      {(Object.keys(NOT_FOUND_STRINGS) as SiteLang[]).map((lang) => {
        const t = NOT_FOUND_STRINGS[lang];
        const [home, ...others] = t.links;
        return (
          <div key={lang} lang={lang} className={`nf-${lang}`}>
            <Link href={home.href} className="inline-block font-display leading-none text-navy" aria-label="ZALKA BOOKS">
              <span className="flex items-baseline justify-center gap-1 text-2xl font-800 tracking-tight">
                ZALKA
                <span className="text-orange">.</span>
              </span>
              <span className="mt-0.5 block text-xs font-700 uppercase tracking-[0.4em] text-orange">Books</span>
            </Link>
            <h1 className="mt-12 font-display text-3xl font-800 text-navy sm:text-4xl">{t.title}</h1>
            <p className="mt-3 text-ink/70">{t.text}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href={home.href}
                className="rounded-full bg-orange px-6 py-3 text-sm font-bold text-white shadow-cover transition hover:bg-orange/90"
              >
                {home.label}
              </Link>
              {others.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-navy/20 bg-white px-6 py-3 text-sm font-bold text-navy transition hover:border-orange hover:text-orange"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </main>
  );
}

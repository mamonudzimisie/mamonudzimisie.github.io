import Link from 'next/link';
import SocialLinks from './SocialLinks';
import type { SiteLang } from '@/lib/catalog-i18n';
import { privacyHref, privacyPolicies } from '@/data/privacy';

// Wspólna stopka dla /pl, /de i /en — różnią się tylko teksty i linki.
const TEXT: Record<
  SiteLang,
  { tagline: string; navTitle: string; langTitle: string; rights: string; cookies: string; privacy: string; contact: string; links: { href: string; label: string }[] }
> = {
  pl: {
    tagline: 'Książki z łamigłówkami dla dzieci i dorosłych — trening koncentracji, chwila wyciszenia i dobra zabawa.',
    navTitle: 'Strona',
    langTitle: 'Język',
    rights: 'Wszystkie prawa zastrzeżone.',
    cookies: 'Ustawienia cookies',
    privacy: 'Polityka prywatności',
    contact: 'Kontakt',
    links: [
      { href: '/pl/books', label: 'Katalog książek' },
      { href: '/pl/blog', label: 'Blog' },
      { href: '/pl/materialy', label: 'Materiały do pobrania' },
      { href: '/pl/about', label: 'O nas' },
    ],
  },
  de: {
    tagline: 'Rätselbücher für Kinder und Erwachsene — Konzentrationstraining, eine ruhige Auszeit und jede Menge Spaß.',
    navTitle: 'Seite',
    langTitle: 'Sprache',
    rights: 'Alle Rechte vorbehalten.',
    cookies: 'Cookie-Einstellungen',
    privacy: 'Datenschutz',
    contact: 'Kontakt',
    links: [
      { href: '/de/books', label: 'Bücher' },
      { href: '/de/blog', label: 'Blog' },
    ],
  },
  en: {
    tagline: 'Puzzle books for kids and adults — focus training, a calm break and plenty of fun.',
    navTitle: 'Explore',
    langTitle: 'Language',
    rights: 'All rights reserved.',
    cookies: 'Cookie settings',
    privacy: 'Privacy policy',
    contact: 'Contact',
    links: [
      { href: '/en/books', label: 'Books' },
      { href: '/en/blog', label: 'Blog' },
      { href: '/en/free-printables', label: 'Free printables' },
    ],
  },
};

const LANGS: { lang: SiteLang; label: string }[] = [
  { lang: 'pl', label: 'Polski' },
  { lang: 'de', label: 'Deutsch' },
  { lang: 'en', label: 'English' },
];

export default function SiteFooter({ lang }: { lang: SiteLang }) {
  const t = TEXT[lang];
  const email = privacyPolicies[lang].email;
  return (
    <footer className="border-t border-ink/10 bg-paper px-4 sm:px-6">
      <div className="mx-auto max-w-6xl pb-10 pt-14">
        <div className="grid gap-10 sm:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <p className="font-display leading-none text-navy">
              <span className="flex items-baseline gap-0.5 text-2xl font-800 tracking-tight">
                ZALKA
                <span className="text-orange">.</span>
              </span>
              <span className="mt-1 block font-body text-[0.58rem] font-semibold uppercase tracking-[0.42em] text-ink/70">
                Books
              </span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/70">{t.tagline}</p>
            <SocialLinks lang={lang} className="mt-5" />
          </div>
          <nav aria-label={t.navTitle}>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink/70">{t.navTitle}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {t.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-ink/80 transition-colors hover:text-orange-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink/70">{t.langTitle}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {LANGS.map((item) => (
                <li key={item.lang}>
                  <Link
                    href={`/${item.lang}`}
                    hrefLang={item.lang}
                    aria-current={item.lang === lang ? 'true' : undefined}
                    className={
                      item.lang === lang
                        ? 'font-medium text-navy'
                        : 'text-ink/80 transition-colors hover:text-orange-ink'
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-12 border-t border-ink/10 pt-6 text-xs text-ink/70">
          © {new Date().getFullYear()} ZALKA BOOKS. {t.rights} ·{' '}
          <a href="#" data-cookie-settings className="underline-offset-2 hover:underline">
            {t.cookies}
          </a>
          {' · '}
          <Link href={privacyHref(lang)} className="underline-offset-2 hover:underline">
            {t.privacy}
          </Link>
          {' · '}
          {t.contact}:{' '}
          <a href={`mailto:${email}`} className="underline-offset-2 hover:underline">
            {email}
          </a>
        </p>
      </div>
    </footer>
  );
}

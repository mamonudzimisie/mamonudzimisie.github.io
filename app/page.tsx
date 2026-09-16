import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site';

// Strona statyczna (GitHub Pages) nie ma serwera, więc wersję językową
// wybieramy w przeglądarce — tylko na adresie głównym, nigdy na /pl, /de, /en.
// Kolejność: wybór zapamiętany przez przełącznik języka → pierwszy pasujący
// język przeglądarki (pl, de, en) → angielski.
const PICK_LANGUAGE = `
(function () {
  var supported = ['pl', 'de', 'en'];
  var lang = null;
  try {
    var saved = localStorage.getItem('lang');
    if (supported.indexOf(saved) !== -1) lang = saved;
  } catch (e) {}
  if (!lang) {
    var prefs = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || ''];
    for (var i = 0; i < prefs.length && !lang; i++) {
      var code = String(prefs[i]).toLowerCase().slice(0, 2);
      if (supported.indexOf(code) !== -1) lang = code;
    }
  }
  location.replace('/' + (lang || 'en'));
})();
`;

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: {
    languages: {
      pl: `${SITE_URL}/pl`,
      de: `${SITE_URL}/de`,
      en: `${SITE_URL}/en`,
      'x-default': `${SITE_URL}/en`,
    },
  },
};

export default function RootPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: PICK_LANGUAGE }} />
      {/* Widoczne tylko bez JavaScriptu albo przez ułamek sekundy. */}
      <nav className="flex flex-1 items-center justify-center gap-6 px-4 py-24 font-semibold text-navy">
        <Link href="/pl" hrefLang="pl">🇵🇱 Polski</Link>
        <Link href="/de" hrefLang="de">🇩🇪 Deutsch</Link>
        <Link href="/en" hrefLang="en">🇬🇧 English</Link>
      </nav>
    </>
  );
}

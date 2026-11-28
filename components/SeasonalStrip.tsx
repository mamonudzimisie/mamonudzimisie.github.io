'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { SiteLang } from '@/lib/catalog-i18n';

// Sezonowy pasek na stronie głównej (np. prezenty na Mikołajki i święta).
// Znika sam po dacie `until`: przy budowaniu strony nie trafia do HTML-a,
// a jeśli strona nie była przebudowana, ukrywa go przeglądarka. Nowy sezon =
// nowy wpis w SEASONAL.
type Seasonal = { text: string; link: string; href: string; until: string };

const SEASONAL: Partial<Record<SiteLang, Seasonal>> = {
  pl: {
    text: 'Szukasz prezentu na Mikołajki albo pod choinkę?',
    link: 'Poradnik: co dla kogo',
    href: '/pl/blog/lamiglowki-na-prezent-mikolajki-swieta',
    until: '2026-12-24',
  },
  de: {
    text: 'Noch ein Geschenk für Nikolaus oder Weihnachten gesucht?',
    link: 'Rätselbücher im Großdruck ansehen',
    href: '/de/raetsel-grossdruck',
    until: '2026-12-24',
  },
};

function isActive(until: string): boolean {
  return new Date().toISOString().slice(0, 10) <= until;
}

export default function SeasonalStrip({ lang }: { lang: SiteLang }) {
  const item = SEASONAL[lang];
  // Stan startowy zawsze true, żeby HTML z budowania i pierwszy render
  // w przeglądarce były zgodne; datę sprawdza efekt.
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (item && !isActive(item.until)) setVisible(false);
  }, [item]);
  if (!item || !visible) return null;
  if (typeof window === 'undefined' && !isActive(item.until)) return null;
  return (
    <div className="px-4 sm:px-6">
      <Link
        href={item.href}
        className="group mx-auto flex max-w-6xl flex-col items-center justify-center gap-x-3 gap-y-1 rounded-2xl bg-[#F6E6DC] px-5 py-4 text-center text-base text-navy ring-1 ring-orange/20 transition hover:ring-orange/50 sm:flex-row"
      >
        <span>{item.text}</span>
        <span className="font-semibold text-orange underline underline-offset-4">
          {item.link} <span aria-hidden="true">→</span>
        </span>
      </Link>
    </div>
  );
}

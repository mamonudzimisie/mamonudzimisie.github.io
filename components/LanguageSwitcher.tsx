'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const LOCALES = [
  { code: 'pl', short: 'PL', flag: '🇵🇱', label: 'Polski', href: '/pl' },
  { code: 'de', short: 'DE', flag: '🇩🇪', label: 'Deutsch', href: '/de' },
];

export default function LanguageSwitcher({ current }: { current: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('click', onClickOutside);
    return () => document.removeEventListener('click', onClickOutside);
  }, []);

  const currentLocale = LOCALES.find((l) => l.code === current) ?? LOCALES[0];
  const others = LOCALES.filter((l) => l.code !== current);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Zmień język (obecnie ${currentLocale.label})`}
        className="flex items-center gap-1 whitespace-nowrap rounded-full border border-ink/15 px-3 py-1.5 text-sm font-semibold text-ink/80 transition hover:border-orange hover:text-orange"
      >
        <span>{currentLocale.short}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && others.length > 0 && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-10 mt-2 min-w-[6rem] overflow-hidden rounded-lg border border-ink/10 bg-paper shadow-md"
        >
          {others.map((l) => (
            <li key={l.code}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-ink/80 hover:bg-ink/5"
              >
                <span aria-hidden="true">{l.flag}</span>
                <span>{l.short}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

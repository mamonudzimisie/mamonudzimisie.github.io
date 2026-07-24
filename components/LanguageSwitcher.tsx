'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const LOCALES = [
  { code: 'pl', flag: '🇵🇱', label: 'Polski', href: '/' },
  { code: 'de', flag: '🇩🇪', label: 'Deutsch', href: '/de' },
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
        className="flex items-center justify-center rounded-full border border-ink/10 px-2 py-1 text-lg leading-none hover:border-orange"
      >
        <span aria-hidden="true">{currentLocale.flag}</span>
      </button>
      {open && others.length > 0 && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-10 mt-2 overflow-hidden rounded-lg border border-ink/10 bg-paper shadow-md"
        >
          {others.map((l) => (
            <li key={l.code}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                aria-label={l.label}
                className="flex items-center justify-center px-3 py-2 text-lg hover:bg-ink/5"
              >
                <span aria-hidden="true">{l.flag}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

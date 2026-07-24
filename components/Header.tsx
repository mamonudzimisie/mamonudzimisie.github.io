import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';

function LogoMark() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="h-8 w-8 shrink-0 -rotate-6 text-orange">
      <path
        d="M8 24l1.5-6L20 7.5 24.5 12 14 22.5 8 24z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M18.5 9.5L22 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="relative z-50 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 whitespace-nowrap">
          <LogoMark />
          <span className="font-display leading-tight text-navy">
            <span className="block text-lg font-800 sm:text-xl">Książeczki</span>
            <span className="block text-xs font-600 text-navy/70 sm:text-sm">aktywnościowe</span>
          </span>
        </Link>
        <nav className="flex items-center gap-3 text-sm font-semibold sm:gap-6 sm:text-base">
          <Link href="/ksiazki" className="whitespace-nowrap hover:text-orange">
            Książki
          </Link>
          <Link href="/o-nas" className="whitespace-nowrap hover:text-orange">
            O nas
          </Link>
          <Link href="/blog" className="whitespace-nowrap hover:text-orange">
            Blog
          </Link>
          <Link
            href="/ksiazki"
            className="hidden whitespace-nowrap rounded-full bg-orange px-5 py-2 text-sm font-bold text-white shadow-cover transition hover:bg-orange/90 sm:inline-flex"
          >
            Zobacz książeczki
          </Link>
          <LanguageSwitcher current="pl" />
        </nav>
      </div>
    </header>
  );
}

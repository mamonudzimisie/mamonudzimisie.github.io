import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  return (
    <header className="relative z-50 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-4 sm:px-6">
        <Link href="/" className="whitespace-nowrap font-display text-lg font-800 text-navy sm:text-xl">
          Książeczki aktywnościowe
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
          <LanguageSwitcher current="pl" />
        </nav>
      </div>
    </header>
  );
}

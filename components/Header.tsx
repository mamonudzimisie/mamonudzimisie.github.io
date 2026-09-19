import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  return (
    <header className="relative z-50 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-4 sm:px-6">
        <Link href="/pl" className="flex items-center whitespace-nowrap" aria-label="ZALKA BOOKS">
          <span className="font-display leading-none text-navy">
            <span className="flex items-baseline gap-1 text-xl font-800 tracking-tight sm:text-2xl">
              ZALKA
              <span className="text-orange">.</span>
            </span>
            <span className="mt-0.5 block text-[0.6rem] font-700 uppercase tracking-[0.4em] text-orange sm:text-xs">
              Books
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-3 text-sm font-semibold sm:gap-6 sm:text-base">
          <Link href="/pl/about" className="whitespace-nowrap hover:text-orange">
            O nas
          </Link>
          <Link href="/pl/blog" className="whitespace-nowrap hover:text-orange">
            Blog
          </Link>
          <Link href="/pl/materialy" className="hidden whitespace-nowrap hover:text-orange md:inline">
            Do pobrania
          </Link>
          <Link
            href="/pl/books"
            className="inline-flex whitespace-nowrap rounded-full bg-orange px-5 py-2 text-sm font-bold text-white shadow-cover transition hover:bg-orange/90"
          >
            Zobacz książki
          </Link>
          <LanguageSwitcher current="pl" />
        </nav>
      </div>
    </header>
  );
}

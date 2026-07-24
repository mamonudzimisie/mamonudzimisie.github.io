import Image from 'next/image';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  return (
    <header className="relative z-50 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 whitespace-nowrap">
          <Image src="/logo.png" alt="" width={40} height={40} className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" priority />
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

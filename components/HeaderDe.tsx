import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';

export default function HeaderDe() {
  return (
    <header className="relative z-50 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/de" className="flex items-center whitespace-nowrap" aria-label="ZALKA BOOKS">
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
        <nav className="flex items-center gap-4 text-sm font-semibold sm:gap-6 sm:text-base">
          <Link href="/de/blog" className="whitespace-nowrap hover:text-orange">
            Blog
          </Link>
          <Link
            href="/de/books"
            className="inline-flex whitespace-nowrap rounded-full bg-orange px-5 py-2 text-sm font-bold text-white shadow-cover transition hover:bg-orange/90"
          >
            Bücher ansehen
          </Link>
          <LanguageSwitcher current="de" />
        </nav>
      </div>
    </header>
  );
}

import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import { getPosts } from '@/data/posts';

export default function HeaderDe() {
  return (
    <header className="relative z-50 border-b border-ink/10 bg-paper/95 px-4 backdrop-blur sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-3 py-4 sm:gap-x-6">
        <Link href="/de" className="flex items-center whitespace-nowrap" aria-label="ZALKA BOOKS">
          <span className="font-display leading-none text-navy">
            <span className="flex items-baseline gap-0.5 text-2xl font-800 tracking-tight sm:text-[1.7rem]">
              ZALKA
              <span className="text-orange">.</span>
            </span>
            <span className="mt-1 block font-body text-[0.58rem] font-semibold uppercase tracking-[0.42em] text-ink/70 sm:text-[0.62rem]">
              Books
            </span>
          </span>
        </Link>
        {/* Na telefonie linki schodzą do drugiego rzędu, żeby nie dotykały logo. */}
        {/* Menu (na razie tylko Blog) pojawi się z pierwszym wpisem po niemiecku —
            pusty <nav> dodawałby na telefonie pusty drugi rząd. */}
        {getPosts('de').length > 0 && (
          <nav className="order-last flex w-full items-center justify-center gap-6 text-sm font-medium md:order-none md:ml-auto md:w-auto md:text-base">
            <Link href="/de/blog" className="whitespace-nowrap hover:text-orange-ink transition-colors">
              Blog
            </Link>
          </nav>
        )}
        <div className="flex items-center gap-3 sm:gap-6">
          <Link
            href="/de/books"
            className="inline-flex whitespace-nowrap rounded-md border border-navy/80 px-4 py-2 text-sm font-semibold text-navy transition hover:bg-navy hover:text-white"
          >
            Bücher ansehen
          </Link>
          <LanguageSwitcher current="de" />
        </div>
      </div>
    </header>
  );
}

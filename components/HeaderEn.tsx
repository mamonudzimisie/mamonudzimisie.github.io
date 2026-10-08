import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';

export default function HeaderEn() {
  return (
    <header className="relative z-50 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-4 py-4 sm:gap-x-6 sm:px-6">
        <Link href="/en" className="flex items-center whitespace-nowrap" aria-label="ZALKA BOOKS">
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
        {/* Na telefonie linki schodzą do drugiego rzędu, żeby zmieścił się przełącznik języka. */}
        <nav className="order-last flex w-full items-center justify-center gap-6 text-sm font-semibold md:order-none md:ml-auto md:w-auto md:text-base">
          <Link href="/en/blog" className="whitespace-nowrap hover:text-orange">
            Blog
          </Link>
          <Link href="/en/free-printables" className="whitespace-nowrap hover:text-orange">
            Free printables
          </Link>
        </nav>
        <div className="flex items-center gap-3 sm:gap-6">
          <Link
            href="/en/books"
            className="inline-flex whitespace-nowrap rounded-full bg-orange px-5 py-2 text-sm font-bold text-white shadow-cover transition hover:bg-orange/90"
          >
            Browse books
          </Link>
          <LanguageSwitcher current="en" />
        </div>
      </div>
    </header>
  );
}

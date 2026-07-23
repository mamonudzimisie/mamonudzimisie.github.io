import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-ink/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="font-display text-lg font-800 text-navy sm:text-xl">
          Książeczki aktywnościowe
        </Link>
        <nav className="flex items-center gap-4 text-sm font-semibold sm:gap-6 sm:text-base">
          <Link href="/ksiazki" className="hover:text-orange">
            Książki
          </Link>
          <Link href="/o-nas" className="hover:text-orange">
            O nas
          </Link>
          <Link href="/blog" className="hover:text-orange">
            Blog
          </Link>
          <Link href="/de" className="hover:text-orange">
            DE
          </Link>
        </nav>
      </div>
    </header>
  );
}

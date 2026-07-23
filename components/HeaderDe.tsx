import Link from 'next/link';

export default function HeaderDe() {
  return (
    <header className="border-b border-ink/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/de" className="font-display text-lg font-800 text-navy sm:text-xl">
          Beschäftigungsbücher
        </Link>
        <nav className="flex items-center gap-4 text-sm font-semibold sm:gap-6 sm:text-base">
          <Link href="/" className="hover:text-orange">
            PL
          </Link>
        </nav>
      </div>
    </header>
  );
}

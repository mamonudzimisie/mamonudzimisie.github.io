import Link from 'next/link';
import SocialLinks from './SocialLinks';

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-paper-dark">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
          <div>
            <div className="flex items-center">
              <p className="font-display leading-none text-navy">
                <span className="flex items-baseline gap-0.5 text-xl font-800 tracking-tight">
                  ZALKA
                  <span className="text-orange">.</span>
                </span>
                <span className="mt-1 block font-body text-[0.55rem] font-semibold uppercase tracking-[0.42em] text-ink/55">
                  Books
                </span>
              </p>
            </div>
            <p className="mt-2 max-w-sm text-sm text-ink/70">
              Książki z łamigłówkami dla dzieci i dorosłych — trening koncentracji,
              chwila wyciszenia i dobra zabawa.
            </p>
            <SocialLinks lang="pl" className="mt-4" />
          </div>
          <nav className="flex flex-col gap-2 text-sm font-semibold sm:items-end">
            <Link href="/pl/books" className="hover:text-orange">
              Katalog książek
            </Link>
            <Link href="/pl/materialy" className="hover:text-orange">
              Materiały do pobrania
            </Link>
            <Link href="/pl/about" className="hover:text-orange">
              O nas
            </Link>
          </nav>
        </div>
        <p className="mt-8 border-t border-ink/10 pt-6 text-xs text-ink/50">
          © {new Date().getFullYear()} ZALKA BOOKS. Wszystkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  );
}

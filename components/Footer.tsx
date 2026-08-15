import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-paper-dark">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
          <div>
            <div className="flex items-center">
              <p className="font-display leading-none text-navy">
                <span className="flex items-baseline gap-1 text-lg font-800 tracking-tight">
                  ZALKA
                  <span className="text-orange">.</span>
                </span>
                <span className="mt-0.5 block text-[0.55rem] font-700 uppercase tracking-[0.4em] text-orange">
                  Books
                </span>
              </p>
            </div>
            <p className="mt-2 max-w-sm text-sm text-ink/70">
              Książki z łamigłówkami dla dzieci i dorosłych — trening koncentracji,
              chwila wyciszenia i dobra zabawa.
            </p>
          </div>
          <nav className="flex flex-col gap-2 text-sm font-semibold sm:items-end">
            <Link href="/pl/books" className="hover:text-orange">
              Katalog książek
            </Link>
            <Link href="/pl/about" className="hover:text-orange">
              O nas
            </Link>
          </nav>
        </div>
        <p className="mt-8 border-t border-ink/10 pt-6 text-xs leading-relaxed text-ink/60">
          Jako partner Amazon (Amazon Associates) zarabiamy na kwalifikujących się zakupach
          dokonanych za pośrednictwem linków na tej stronie. Nie wpływa to na cenę, jaką płacisz.
        </p>
        <p className="mt-3 text-xs text-ink/50">
          © {new Date().getFullYear()} ZALKA BOOKS. Wszystkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  );
}

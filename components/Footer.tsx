import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-paper-dark">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
          <div>
            <p className="font-display text-lg font-700 text-navy">Mamo, nudzi mi się!</p>
            <p className="mt-2 max-w-sm text-sm text-ink/70">
              Książeczki aktywnościowe, które naprawdę zajmują dzieci — bez ekranu, za to
              z kredką w ręku.
            </p>
          </div>
          <nav className="flex flex-col gap-2 text-sm font-semibold sm:items-end">
            <Link href="/ksiazki" className="hover:text-orange">
              Katalog książek
            </Link>
            <Link href="/o-nas" className="hover:text-orange">
              O nas
            </Link>
            <Link href="/blog" className="hover:text-orange">
              Blog
            </Link>
          </nav>
        </div>
        <p className="mt-8 border-t border-ink/10 pt-6 text-xs leading-relaxed text-ink/60">
          Jako partner Amazon (Amazon Associates) zarabiamy na kwalifikujących się zakupach
          dokonanych za pośrednictwem linków na tej stronie. Nie wpływa to na cenę, jaką płacisz.
        </p>
        <p className="mt-3 text-xs text-ink/50">
          © {new Date().getFullYear()} Mamo, nudzi mi się! Wszystkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  );
}

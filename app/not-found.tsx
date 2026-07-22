import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-800 text-navy">Ups, nie ma takiej strony</h1>
      <p className="mt-3 text-ink/70">
        Chyba ta strona się gdzieś zgubiła — może w labiryncie?
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-orange px-6 py-3 text-sm font-bold text-white shadow-cover hover:bg-orange/90"
      >
        Wróć na stronę główną
      </Link>
    </section>
  );
}

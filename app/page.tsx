import Link from 'next/link';
import BookCard from '@/components/BookCard';
import AgeGroupLinks from '@/components/AgeGroupLinks';
import { getFeaturedBooks } from '@/data/books';

export default function HomePage() {
  const featuredBooks = getFeaturedBooks();

  return (
    <>
      <section className="notebook-grid relative overflow-hidden border-b border-ink/10 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="speech-bubble mx-auto mb-8 inline-block max-w-xl bg-white px-6 py-4 shadow-cover sm:px-8 sm:py-6">
            <p className="font-display text-2xl font-700 text-ink sm:text-3xl">
              „Mamooo, nudzi mi się!”
            </p>
          </div>
          <h1 className="font-display text-3xl font-800 leading-tight text-navy sm:text-5xl">
            Znamy to. Dlatego stworzyliśmy te książeczki.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-ink/80 sm:text-lg">
            Wykreślanki, labirynty i kolorowanki dopasowane do wieku dziecka — żeby te
            pięć minut ciszy zamieniło się w pół godziny. Bez ekranu, za to z ołówkiem
            w ręku.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/ksiazki"
              className="rounded-full bg-orange px-8 py-3 text-base font-bold text-white shadow-cover transition hover:bg-orange/90"
            >
              Zobacz katalog książek
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-2xl font-700 text-navy sm:text-3xl">
            Dlaczego akurat książeczka aktywnościowa?
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-ink/10 bg-white/60 p-6">
              <p className="mb-3 text-3xl">🫶</p>
              <h3 className="font-display text-lg font-700">To jest okej</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">
                Każdy rodzic czasem potrzebuje 30 minut spokoju — żeby dokończyć kawę,
                odpisać na maila albo po prostu usiąść. Nie ma w tym nic złego i nie
                trzeba się z tego tłumaczyć.
              </p>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-white/60 p-6">
              <p className="mb-3 text-3xl">📱</p>
              <h3 className="font-display text-lg font-700">Tablet to za łatwe wyjście</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">
                Włączenie bajki na telefonie zajmuje pięć sekund, ale wiemy, że ekran to
                nie jest to, czego naprawdę chcemy dla naszych dzieci — nawet jeśli czasem
                się przydaje.
              </p>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-white/60 p-6">
              <p className="mb-3 text-3xl">✏️</p>
              <h3 className="font-display text-lg font-700">Kartka daje więcej</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">
                Wykreślanka czy labirynt naprawdę zajmują dziecko: uczą liter, ćwiczą
                rękę i głowę — i nie świecą w oczy przed snem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {featuredBooks.length > 0 && (
        <section className="border-y border-ink/10 bg-paper-dark px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center font-display text-2xl font-700 text-navy sm:text-3xl">
              Wyróżnione książki
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredBooks.map((book) => (
                <BookCard key={book.slug} book={book} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-2xl font-700 text-navy sm:text-3xl">
            Dla kogo?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-sm text-ink/70">
            Wybierz wiek dziecka, a pokażemy Ci dopasowane książeczki.
          </p>
          <div className="mt-10">
            <AgeGroupLinks />
          </div>
        </div>
      </section>
    </>
  );
}

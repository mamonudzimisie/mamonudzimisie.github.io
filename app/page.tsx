import Image from 'next/image';
import Link from 'next/link';
import BookCard from '@/components/BookCard';
import AgeGroupLinks from '@/components/AgeGroupLinks';
import { getFeaturedBooks } from '@/data/books';

function IconPencil() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M4 20l1-4.5L15.5 5 19 8.5 8.5 19 4 20z" />
      <path d="M13 7l3.5 3.5" />
    </svg>
  );
}

function IconNoScreen() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <rect x="7" y="2.5" width="10" height="17" rx="2" />
      <path d="M11 16.5h2" />
      <path d="M4 4l16 16" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M12 20s-7-4.4-9.5-9C0.8 7.4 2.6 4 6 4c2 0 3.5 1.2 4 2.5.5-1.3 2-2.5 4-2.5 3.4 0 5.2 3.4 3.5 7-2.5 4.6-9.5 9-9.5 9z" />
    </svg>
  );
}

function IconBackpack() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M8 8V6a4 4 0 018 0v2" />
      <rect x="5" y="8" width="14" height="13" rx="3" />
      <path d="M9 12h6" />
      <path d="M9 21v-5h6v5" />
    </svg>
  );
}

export default function HomePage() {
  const featuredBooks = getFeaturedBooks();

  return (
    <>
      <section className="notebook-grid relative overflow-hidden border-b border-ink/10 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <span className="speech-bubble inline-block bg-white px-4 py-2 shadow-cover">
              <span className="font-display text-base font-700 text-ink sm:text-lg">
                „Mamo, jeszcze jedną stronę!”
              </span>
            </span>

            <h1 className="mt-6 font-display text-3xl font-800 leading-tight text-navy sm:text-5xl">
              Zdanie, które usłyszysz
              <br />
              zamiast „nudzi mi się”
            </h1>

            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-ink/80 sm:text-lg lg:mx-0">
              Wykreślanki, labirynty i zagadki, które naprawdę wciągają.
              Bez ekranu — za to z ołówkiem w ręku.
            </p>

            <div className="mt-8 flex justify-center lg:justify-start">
              <Link
                href="/ksiazki"
                className="rounded-full bg-orange px-8 py-3 text-base font-bold text-white shadow-cover transition hover:bg-orange/90"
              >
                Zobacz książeczki
              </Link>
            </div>
          </div>

          <div className="mx-auto w-full max-w-xs lg:mx-0 lg:max-w-sm">
            <div className="rotate-2 rounded-2xl bg-white p-3 shadow-cover transition hover:rotate-0">
              <Image
                src="/covers/znajdz-slowko-5-6.png"
                alt="Okładka książeczki Znajdź słówko!"
                width={600}
                height={800}
                priority
                className="w-full rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-2xl font-700 text-navy sm:text-3xl">
            Dlaczego akurat książeczka aktywnościowa?
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div className="rounded-2xl border border-ink/10 bg-white/60 p-6">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-navy/10 text-navy">
                <IconPencil />
              </div>
              <h3 className="font-display text-lg font-700">Kartka daje więcej</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">
                Wykreślanki i labirynty to nie tylko zabawa. Dziecko ćwiczy
                koncentrację, uczy się liter i cyfr, trenuje rączkę przed pisaniem
                i rozwija logiczne myślenie.
              </p>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-white/60 p-6">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-navy/10 text-navy">
                <IconNoScreen />
              </div>
              <h3 className="font-display text-lg font-700">Zero ekranu</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">
                Bajka uspokoi na chwilę, ale nic po sobie nie zostawia — poza
                płaczem przy wyłączaniu. Kartka i kredka angażują naprawdę: głowę,
                oczy i ręce.
              </p>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-white/60 p-6">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-navy/10 text-navy">
                <IconHeart />
              </div>
              <h3 className="font-display text-lg font-700">Chwila dla Ciebie</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">
                Kawa dokończona na spokojnie, mail odpisany, moment ciszy. Dziecko
                robi coś wartościowego, więc odpoczywasz bez cienia wyrzutów
                sumienia.
              </p>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-white/60 p-6">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-navy/10 text-navy">
                <IconBackpack />
              </div>
              <h3 className="font-display text-lg font-700">Zawsze pod ręką</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/75">
                Lekka, bez ładowarki i bez zasięgu. Wrzucasz do torebki i masz
                ratunek w aucie, w pociągu i w poczekalni u lekarza.
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

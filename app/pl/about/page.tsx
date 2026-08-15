import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'O nas',
  description:
    'Poznaj naszą historię i podejście do tworzenia książek z łamigłówkami dla dzieci i dorosłych.',
};

export default function ONasPage() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl font-800 text-navy sm:text-4xl">O nas</h1>
        <div className="mt-6 space-y-4 leading-relaxed text-ink/80">
          <p>
            Tworzymy książki z łamigłówkami — dla dzieci, dorosłych i wszystkich, którzy
            lubią zająć czymś głowę. Zaczęliśmy od wykreślanek dla najmłodszych, a dziś
            projektujemy zadania na każdy poziom trudności.
          </p>
          <p>
            Zależy nam na tym, żeby łamigłówka faktycznie wciągała: dawała chwilę
            skupienia, trochę wysiłku i satysfakcję z rozwiązania. Bez pośpiechu i bez
            ekranu.
          </p>
          <p>
            Nie mówimy, że ekrany są złe — czasem po prostu się przydają. Chcemy tylko
            dać alternatywę: prostą, papierową i naprawdę dobrze zaprojektowaną.
          </p>
          <p>
            Wszystkie nasze książki znajdziesz na Amazon — zapraszamy do{' '}
            <a
              href="/pl/books"
              className="font-semibold text-navy underline underline-offset-4 hover:text-orange"
            >
              katalogu
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

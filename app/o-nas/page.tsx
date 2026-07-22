import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'O nas',
  description:
    'Poznaj markę „Mamo, nudzi mi się!” — historię i podejście do tworzenia książeczek aktywnościowych dla dzieci.',
};

export default function ONasPage() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl font-800 text-navy sm:text-4xl">O nas</h1>
        <div className="mt-6 space-y-4 leading-relaxed text-ink/80">
          <p>
            „Mamo, nudzi mi się!” to zdanie, które słyszy chyba każdy rodzic — zwykle w
            najmniej odpowiednim momencie. My usłyszeliśmy je wystarczająco wiele razy,
            żeby postanowić coś z tym zrobić.
          </p>
          <p>
            Zamiast kolejnej bajki na telefonie, wolimy podać dziecku kredkę i kartkę.
            Nasze książeczki — wykreślanki, labirynty i kolorowanki — projektujemy tak,
            żeby faktycznie zajmowały uwagę: uczyły liter, ćwiczyły rękę i głowę, a przy
            okazji dawały rodzicom te kilkanaście minut spokoju, na które naprawdę
            zasługują.
          </p>
          <p>
            Nie obiecujemy cudów i nie mówimy, że ekrany są złe — czasem po prostu się
            przydają. Chcemy tylko dać alternatywę: prostą, papierową i sprawdzoną przez
            prawdziwe dzieci.
          </p>
          <p>
            Wszystkie nasze książeczki znajdziesz na Amazon — zapraszamy do{' '}
            <a
              href="/ksiazki"
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

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Zabawy bez ekranu dla 5-latka',
  description:
    'Sprawdzone pomysły na zabawy bez ekranu dla 5-letniego dziecka — proste, tanie i naprawdę angażujące.',
};

export default function BlogPost() {
  return (
    <article className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/blog"
          className="text-sm font-semibold text-navy underline underline-offset-4 hover:text-orange"
        >
          ← Wróć do bloga
        </Link>
        <h1 className="mt-4 font-display text-3xl font-800 text-navy sm:text-4xl">
          Zabawy bez ekranu dla 5-latka
        </h1>
        <div className="mt-6 space-y-4 leading-relaxed text-ink/80">
          <p>
            Pięciolatek to już mały odkrywca — potrafi się skupić dłużej niż maluch, ale
            wciąż potrzebuje prowadzenia za rękę. Oto kilka sprawdzonych sposobów na
            zajęcie go bez sięgania po ekran.
          </p>
          <p>
            <strong>Wykreślanki i labirynty.</strong> To świetny sposób na naukę liter i
            ćwiczenie koncentracji — a przy okazji dziecko ma poczucie, że robi coś
            &bdquo;na poważnie&rdquo;.
          </p>
          <p>
            <strong>Budowanie z tego, co pod ręką.</strong> Klocki, poduszki, pudełka po
            butach — z byle czego można zbudować zamek albo tor przeszkód.
          </p>
          <p>
            <strong>Wspólne gotowanie prostych rzeczy.</strong> Mieszanie, przesypywanie,
            układanie kanapek w kształty — dzieci uwielbiają czuć się pomocne.
          </p>
          <p>
            Ten artykuł będzie się rozrastał — zaglądaj tu od czasu do czasu po nowe
            pomysły.
          </p>
        </div>
      </div>
    </article>
  );
}

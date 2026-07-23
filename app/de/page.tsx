import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  alternates: {
    languages: {
      pl: SITE_URL,
      de: `${SITE_URL}/de`,
    },
  },
};

export default function HomePageDe() {
  return (
    <>
      <section className="notebook-grid relative overflow-hidden border-b border-ink/10 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <span className="speech-bubble inline-block bg-white px-4 py-2 shadow-cover">
            <span className="font-display text-base font-700 text-ink sm:text-lg">
              „Mama, noch eine Seite!“
            </span>
          </span>

          <h1 className="mt-6 font-display text-3xl font-800 leading-tight text-navy sm:text-5xl">
            Der Satz, den du hörst
            <br />
            statt „mir ist langweilig“
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink/80 sm:text-lg">
            Wortsuchrätsel, Labyrinthe und Rätsel, die Kinder wirklich fesseln.
            Ganz ohne Bildschirm — dafür mit Stift in der Hand.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-700 text-navy sm:text-3xl">
            Bald verfügbar
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink/80">
            Wir arbeiten gerade an unseren ersten Beschäftigungsbüchern für den
            deutschen Markt. Schau bald wieder vorbei!
          </p>
        </div>
      </section>
    </>
  );
}

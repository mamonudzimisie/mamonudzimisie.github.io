import type { Metadata } from 'next';
import AudienceLinksDe from '@/components/AudienceLinksDe';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  alternates: {
    languages: {
      pl: `${SITE_URL}/pl`,
      de: `${SITE_URL}/de`,
    },
  },
};

export default function HomePageDe() {
  return (
    <>
      <section className="notebook-grid relative overflow-hidden border-b border-ink/10 px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <span
            className="speech-bubble animate-bubble-pop inline-block bg-white px-4 py-2 shadow-cover"
            style={{ ['--bubble-rotate' as string]: '-2deg' }}
          >
            <span className="font-display text-base font-700 text-ink sm:text-lg">
              „Mama, noch eine Seite!“
            </span>
          </span>

          <h1 className="animate-fade-up mt-10 font-display text-3xl font-800 leading-tight text-navy sm:text-5xl [animation-delay:150ms]">
            Der Satz, den du hörst
            <br />
            statt „mir ist langweilig“
          </h1>

          <p className="animate-fade-up mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink/80 sm:text-lg [animation-delay:250ms]">
            Wortsuchrätsel, Labyrinthe und Rätsel, die Kinder wirklich fesseln.
            Ganz ohne Bildschirm — dafür mit Stift in der Hand.
          </p>
        </div>
      </section>

      <section className="relative px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-2xl font-700 text-navy sm:text-3xl">
            Wähle etwas für dich
          </h2>
          <div className="mt-10">
            <AudienceLinksDe />
          </div>
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

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bücher',
  description:
    'Bald verfügbar: Wortsuchrätsel, Labyrinthe und Logikrätsel für Kinder und Erwachsene.',
};

export default function BooksDe() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-3xl font-800 text-navy sm:text-4xl">Bücher</h1>
        <p className="mt-4 text-base leading-relaxed text-ink/80">
          Wir arbeiten gerade an unseren ersten Rätselbüchern für den deutschen
          Markt. Schau bald wieder vorbei!
        </p>
      </div>
    </section>
  );
}

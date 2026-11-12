import type { Metadata } from 'next';
import { downloadSets } from '@/data/downloads';
import { SITE_URL } from '@/lib/site';
import DownloadsGrid from '@/components/DownloadsGrid';

const TITLE = 'Sudoku Jigsaw, Killer Sudoku i wykreślanki do druku – materiały do pobrania';
const DESCRIPTION =
  'Darmowe łamigłówki do wydrukowania: Sudoku Jigsaw i Killer Sudoku dla dorosłych z poradnikiem oraz wykreślanki dla dzieci 5–7 lat (jesień, Halloween). PDF z rozwiązaniami – do domu, szkoły i klubu.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/pl/materialy` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/og/pl.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export default function MaterialyPage() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-3xl font-800 text-navy sm:text-4xl">
          Łamigłówki do druku
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink/70">
          Chcesz sprawdzić, czy nasze łamigłówki są dla Ciebie — albo czy wykreślanki
          spodobają się dziecku? Pobierz darmowe plansze, wydrukuj i weź ołówek albo kredki.
          Śmiało kopiuj je dla rodziny, przedszkola, klasy czy klubu.
        </p>

        <DownloadsGrid sets={downloadSets} lang="pl" />
      </div>
    </section>
  );
}

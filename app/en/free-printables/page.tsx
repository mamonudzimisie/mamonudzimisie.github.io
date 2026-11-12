import type { Metadata } from 'next';
import { downloadSetsEn } from '@/data/downloads';
import { SITE_URL } from '@/lib/site';
import DownloadsGrid from '@/components/DownloadsGrid';

const TITLE = 'Free Printable Killer Sudoku and Large Print Sudoku';
const DESCRIPTION =
  'Free printable puzzles: easy Killer Sudoku with a starter guide, and large print sudoku with big grids and big digits. PDFs with full solutions for home, senior centres and clubs.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/en/free-printables` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: '/og/en.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

export default function FreePrintablesPage() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-3xl font-800 text-navy sm:text-4xl">Free printables</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink/70">
          Want to see whether our puzzles are for you? Download a free set, print it at home and
          grab a pencil. Feel free to copy it for family, friends, a senior centre or a club.
        </p>

        <DownloadsGrid sets={downloadSetsEn} lang="en" />
      </div>
    </section>
  );
}

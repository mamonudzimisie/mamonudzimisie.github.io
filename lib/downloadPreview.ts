import fs from 'fs';
import path from 'path';
import { getBookBySlug } from '@/data/books';
import type { DownloadSet } from '@/data/downloads';

// Podgląd zestawu do pobrania: obrazek obok PDF-a pierwszej wersji
// (np. /materialy/x.pdf → /materialy/x.webp), a gdy go nie ma — jedna
// ze stron przykładowych książki, do której prowadzi zestaw.
export function downloadPreview(set: DownloadSet): string | undefined {
  for (const variant of set.variants) {
    const webp = variant.pdf.replace(/\.pdf$/, '.webp');
    if (fs.existsSync(path.join(process.cwd(), 'public', webp))) return webp;
  }
  for (const variant of set.variants) {
    const pages = variant.bookSlug ? getBookBySlug(variant.bookSlug)?.samplePages : undefined;
    if (pages?.length) return pages[Math.min(3, pages.length - 1)];
  }
  return undefined;
}

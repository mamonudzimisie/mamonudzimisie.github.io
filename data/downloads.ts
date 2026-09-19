// Darmowe materiały do pobrania (dział /pl/materialy).
// PDF-y i miniatury leżą w /public/materialy/. PDF-y składa skrypt
// ~/AmazonKDP/word-search/books/PL/_www/assemble.py.

export type Download = {
  slug: string;
  title: string;
  level: string;
  description: string;
  pdf: string;
  thumbnail: string;
  pages: number;
  bookSlug?: string; // książka z serii, do której prowadzi materiał
};

export const downloads: Download[] = [
  {
    slug: 'wykreslanki-jesien-5-6-lat',
    title: 'Wykreślanki na jesień',
    level: '5–6 lat',
    description:
      '5 jesiennych plansz: park, las, pogoda, owoce i ciepłe ubrania. Po 6 krótkich słów ukrytych tylko poziomo i pionowo, duże litery i rozwiązania.',
    pdf: '/materialy/wykreslanki-jesien-5-6-lat.pdf',
    thumbnail: '/materialy/wykreslanki-jesien-5-6-lat.webp',
    pages: 8,
    bookSlug: 'znajdz-slowko-poziom-latwy',
  },
  {
    slug: 'wykreslanki-jesien-6-7-lat',
    title: 'Wykreślanki na jesień',
    level: '6–7 lat',
    description:
      '5 jesiennych plansz: park, grzybobranie, deszczowy dzień, zapasy na zimę i odlatujące ptaki. Po 7 słów, w tym jedno po skosie, i rozwiązania.',
    pdf: '/materialy/wykreslanki-jesien-6-7-lat.pdf',
    thumbnail: '/materialy/wykreslanki-jesien-6-7-lat.webp',
    pages: 8,
    bookSlug: 'znajdz-slowko-poziom-latwy-6-7',
  },
];

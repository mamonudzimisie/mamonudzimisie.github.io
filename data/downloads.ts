// Darmowe materiały do pobrania (dział /pl/materialy).
// PDF-y leżą w /public/materialy/. Składa je skrypt
// ~/AmazonKDP/word-search/books/PL/_www/assemble.py.
//
// Materiały są pogrupowane w zestawy tematyczne (np. Halloween), a w każdym
// zestawie są wersje dla różnych grup wiekowych. Kolejność na liście = kolejność
// na stronie, więc aktualny sezon trzymamy na górze.

export type DownloadVariant = {
  level: string; // "5–6 lat"
  note: string; // krótko, czym różni się ta wersja
  pdf: string;
  pages: number;
  bookSlug?: string; // książka z serii, do której prowadzi materiał
};

export type DownloadSet = {
  slug: string;
  title: string;
  description: string;
  isNew?: boolean;
  variants: DownloadVariant[];
};

export const downloadSets: DownloadSet[] = [
  {
    slug: 'wykreslanki-halloween',
    title: 'Wykreślanki na Halloween',
    description:
      '5 plansz bez straszenia: dyniowy wieczór, nocne zwierzęta, przebrania, słodycze i czarodziejski zamek. Rozwiązania w zestawie.',
    isNew: true,
    variants: [
      {
        level: '5–6 lat',
        note: 'Po 6 krótkich słów, tylko poziomo i pionowo, duże litery',
        pdf: '/materialy/wykreslanki-halloween-5-6-lat.pdf',
        pages: 8,
        bookSlug: 'znajdz-slowko-poziom-latwy',
      },
      {
        level: '6–7 lat',
        note: 'Po 7 słów, w tym jedno po skosie',
        pdf: '/materialy/wykreslanki-halloween-6-7-lat.pdf',
        pages: 8,
        bookSlug: 'znajdz-slowko-poziom-latwy-6-7',
      },
    ],
  },
  {
    slug: 'wykreslanki-jesien',
    title: 'Wykreślanki na jesień',
    description:
      '5 jesiennych plansz: park, las, grzyby, deszczowa pogoda, zapasy na zimę i ciepłe ubrania. Rozwiązania w zestawie.',
    variants: [
      {
        level: '5–6 lat',
        note: 'Po 6 krótkich słów, tylko poziomo i pionowo, duże litery',
        pdf: '/materialy/wykreslanki-jesien-5-6-lat.pdf',
        pages: 8,
        bookSlug: 'znajdz-slowko-poziom-latwy',
      },
      {
        level: '6–7 lat',
        note: 'Po 7 słów, w tym jedno po skosie',
        pdf: '/materialy/wykreslanki-jesien-6-7-lat.pdf',
        pages: 8,
        bookSlug: 'znajdz-slowko-poziom-latwy-6-7',
      },
    ],
  },
];

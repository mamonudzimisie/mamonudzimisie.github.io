// Darmowe materiały do pobrania (dział /pl/materialy).
// PDF-y leżą w /public/materialy/. Wykreślanki składa skrypt
// ~/AmazonKDP/word-search/books/PL/_www/assemble.py, Killer Sudoku
// ~/AmazonKDP/word-search/books/Sudoku/_www/assemble_free_killer.py (PL i EN),
// Sudoku Jigsaw ~/AmazonKDP/word-search/books/Sudoku/_www/assemble_free_jigsaw.py (PL).
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
  bookLabel?: string; // tekst linku do książki (domyślnie „książka dla dzieci N lat” / „the full book for beginners”)
};

export type DownloadGroup = 'sudoku' | 'kids';

export type DownloadSet = {
  slug: string;
  title: string;
  description: string; // jedno-dwa zdania: kafelek ma być niski
  group: DownloadGroup; // sekcja na stronie (nagłówki w components/DownloadsGrid.tsx)
  isNew?: boolean; // tylko najnowszy zestaw
  post?: { href: string; label: string }; // wpis na blogu z zasadami
  variants: DownloadVariant[];
};

export const downloadSets: DownloadSet[] = [
  {
    slug: 'sudoku-jigsaw-do-druku',
    title: 'Sudoku Jigsaw do druku',
    description:
      'Sudoku z nieregularnymi obszarami zamiast kwadratów 3×3. Zasady z rysunkiem, 6 zagadek i rozwiązania. Książka wkrótce.',
    group: 'sudoku',
    isNew: true,
    post: { href: '/pl/blog/sudoku-jigsaw-zasady', label: 'Zasady i sposoby na start' },
    variants: [
      {
        level: 'Łatwe i średnie',
        note: 'Cztery plansze łatwe i dwie średnie',
        pdf: '/materialy/sudoku-jigsaw-do-druku.pdf',
        pages: 7,
      },
    ],
  },
  {
    slug: 'killer-sudoku-do-druku',
    title: 'Killer Sudoku do druku',
    description:
      'Sudoku z sumami w klatkach. Zasady z rysunkiem, trzy techniki na start, 6 zagadek i rozwiązania.',
    group: 'sudoku',
    post: { href: '/pl/blog/czym-jest-killer-sudoku', label: 'Zasady i reguła 45' },
    variants: [
      {
        level: 'Łatwe',
        note: 'Cyfry startowe i duże plansze',
        pdf: '/materialy/killer-sudoku-do-druku.pdf',
        pages: 7,
        bookSlug: 'killer-sudoku-400',
        bookLabel: 'książka',
      },
    ],
  },
  {
    slug: 'wykreslanki-halloween',
    title: 'Wykreślanki na Halloween',
    description:
      '5 plansz bez straszenia: dyniowy wieczór, nocne zwierzęta, przebrania, słodycze i zamek. Z rozwiązaniami.',
    group: 'kids',
    variants: [
      {
        level: '5–6 lat',
        note: 'Po 6 krótkich słów, poziomo i pionowo',
        pdf: '/materialy/wykreslanki-halloween-5-6-lat.pdf',
        pages: 8,
        bookSlug: 'znajdz-slowko-poziom-latwy',
        bookLabel: 'książka',
      },
      {
        level: '6–7 lat',
        note: 'Po 7 słów, jedno po skosie',
        pdf: '/materialy/wykreslanki-halloween-6-7-lat.pdf',
        pages: 8,
        bookSlug: 'znajdz-slowko-poziom-latwy-6-7',
        bookLabel: 'książka',
      },
    ],
  },
  {
    slug: 'wykreslanki-jesien',
    title: 'Wykreślanki na jesień',
    description:
      '5 jesiennych plansz: park, las, grzyby, deszcz, zapasy na zimę i ciepłe ubrania. Z rozwiązaniami.',
    group: 'kids',
    variants: [
      {
        level: '5–6 lat',
        note: 'Po 6 krótkich słów, poziomo i pionowo',
        pdf: '/materialy/wykreslanki-jesien-5-6-lat.pdf',
        pages: 8,
        bookSlug: 'znajdz-slowko-poziom-latwy',
        bookLabel: 'książka',
      },
      {
        level: '6–7 lat',
        note: 'Po 7 słów, jedno po skosie',
        pdf: '/materialy/wykreslanki-jesien-6-7-lat.pdf',
        pages: 8,
        bookSlug: 'znajdz-slowko-poziom-latwy-6-7',
        bookLabel: 'książka',
      },
    ],
  },
];

// Free printables for the English section (/en/free-printables). The sudoku
// pack is assembled by ~/AmazonKDP/word-search/books/Sudoku/_www/assemble_free_sudoku.py
// (new puzzles - none of them is in any of the books).
export const downloadSetsEn: DownloadSet[] = [
  {
    slug: 'free-printable-killer-sudoku',
    title: 'Killer Sudoku',
    description:
      'Sudoku with sums in cages. The rules with a picture, three techniques to start, 6 easy puzzles and solutions.',
    group: 'sudoku',
    isNew: true,
    post: { href: '/en/blog/what-is-killer-sudoku', label: 'Rules and the rule of 45' },
    variants: [
      {
        level: 'Easy',
        note: 'Starting digits and big grids',
        pdf: '/free-printables/free-printable-killer-sudoku.pdf',
        pages: 7,
        bookSlug: 'killer-sudoku-400-en',
        bookLabel: 'the book',
      },
    ],
  },
  {
    slug: 'large-print-sudoku-easy',
    title: 'Large Print Sudoku',
    description:
      '8 puzzles in the same large print as our books: big grids, big digits, a short guide and solutions.',
    group: 'sudoku',
    post: { href: '/en/blog/large-print-sudoku-for-every-level', label: 'Which level is for you' },
    variants: [
      {
        level: 'Warm-up & Easy',
        note: 'The first four need only one simple method',
        pdf: '/free-printables/large-print-sudoku-easy.pdf',
        pages: 9,
        bookSlug: 'large-print-sudoku-102',
        bookLabel: 'the book',
      },
    ],
  },
];

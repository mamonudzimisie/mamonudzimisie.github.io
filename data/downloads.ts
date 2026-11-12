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

export type DownloadSet = {
  slug: string;
  title: string;
  description: string;
  isNew?: boolean;
  variants: DownloadVariant[];
};

export const downloadSets: DownloadSet[] = [
  {
    slug: 'sudoku-jigsaw-do-druku',
    title: 'Sudoku Jigsaw do druku',
    description:
      'Sudoku z nieregularnymi obszarami zamiast kwadratów 3×3: zasady na jednej stronie z rysunkiem, trzy sposoby na start, 6 zagadek i pełne rozwiązania. Książka z 200 zagadkami wkrótce.',
    isNew: true,
    variants: [
      {
        level: 'Łatwe',
        note: 'Cztery plansze łatwe i dwie średnie na dokładkę, po dwie na stronę',
        pdf: '/materialy/sudoku-jigsaw-do-druku.pdf',
        pages: 7,
      },
    ],
  },
  {
    slug: 'killer-sudoku-do-druku',
    title: 'Killer Sudoku do druku',
    description:
      'Sudoku z sumami dla dorosłych: zasady na jednej stronie z rysunkiem, trzy techniki na start, 6 łatwych zagadek (żadna nie powtarza się w książce) i pełne rozwiązania.',
    isNew: true,
    variants: [
      {
        level: 'Łatwe',
        note: 'Dla początkujących: cyfry startowe i duże plansze, dwie na stronę',
        pdf: '/materialy/killer-sudoku-do-druku.pdf',
        pages: 7,
        bookSlug: 'killer-sudoku-400',
        bookLabel: 'książka: 150 takich zagadek',
      },
    ],
  },
  {
    slug: 'wykreslanki-halloween',
    title: 'Wykreślanki na Halloween',
    description:
      '5 plansz bez straszenia: dyniowy wieczór, nocne zwierzęta, przebrania, słodycze i czarodziejski zamek. Rozwiązania w zestawie.',
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

// Free printables for the English section (/en/free-printables). The sudoku
// pack is assembled by ~/AmazonKDP/word-search/books/Sudoku/_www/assemble_free_sudoku.py
// (new puzzles - none of them is in any of the books).
export const downloadSetsEn: DownloadSet[] = [
  {
    slug: 'free-printable-killer-sudoku',
    title: 'Killer Sudoku',
    description:
      'Sudoku with sums: the rules on one page with a picture, three techniques to get started, 6 easy puzzles (none of them is in the book) and full solutions.',
    variants: [
      {
        level: 'Easy',
        note: 'For beginners: starting digits and big grids, two per page',
        pdf: '/free-printables/free-printable-killer-sudoku.pdf',
        pages: 7,
        bookSlug: 'killer-sudoku-400-en',
        bookLabel: 'the book: 150 puzzles like these',
      },
    ],
  },
  {
    slug: 'large-print-sudoku-easy',
    title: 'Large Print Sudoku',
    description:
      '8 sudoku puzzles in the same large print as our books: big grids and big digits, easy to read. Four warm-up puzzles and four easy ones, a short how-to-play guide and full solutions.',
    variants: [
      {
        level: 'Warm-up & Easy',
        note: 'For beginners: the first four need only one simple method',
        pdf: '/free-printables/large-print-sudoku-easy.pdf',
        pages: 9,
        bookSlug: 'large-print-sudoku-102',
      },
    ],
  },
];

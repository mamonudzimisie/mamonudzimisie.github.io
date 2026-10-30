import type { BookSeries } from '@/data/series';

export type BookCategory =
  | 'wykreslanki'
  | 'sudoku'
  | 'labirynty'
  | 'kolorowanki'
  | 'laczenie-kropek'
  | 'nauka-jezykow'
  | 'inne';

export type BookAudience = 'dzieci' | 'dorosli' | 'duzy-druk';

// Język, w którym napisana jest książka (treść zagadek, nie strona sklepu).
export type BookLang = 'pl' | 'de' | 'en';

export type Book = {
  slug: string; // np. "znajdz-slowko-poziom-latwy"
  title: string; // "Znajdź słówko!"
  // Tytuł na karcie w katalogu, gdy kilka książek ma ten sam `title` —
  // bez niego pięć kart „Znajdź słówko!” wygląda (i linkuje) identycznie.
  cardTitle?: string; // "Znajdź słówko! 5–6 lat"
  subtitle: string; // "Poziom najłatwiejszy"
  // Dłuższy podtytuł tylko na stronie książki; karty i wachlarz używają `subtitle`.
  detailSubtitle?: string;
  ageRange: string; // "5–6 lat"
  category: BookCategory;
  series: BookSeries; // seria (data/series.ts) — katalog grupuje według niej
  audience: BookAudience;
  lang: BookLang; // język treści książki
  // Wspólny klucz wydań tej samej książki w różnych językach (te same zagadki,
  // inny język), np. 'sudoku-100'. Strony wydań wskazują się nawzajem przez
  // hreflang, żeby Google pokazał Niemcowi wydanie DE, a nie PL.
  edition?: string;
  description: string;
  features: string[]; // np. ["100 wykreślanek", "Duża czcionka", ...]
  coverImage: string; // /public/covers/<slug>.webp — nazwa pliku równa slugowi
  amazonUrl: string;
  featured: boolean;
  comingSoon?: boolean;
  formatInches: string; // np. '8,5 × 11 cala'
  hardcover?: boolean; // twarda oprawa (wydania prezentowe) — inny format, oprawa i schema.org
  pageCount: number;
  isbn?: string; // ISBN wydania drukowanego (ze strony redakcyjnej PDF-a)
  // Przykładowe strony do podglądu „Zajrzyj do środka” (WebP w /public/samples/<slug>/).
  // Bez tego pola przycisk prowadzi na Amazon.
  // Wybierane parami jako prawdziwe rozkładówki z PDF-a (strona parzysta, potem
  // następna nieparzysta), żeby sąsiednie miniatury były sąsiednimi stronami.
  samplePages?: string[];
  // Sekcja „Dla kogo jest ta książka?” pod głównym blokiem. `easier` / `harder`
  // to slugi sąsiednich poziomów, pokazywanych jako miniatury z linkami.
  forWhom?: {
    paragraphs: string[];
    easier?: string;
    harder?: string;
  };
  // Opcjonalne nadpisania metadanych SEO. Tytuł bez sufiksu „| ZALKA BOOKS” —
  // dokleja go szablon z app/layout.tsx.
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
};

// Kategorie do filtrowania w katalogu — etykiety po polsku.
export const CATEGORY_LABELS: Record<BookCategory, string> = {
  wykreslanki: 'Wykreślanki',
  sudoku: 'Sudoku',
  labirynty: 'Labirynty',
  kolorowanki: 'Kolorowanki',
  'laczenie-kropek': 'Łączenie kropek',
  'nauka-jezykow': 'Nauka języków',
  inne: 'Inne',
};

// Kolejność języków (linki do katalogów w innych językach).
export const BOOK_LANGS: BookLang[] = ['pl', 'de', 'en'];

export const LANG_LABELS: Record<BookLang, string> = {
  pl: 'PL',
  de: 'DE',
  en: 'EN',
};

export const AGE_GROUPS = [
  '3–4 lata',
  '5–6 lat',
  '6–7 lat',
  '7–9 lat',
  '10+',
  '13+',
  'Dorośli',
] as const;

export const books: Book[] = [
  {
    slug: 'znajdz-slowko-poziom-latwy',
    title: 'Znajdź słówko!',
    cardTitle: 'Znajdź słówko! 5–6 lat',
    subtitle: 'Poziom najłatwiejszy',
    ageRange: '5–6 lat',
    category: 'wykreslanki',
    series: 'znajdz-slowko',
    audience: 'dzieci',
    lang: 'pl',
    description:
      'Pierwsza wykreślanka, która nie zniechęca. Duże litery, znajome słowa i tyle satysfakcji, ile potrzeba, żeby dziecko samo poprosiło o kolejną stronę. Świetny sposób, żeby oswoić literki, zanim zacznie się prawdziwa nauka czytania.',
    features: [
      '100 wykreślanek',
      'Nauka czytania przez zabawę',
      'Duże litery',
      'Tematy bliskie dzieciom (zwierzęta, rodzina, kolory)',
    ],
    coverImage: '/covers/znajdz-slowko-poziom-latwy.webp',
    amazonUrl: 'https://amzn.eu/d/0coMqTkj',
    featured: true,
    formatInches: '8,5 × 11 cala',
    pageCount: 128,
    isbn: '978-83-981441-2-4',
    samplePages: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/samples/znajdz-slowko-poziom-latwy/${n}.webp`),
    seo: {
      title: 'Znajdź słówko! Wykreślanki dla dzieci 5–6 lat',
      description:
        '100 pierwszych wykreślanek dla dzieci 5–6 lat. Duże litery i znajome słowa – oswajanie literek przez zabawę, jeszcze przed nauką czytania. Zobacz przykładowe strony.',
    },
  },
  {
    slug: 'znajdz-slowko-poziom-latwy-6-7',
    title: 'Znajdź słówko!',
    cardTitle: 'Znajdź słówko! 6–7 lat',
    subtitle: 'Poziom łatwy',
    detailSubtitle: '100 wykreślanek dla dzieci 6–7 lat · Poziom łatwy',
    ageRange: '6–7 lat',
    category: 'wykreslanki',
    series: 'znajdz-slowko',
    audience: 'dzieci',
    lang: 'pl',
    description:
      'Pierwsze wykreślanki, które dziecko rozwiąże samo. Słowa ukryte są tak, jak czytamy: od lewej do prawej i z góry na dół, a tylko jeden wyraz na planszy biegnie po skosie w dół. Szukanie wyrazów staje się więc naturalnym treningiem czytania, a nie źródłem frustracji.',
    features: [
      '100 plansz, na każdej 7 słów do znalezienia',
      'Proste, znajome wyrazy i tematy lubiane przez dzieci',
      'Duża czcionka',
      'Rozwiązania na końcu książki',
      'Duży format zbliżony do A4, 128 stron, miękka oprawa',
    ],
    coverImage: '/covers/znajdz-slowko-poziom-latwy-6-7.webp',
    amazonUrl: 'https://amzn.eu/d/07BBUa1X',
    featured: true,
    formatInches: '8,5 × 11 cala',
    pageCount: 128,
    isbn: '978-83-981441-0-0',
    samplePages: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/samples/znajdz-slowko-poziom-latwy-6-7/${n}.webp`),
    forWhom: {
      paragraphs: [
        'Dla dzieci, które znają już litery i zaczynają składać je w słowa – w zerówce, na wakacjach przed szkołą albo w pierwszej klasie.',
        'Jeśli dziecko dopiero poznaje alfabet, zacznij od poziomu najłatwiejszego (5–6 lat). Jeśli wykreślanki idą mu gładko, sięgnij po poziom średni (7–9 lat).',
      ],
      easier: 'znajdz-slowko-poziom-latwy',
      harder: 'znajdz-slowko-poziom-sredni-7-9',
    },
    seo: {
      title: 'Znajdź słówko! Wykreślanki dla dzieci 6–7 lat',
      description:
        '100 wykreślanek dla dzieci 6–7 lat. Proste słowa, tylko jedno na planszy po skosie – trening czytania bez frustracji. Z rozwiązaniami. Zobacz przykładowe strony.',
      keywords: [
        'wykreślanki dla dzieci',
        'nauka czytania',
        'łamigłówki dla 6 latka',
        'zerówka',
        'klasa 1',
      ],
    },
  },
  {
    slug: 'znajdz-slowko-poziom-sredni-7-9',
    title: 'Znajdź słówko!',
    cardTitle: 'Znajdź słówko! 7–9 lat',
    subtitle: 'Poziom średni',
    ageRange: '7–9 lat',
    category: 'wykreslanki',
    series: 'znajdz-slowko',
    audience: 'dzieci',
    lang: 'pl',
    description:
      'Dłuższe i trudniejsze słowa dla dziecka, które już czyta płynnie i szuka prawdziwego wyzwania. Więcej liter do przeszukania, więcej satysfakcji, gdy słówko w końcu się znajdzie.',
    features: [
      '100 wykreślanek',
      'Dłuższe i trudniejsze słowa',
      'Rozwija koncentrację i spostrzegawczość',
      'Tematy bliskie dzieciom (zwierzęta, rodzina, kolory)',
    ],
    coverImage: '/covers/znajdz-slowko-poziom-sredni-7-9.webp',
    amazonUrl: 'https://amzn.eu/d/0dJNgtH1',
    featured: true,
    formatInches: '8,5 × 11 cala',
    pageCount: 128,
    isbn: '978-83-981441-1-7',
    samplePages: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/samples/znajdz-slowko-poziom-sredni-7-9/${n}.webp`),
    seo: {
      title: 'Znajdź słówko! Wykreślanki dla dzieci 7–9 lat',
      description:
        '100 wykreślanek dla dzieci 7–9 lat, które czytają już płynnie. Dłuższe słowa i większe plansze – trening koncentracji i spostrzegawczości. Zobacz przykładowe strony.',
    },
  },
  {
    slug: 'znajdz-slowko-poziom-trudny-10',
    title: 'Znajdź słówko!',
    cardTitle: 'Znajdź słówko! 10+',
    subtitle: 'Poziom trudny',
    ageRange: '10+',
    category: 'wykreslanki',
    series: 'znajdz-slowko',
    audience: 'dzieci',
    lang: 'pl',
    description:
      'Prawdziwe wyzwanie dla wprawnych czytelników — długie słowa, gęsta plansza i satysfakcja, która przychodzi dopiero po chwili skupienia. Dla dzieci, które lubią się mierzyć z trudniejszym zadaniem.',
    features: [
      '100 wykreślanek',
      'Długie, wymagające słowa',
      'Rozwija koncentrację i cierpliwość',
      'Tematy bliskie dzieciom (zwierzęta, rodzina, kolory)',
    ],
    coverImage: '/covers/znajdz-slowko-poziom-trudny-10.webp',
    amazonUrl: 'https://amzn.eu/d/07eXC8JG',
    featured: true,
    formatInches: '8,5 × 11 cala',
    pageCount: 128,
    isbn: '978-83-981441-3-1',
    samplePages: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/samples/znajdz-slowko-poziom-trudny-10/${n}.webp`),
    seo: {
      title: 'Znajdź słówko! Trudne wykreślanki dla dzieci 10+',
      description:
        '100 trudnych wykreślanek dla dzieci od 10 lat. Długie słowa i gęste plansze – wyzwanie dla wprawnych czytelników, które uczy skupienia. Zobacz przykładowe strony.',
    },
  },
  {
    slug: 'znajdz-slowko-poziom-ekspert-13',
    title: 'Znajdź słówko!',
    cardTitle: 'Znajdź słówko! 13+',
    subtitle: 'Poziom ekspert',
    ageRange: '13+',
    category: 'wykreslanki',
    series: 'znajdz-slowko',
    audience: 'dzieci',
    lang: 'pl',
    description:
      'Najtrudniejszy poziom w serii — gęste plansze, długie słowa i zadania, przy których trzeba się naprawdę skupić. Dla nastolatków i wszystkich, którzy szukają wykreślanki stawiającej prawdziwy opór.',
    features: [
      '100 wykreślanek',
      'Najwyższy poziom trudności w serii',
      'Gęste plansze i długie słowa',
      'Trening koncentracji i cierpliwości',
    ],
    coverImage: '/covers/znajdz-slowko-poziom-ekspert-13.webp',
    amazonUrl: 'https://amzn.eu/d/07es8Itl',
    featured: false,
    formatInches: '8,5 × 11 cala',
    pageCount: 128,
    isbn: '978-83-981441-4-8',
    samplePages: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/samples/znajdz-slowko-poziom-ekspert-13/${n}.webp`),
    seo: {
      title: 'Znajdź słówko! Wykreślanki dla nastolatków 13+',
      description:
        '100 najtrudniejszych wykreślanek w serii – dla nastolatków i dorosłych. Gęste plansze, długie słowa i prawdziwy trening koncentracji. Zobacz przykładowe strony.',
    },
  },
  {
    slug: 'znajdz-slowko-swieta',
    title: 'Znajdź słówko! Święta',
    subtitle: '40 świątecznych wykreślanek, 6–9 lat',
    detailSubtitle: '40 świątecznych wykreślanek dla dzieci w wieku 6–9 lat, z ciekawostkami o Bożym Narodzeniu',
    ageRange: '6–9 lat',
    category: 'wykreslanki',
    series: 'znajdz-slowko',
    audience: 'dzieci',
    lang: 'pl',
    description:
      'Czterdzieści zagadek ze słowami, które pachną piernikiem i choinką. W każdej planszy ukryło się 9 świątecznych wyrazów: od kolęd i wigilijnych potraw po Mikołaja i jego renifery. Co czwarta plansza ma kształt serca, gwiazdy albo kuli, a między zagadkami czekają strony z ciekawostkami — na przykład o tym, dlaczego płatek śniegu ma sześć ramion. Dobry pomysł na prezent pod choinkę i na spokojne popołudnie w czasie ferii.',
    features: [
      '40 świątecznych wykreślanek, każda na osobnej stronie',
      'Co czwarta plansza w kształcie serca, gwiazdy albo kuli',
      'Strony z ciekawostkami o zimie i Bożym Narodzeniu',
      'Duże litery na liście słów i rozwiązania na końcu książki',
    ],
    coverImage: '/covers/znajdz-slowko-swieta.webp',
    amazonUrl: 'https://www.amazon.pl/dp/8398390115',
    featured: false,
    formatInches: '8,5 × 11 cala',
    pageCount: 64,
    isbn: '978-83-983901-1-8',
    samplePages: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/samples/znajdz-slowko-swieta/${n}.webp`),
    seo: {
      title: 'Znajdź słówko! Święta – świąteczne wykreślanki dla dzieci 6–9 lat',
      description:
        '40 świątecznych wykreślanek dla dzieci 6–9 lat: kolędy, wigilijne potrawy, Mikołaj i renifery. Plansze w kształcie serca, gwiazdy i kuli, ciekawostki i rozwiązania.',
    },
  },
  {
    slug: 'zdobywca-szczytow',
    title: 'Zdobywca Szczytów',
    subtitle: '75 wykreślanek z nazwami szczytów odznak turystycznych Polski i okolic',
    ageRange: 'Dorośli',
    category: 'wykreslanki',
    series: 'wykreslanki-tematyczne',
    audience: 'dorosli',
    lang: 'pl',
    description:
      'Korona Gór Polski, Diadem Polskich Gór, Korona Beskidu Żywieckiego, Korona Gór Stołowych — w Polsce nie brakuje górskich wyzwań. A co, gdyby tym razem zdobywać szczyty z ołówkiem w dłoni? To 75 wykreślanek pełnych nazw szczytów związanych z polskimi odznakami turystycznymi, a w każdej czeka nowy zestaw nazw do odnalezienia. Dla tych, którzy kochają góry, zdobywają odznaki i planują kolejne wyprawy — i świetny prezent dla każdego miłośnika gór.',
    features: [
      '75 wykreślanek z nazwami szczytów górskich odznak',
      'Ponad 1500 nazw do znalezienia',
      'Rozwiązania na końcu książki',
      'Dla miłośników gór i zdobywców odznak turystycznych',
    ],
    coverImage: '/covers/zdobywca-szczytow.webp',
    amazonUrl: 'https://amzn.eu/d/03CTNBDE',
    featured: true,
    formatInches: '8,5 × 11 cala',
    pageCount: 100,
    isbn: '978-83-981441-7-9',
    samplePages: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/samples/zdobywca-szczytow/${n}.webp`),
    seo: {
      title: 'Zdobywca Szczytów – wykreślanki o polskich górach',
      description:
        '75 wykreślanek z nazwami szczytów z Korony Gór Polski, Diademu i innych odznak turystycznych. Ponad 1500 nazw. Prezent dla miłośnika gór.',
    },
  },
  {
    slug: 'weihnachts-wortsuchratsel',
    title: 'Weihnachts-Wortsuchrätsel',
    subtitle: '80 Rätsel im Großdruck, mit Lösungen',
    ageRange: 'Dorośli',
    category: 'wykreslanki',
    series: 'wykreslanki-tematyczne',
    audience: 'duzy-druk',
    lang: 'de',
    description:
      'Gemütliche Rätselstunden im Advent – in großer, gut lesbarer Schrift. 80 weihnachtliche Wortsuchrätsel für ruhige Stunden bei Kerzenschein und Plätzchenduft. Ein Rätsel pro Seite mit je 10 gesuchten Wörtern, die Buchstaben sind groß und kräftig gedruckt, die Wortliste steht deutlich unter jedem Rätsel. 20 Themen von der Adventszeit über den Weihnachtsmarkt bis zur Weihnachtspost. Die Wörter verlaufen nur waagerecht, senkrecht oder diagonal – niemals rückwärts. Ein schönes Geschenk für Oma und Opa, für die Eltern oder zum Nikolaus.',
    features: [
      '80 Wortsuchrätsel im Großdruck, ein Rätsel pro Seite',
      '20 weihnachtliche Themen, je 10 Wörter pro Rätsel',
      'Nur drei Richtungen, niemals rückwärts',
      'Alle Lösungen am Ende des Buches',
    ],
    coverImage: '/covers/weihnachts-wortsuchratsel.webp',
    amazonUrl: 'https://www.amazon.de/dp/8398390166',
    featured: false,
    formatInches: '8,5 × 11 Zoll',
    pageCount: 104,
    isbn: '978-83-983901-6-3',
    samplePages: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/samples/weihnachts-wortsuchratsel/${n}.webp`),
    seo: {
      title: 'Weihnachts-Wortsuchrätsel – 80 Rätsel im Großdruck',
      description:
        '80 weihnachtliche Wortsuchrätsel in großer Schrift, 20 Themen, nur drei Richtungen, alle Lösungen. Ein Geschenk für Oma und Opa zum Advent.',
    },
  },
  {
    slug: 'sudoku-duzym-drukiem-100',
    title: 'Sudoku dużym drukiem',
    cardTitle: 'Sudoku dużym drukiem – łatwe i średnie',
    subtitle: '120 łamigłówek, poziom łatwy–średni',
    ageRange: 'Dorośli',
    category: 'sudoku',
    series: 'sudoku-duzy-druk',
    audience: 'duzy-druk',
    lang: 'pl',
    edition: 'sudoku-100',
    description:
      '120 łamigłówek sudoku wydrukowanych naprawdę dużą czcionką. Dwie zagadki na stronę, wyraźne kratki i mnóstwo miejsca na notatki. Ta książka powstała z myślą o osobach, które lubią codzienną porcję logicznego myślenia, ale mają dość drobnego druku w klasycznych wydaniach — tu możesz skupić się na zadaniu, nie nadwyrężając oczu. Rozwiązywanie sudoku to spokojne ćwiczenie koncentracji i pamięci, świetna alternatywa dla telewizora czy telefonu. Idealny prezent dla mamy, taty, babci lub dziadka — na urodziny, święta albo bez okazji.',
    features: [
      '120 unikalnych sudoku (poziom łatwy i średni)',
      'Powiększona czcionka i duże kratki — wygodne przy słabszym wzroku',
      'Krótka instrukcja dla początkujących',
      'Komplet rozwiązań na końcu książki',
    ],
    coverImage: '/covers/sudoku-duzym-drukiem-100.webp',
    amazonUrl: 'https://amzn.eu/d/01Wm4XgX',
    featured: false,
    formatInches: '8,5 × 11 cala',
    pageCount: 96,
    samplePages: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/samples/sudoku-duzym-drukiem-100/${n}.webp`),
    seo: {
      title: 'Sudoku dużym drukiem – 120 łamigłówek dla seniorów',
      description:
        '120 sudoku dużą czcionką, poziom łatwy i średni. Wyraźne kratki, instrukcja dla początkujących i rozwiązania. Prezent dla babci, dziadka lub rodzica.',
    },
  },
  {
    slug: 'sudoku-300-zagadek-200',
    title: 'Sudoku',
    subtitle: '300 zagadek od łatwych do bardzo trudnych',
    ageRange: 'Dorośli',
    category: 'sudoku',
    series: 'lamiglowki-logiczne',
    audience: 'dorosli',
    lang: 'pl',
    edition: 'sudoku-200',
    description:
      'Jedna plansza, dziewięć cyfr i chwila tylko dla siebie. Ten tom zawiera 300 zagadek sudoku ułożonych od najłatwiejszych do najtrudniejszych — zaczniesz od prostych, a skończysz na takich, przy których posiedzisz znacznie dłużej. Każda zagadka ma dokładnie jedno rozwiązanie i da się ją rozwiązać samą logiką, bez zgadywania. Świetnie sprawdza się w podróży, przy porannej kawie, w poczekalni albo wieczorem zamiast ekranu. Dobry pomysł na prezent dla kogoś, kto lubi łamigłówki — i dla siebie.',
    features: [
      '300 sudoku w czterech poziomach: łatwy, średni, trudny i bardzo trudny',
      'Wstęp z metodami rozwiązywania — od podstaw po X-Wing, Swordfish i XY-Wing',
      'Wszystkie rozwiązania na końcu książki',
      'Czytelne plansze z pogrubionymi liniami bloków 3×3',
    ],
    coverImage: '/covers/sudoku-300-zagadek-200.webp',
    amazonUrl: 'https://amzn.eu/d/08vEb3Mk',
    featured: true,
    formatInches: '8,5 × 11 cala',
    pageCount: 132,
    samplePages: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/samples/sudoku-300-zagadek-200/${n}.webp`),
    seo: {
      title: 'Sudoku – 300 zagadek od łatwych do bardzo trudnych',
      description:
        '300 sudoku w czterech poziomach trudności, każde z jednym rozwiązaniem. Wstęp z technikami od podstaw po X-Wing i Swordfish. Rozwiązania w środku.',
    },
  },
  {
    slug: 'sudoku-duzym-drukiem-101',
    title: 'Sudoku dużym drukiem',
    cardTitle: 'Sudoku dużym drukiem – trudne',
    subtitle: '120 łamigłówek, poziom trudny i bardzo trudny',
    ageRange: 'Dorośli',
    category: 'sudoku',
    series: 'sudoku-duzy-druk',
    audience: 'duzy-druk',
    lang: 'pl',
    edition: 'sudoku-101',
    description:
      '120 wymagających sudoku wydrukowanych naprawdę dużą czcionką. Dwie zagadki na stronę, wyraźne kratki i mnóstwo miejsca na notatki. Ten zbiór zaczyna się tam, gdzie inne się kończą — nie ma w nim ani jednej planszy dla początkującego, tylko 60 zagadek trudnych i 60 bardzo trudnych. Wstęp objaśnia zaawansowane metody, które przydadzą się po drodze: pary, X-Wing, Swordfish i XY-Wing.',
    features: [
      '120 unikalnych sudoku (poziom trudny i bardzo trudny)',
      'Powiększona czcionka i duże kratki — dwie zagadki na stronę',
      'Wstęp z zaawansowanymi metodami: pary, X-Wing, Swordfish, XY-Wing',
      'Komplet rozwiązań na końcu książki',
    ],
    coverImage: '/covers/sudoku-duzym-drukiem-101.webp',
    amazonUrl: 'https://www.amazon.pl/dp/8398299339',
    featured: false,
    formatInches: '8,5 × 11 cala',
    pageCount: 100,
    isbn: '978-83-982993-3-6',
    samplePages: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/samples/sudoku-duzym-drukiem-101/${n}.webp`),
    seo: {
      title: 'Sudoku dużym drukiem – 120 trudnych i bardzo trudnych łamigłówek',
      description:
        '120 trudnych i bardzo trudnych sudoku dużą czcionką. Dwie zagadki na stronę, wstęp z metodami zaawansowanymi (X-Wing, Swordfish, XY-Wing) i pełne rozwiązania.',
    },
  },
  {
    slug: 'sudoku-duzym-drukiem-102',
    title: 'Sudoku dużym drukiem',
    cardTitle: 'Sudoku dużym drukiem – dla początkujących',
    subtitle: '150 łamigłówek dla początkujących, rozgrzewka i poziom łatwy',
    ageRange: 'Dorośli',
    category: 'sudoku',
    series: 'sudoku-duzy-druk',
    audience: 'duzy-druk',
    lang: 'pl',
    edition: 'sudoku-102',
    description:
      '150 sudoku dla początkujących, wydrukowanych naprawdę dużą czcionką. Dwie zagadki na stronę, wyraźne kratki i mnóstwo miejsca na notatki. Łagodny start: najpierw rozgrzewka, przy której wystarczy uważne patrzenie, potem poziom łatwy. Wstęp krok po kroku pokazuje dwie proste metody i podpowiada, co zrobić, gdy utkniesz — dobra pierwsza książka z sudoku i spokojny codzienny nawyk dla umysłu.',
    features: [
      '150 unikalnych sudoku (rozgrzewka i poziom łatwy)',
      'Powiększona czcionka i duże kratki — dwie zagadki na stronę',
      'Poradnik krok po kroku dla początkujących',
      'Komplet rozwiązań na końcu książki',
    ],
    coverImage: '/covers/sudoku-duzym-drukiem-102.webp',
    amazonUrl: 'https://www.amazon.pl/dp/8398299355',
    featured: false,
    formatInches: '8,5 × 11 cala',
    pageCount: 122,
    isbn: '978-83-982993-5-0',
    samplePages: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/samples/sudoku-duzym-drukiem-102/${n}.webp`),
    seo: {
      title: 'Sudoku dużym drukiem dla początkujących – 150 łatwych łamigłówek',
      description:
        '150 łatwych sudoku dla początkujących dużą czcionką. Dwie zagadki na stronę, poradnik krok po kroku i pełne rozwiązania. Spokojny pierwszy zbiór sudoku.',
    },
  },
  {
    slug: 'killer-sudoku-400',
    title: 'Killer Sudoku',
    subtitle: '150 łatwych zagadek dla początkujących',
    ageRange: 'Dorośli',
    category: 'sudoku',
    series: 'lamiglowki-logiczne',
    audience: 'dorosli',
    lang: 'pl',
    edition: 'killer-sudoku-400',
    description:
      'Lubisz sudoku i masz ochotę spróbować czegoś nowego? Killer Sudoku łączy klasyczne zasady z odrobiną prostej arytmetyki: oprócz wypełniania wierszy, kolumn i bloków cyframi od 1 do 9 trzeba pilnować, by cyfry w każdej klatce sumowały się do podanej liczby. 150 zagadek ułożonych od najłatwiejszej do najtrudniejszej, z cyframi startowymi na dobry początek — świetny trening logiki i liczenia w pamięci, bez frustracji.',
    features: [
      '150 zagadek dla początkujących, od najłatwiejszej do najtrudniejszej',
      'Poradnik na start: zasady, trzy podstawowe techniki i reguła 45',
      'Tabele rozkładów sum dla klatek dwu-, trzy- i czteropolowych',
      'Pełne rozwiązania na końcu książki',
    ],
    coverImage: '/covers/killer-sudoku-400.webp',
    amazonUrl: 'https://www.amazon.pl/dp/8398299371',
    featured: false,
    formatInches: '8,5 × 11 cala',
    pageCount: 110,
    isbn: '978-83-982993-7-4',
    samplePages: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/samples/killer-sudoku-400/${n}.webp`),
    seo: {
      title: 'Killer Sudoku – 150 łatwych zagadek dla początkujących',
      description:
        '150 łatwych zagadek Killer Sudoku z cyframi startowymi. Poradnik z regułą 45, tabele sum klatek i pełne rozwiązania. Dobry start w nowej łamigłówce.',
    },
  },
  {
    slug: 'meine-ersten-wortsuchratsel-stufe-1',
    title: 'Meine ersten Wortsuchrätsel',
    cardTitle: 'Meine ersten Wortsuchrätsel – Stufe 1',
    subtitle: 'Stufe 1: 5–6 Jahre',
    ageRange: '5–6 lat',
    category: 'wykreslanki',
    series: 'meine-ersten-wortsuchratsel',
    audience: 'dzieci',
    lang: 'de',
    description:
      'Das erste Wortsuchrätsel, das nicht entmutigt. Große Buchstaben, vertraute Wörter und genau so viel Erfolgserlebnis, dass Kinder von sich aus die nächste Seite verlangen. 60 Rätsel und dazu 12 Bilder zum Ausmalen — nach der Suche nach Buchstaben kommt die Pause mit den Buntstiften.',
    features: [
      '60 Wortsuchrätsel',
      '12 Bilder zum Ausmalen',
      'Lesenlernen mit Spaß',
      'Große Buchstaben',
    ],
    coverImage: '/covers/meine-ersten-wortsuchratsel-stufe-1.webp',
    amazonUrl: 'https://amzn.eu/d/06ffGySu',
    featured: true,
    formatInches: '8,5 × 11 Zoll',
    pageCount: 108,
    isbn: '978-83-981441-5-5',
    samplePages: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/samples/meine-ersten-wortsuchratsel-stufe-1/${n}.webp`),
    seo: {
      title: 'Wortsuchrätsel für Kinder ab 5 Jahren – Stufe 1',
      description:
        '60 einfache Wortsuchrätsel für Kinder von 5–6 Jahren, dazu 12 Ausmalbilder. Große Buchstaben und vertraute Wörter – Lesenlernen mit Spaß. Blick ins Buch.',
    },
  },
  {
    slug: 'meine-ersten-wortsuchratsel-stufe-2',
    title: 'Meine ersten Wortsuchrätsel',
    cardTitle: 'Meine ersten Wortsuchrätsel – Stufe 2',
    subtitle: 'Stufe 2: 6–7 Jahre',
    ageRange: '6–7 lat',
    category: 'wykreslanki',
    series: 'meine-ersten-wortsuchratsel',
    audience: 'dzieci',
    lang: 'de',
    description:
      'Die nächste Portion Wortsuchrätsel für einen guten Start — vertraute Wörter und ein übersichtliches Raster, das Lust auf mehr macht. Ideal, um das Lesen kurz vor der Einschulung zu festigen: 60 Rätsel und 12 Bilder zum Ausmalen als Belohnung zwischendurch.',
    features: [
      '60 Wortsuchrätsel',
      '12 Bilder zum Ausmalen',
      'Festigt das Lesen vor der Einschulung',
      'Große Buchstaben',
    ],
    coverImage: '/covers/meine-ersten-wortsuchratsel-stufe-2.webp',
    amazonUrl: 'https://amzn.eu/d/0cmPID9O',
    featured: true,
    formatInches: '8,5 × 11 Zoll',
    pageCount: 108,
    isbn: '978-83-981441-6-2',
    samplePages: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/samples/meine-ersten-wortsuchratsel-stufe-2/${n}.webp`),
    seo: {
      title: 'Wortsuchrätsel für Kinder ab 6 Jahren – Stufe 2',
      description:
        '60 Wortsuchrätsel für Kinder von 6–7 Jahren, dazu 12 Ausmalbilder. Festigt das Lesen vor und nach der Einschulung. Mit Lösungen. Blick ins Buch.',
    },
  },
  {
    slug: 'sudoku-grossdruck-100',
    title: 'Sudoku Großdruck',
    subtitle: '120 Rätsel, leicht und mittel',
    ageRange: 'Dorośli',
    category: 'sudoku',
    series: 'sudoku-duzy-druk',
    audience: 'duzy-druk',
    lang: 'de',
    edition: 'sudoku-100',
    description:
      '120 Sudoku-Rätsel, gedruckt in wirklich großer Schrift. Zwei Rätsel pro Seite und große, übersichtliche Felder. Dieses Buch ist für alle, die gern täglich ein wenig logisch denken, aber genug von der winzigen Schrift in Zeitungsrätseln haben. Es beginnt mit leichten Rätseln zum Aufwärmen, danach steigt die Schwierigkeit allmählich – ohne Frust und ohne Langeweile. Sudoku ist eine entspannende Übung für Konzentration und Gedächtnis und eine schöne Alternative zu Fernseher und Handy. Ein ideales Geschenk für Mama, Papa, Oma oder Opa – zum Geburtstag, zu Weihnachten oder einfach so.',
    features: [
      '120 Sudoku-Rätsel (leicht und mittel)',
      'Große Schrift und große Felder – angenehm auch bei schwächerer Sehkraft',
      'Kurze Anleitung für Einsteiger',
      'Alle Lösungen am Ende des Buches',
    ],
    coverImage: '/covers/sudoku-grossdruck-100.webp',
    amazonUrl: 'https://www.amazon.de/dp/839829938X',
    featured: false,
    formatInches: '8,5 × 11 Zoll',
    pageCount: 96,
    isbn: '978-83-982993-8-1',
    samplePages: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/samples/sudoku-grossdruck-100/${n}.webp`),
    seo: {
      title: 'Sudoku Großdruck – 120 leichte und mittlere Rätsel für Senioren',
      description:
        '120 Sudoku-Rätsel in wirklich großer Schrift, leicht bis mittel. Zwei Rätsel pro Seite, große Felder, eine kurze Anleitung und alle Lösungen. Ein Geschenk für Oma und Opa.',
    },
  },
  {
    slug: 'sudoku-grossdruck-103',
    title: 'Sudoku Großdruck. Geschenkausgabe',
    cardTitle: 'Sudoku Großdruck – Geschenkausgabe',
    subtitle: '150 Rätsel, leicht, mittel und schwer',
    detailSubtitle: '150 Rätsel, leicht, mittel und schwer, mit Lösungen — im Hardcover',
    ageRange: 'Dorośli',
    category: 'sudoku',
    series: 'sudoku-duzy-druk',
    audience: 'duzy-druk',
    lang: 'de',
    edition: 'sudoku-103',
    description:
      'Ein Geschenk für alle, die gern knobeln: 150 Sudoku-Rätsel in großer, gut lesbarer Schrift, in einem festen Hardcover. Nur zwei Rätsel pro Seite – jedes Gitter ist 11 cm breit, die Kästchen messen 1,2 cm, so bleibt viel Platz für Notizen mit dem Bleistift. Gleich auf der ersten Seite ist Platz für eine persönliche Widmung mit den Zeilen „Für“ und „Von“. Drei Stufen mit je 50 Rätseln, von leicht bis schwer, und eine bebilderte Anleitung, die die Lösungsmethoden Schritt für Schritt erklärt – bis hin zu Paaren, Dreiergruppen und X-Wing.',
    features: [
      '150 Sudoku-Rätsel in drei Stufen: je 50 leichte, mittlere und schwere',
      'Großdruck: Gitter 11 cm breit, zwei Rätsel pro Seite',
      'Festes Hardcover mit Widmungsseite',
      'Bebilderte Anleitung und alle Lösungen am Ende des Buches',
    ],
    coverImage: '/covers/sudoku-grossdruck-103.webp',
    amazonUrl: 'https://www.amazon.de/dp/839839014X',
    featured: false,
    formatInches: '8,25 × 11 Zoll',
    hardcover: true,
    pageCount: 122,
    isbn: '978-83-983901-4-9',
    samplePages: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/samples/sudoku-grossdruck-103/${n}.webp`),
    seo: {
      title: 'Sudoku Großdruck Geschenkausgabe – 150 Rätsel im Hardcover',
      description:
        '150 Sudoku-Rätsel in großer Schrift, leicht bis schwer, im festen Hardcover mit Widmungsseite. Bebilderte Anleitung und alle Lösungen. Ein Geschenk für Oma und Opa.',
    },
  },
  {
    slug: 'large-print-sudoku-100',
    title: 'Large Print Sudoku',
    cardTitle: 'Large Print Sudoku – Easy & Medium',
    subtitle: '120 puzzles, easy and medium',
    ageRange: 'Dorośli',
    category: 'sudoku',
    series: 'sudoku-duzy-druk',
    audience: 'duzy-druk',
    lang: 'en',
    edition: 'sudoku-100',
    description:
      '120 Sudoku puzzles printed in a really large font. Two puzzles per page, clear grids, and plenty of space for notes. This book was created for people who enjoy a daily dose of logical thinking but are tired of the tiny print found in newspaper puzzle books. You’ll start with simple puzzles to warm up, and the difficulty gradually increases, so there’s no frustration and no boredom. Solving Sudoku is a relaxing way to exercise your concentration and memory — a great alternative to watching TV or spending time on your phone. An ideal gift for Mom, Dad, Grandma, or Grandpa — for a birthday, the holidays, or simply as a thoughtful gift for no particular occasion.',
    features: [
      '120 unique Sudoku puzzles (easy and medium difficulty)',
      'Large print and spacious grids, comfortable even for readers with poor eyesight',
      'A short introduction for those who are just getting started',
      'Complete solutions at the back of the book',
    ],
    coverImage: '/covers/large-print-sudoku-100.webp',
    amazonUrl: 'https://a.co/d/0ckW3d2Q',
    featured: true,
    formatInches: '8.5 × 11 in',
    pageCount: 96,
    isbn: '978-83-982993-0-5',
    samplePages: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/samples/large-print-sudoku-100/${n}.webp`),
    seo: {
      title: 'Large Print Sudoku – 120 Easy and Medium Puzzles for Seniors',
      description:
        '120 Sudoku puzzles in a really large font, easy to medium. Two puzzles per page, clear grids, a beginner’s introduction and full solutions. A gift for Grandma or Grandpa.',
    },
  },
  {
    slug: 'large-print-sudoku-101',
    title: 'Large Print Sudoku',
    cardTitle: 'Large Print Sudoku – Hard',
    subtitle: '120 puzzles, hard and very hard',
    ageRange: 'Dorośli',
    category: 'sudoku',
    series: 'sudoku-duzy-druk',
    audience: 'duzy-druk',
    lang: 'en',
    edition: 'sudoku-101',
    description:
      '120 challenging Sudoku puzzles printed in a really large font. Two puzzles per page, clear grids, and plenty of space for notes. This book is for those who have outgrown easy grids and want a real challenge for the mind — without squinting at tiny print. The puzzles are arranged in two levels, hard and then very hard, and the introduction explains the advanced methods you will need along the way: pairs, X-Wing, Swordfish and XY-Wing.',
    features: [
      '120 unique Sudoku puzzles (hard and very hard difficulty)',
      'Large print and spacious grids — two puzzles per page',
      'An introduction to advanced methods: pairs, X-Wing, Swordfish, XY-Wing',
      'Complete solutions at the back of the book',
    ],
    coverImage: '/covers/large-print-sudoku-101.webp',
    amazonUrl: 'https://a.co/d/0ffwaVcr',
    featured: true,
    formatInches: '8.5 × 11 in',
    pageCount: 100,
    isbn: '978-83-982993-4-3',
    samplePages: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/samples/large-print-sudoku-101/${n}.webp`),
    seo: {
      title: 'Large Print Sudoku – 120 Hard and Very Hard Puzzles',
      description:
        '120 hard and very hard Sudoku puzzles in a really large font. Two puzzles per page, an introduction to advanced methods (X-Wing, Swordfish, XY-Wing) and full solutions.',
    },
  },
  {
    slug: 'large-print-sudoku-102',
    title: 'Large Print Sudoku',
    cardTitle: 'Large Print Sudoku – Beginners',
    subtitle: '150 puzzles for beginners, warm-up and easy',
    ageRange: 'Dorośli',
    category: 'sudoku',
    series: 'sudoku-duzy-druk',
    audience: 'duzy-druk',
    lang: 'en',
    edition: 'sudoku-102',
    description:
      '150 Sudoku puzzles for beginners, printed in a really large font. Two puzzles per page, clear grids, and plenty of space for notes. A gentle start: first a warm-up, where careful looking is enough, then the easy level. The step-by-step introduction shows two simple methods and what to do when you get stuck — a good first Sudoku book, and a calm daily habit for the mind.',
    features: [
      '150 unique Sudoku puzzles (warm-up and easy difficulty)',
      'Large print and spacious grids — two puzzles per page',
      'A step-by-step guide for beginners',
      'Complete solutions at the back of the book',
    ],
    coverImage: '/covers/large-print-sudoku-102.webp',
    amazonUrl: 'https://a.co/d/085EeTeZ',
    featured: true,
    formatInches: '8.5 × 11 in',
    pageCount: 122,
    isbn: '978-83-982993-6-7',
    samplePages: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/samples/large-print-sudoku-102/${n}.webp`),
    seo: {
      title: 'Large Print Sudoku for Beginners – 150 Warm-up and Easy Puzzles',
      description:
        '150 easy Sudoku puzzles for beginners in a really large font. Two puzzles per page, a step-by-step guide and full solutions. A calm first Sudoku book.',
    },
  },
  {
    slug: 'large-print-sudoku-103',
    title: 'Large Print Sudoku. Gift Edition',
    cardTitle: 'Large Print Sudoku – Gift Edition',
    subtitle: '150 puzzles, easy, medium and hard',
    detailSubtitle: '150 puzzles, easy, medium and hard, with solutions — in hardcover',
    ageRange: 'Dorośli',
    category: 'sudoku',
    series: 'sudoku-duzy-druk',
    audience: 'duzy-druk',
    lang: 'en',
    edition: 'sudoku-103',
    description:
      'A gift for anyone who loves a good puzzle: 150 Sudoku puzzles printed in large, easy-to-read digits, in a sturdy hardcover. The cells are a fifth larger than in a typical Sudoku, so writing in them is comfortable — no magnifying glass, no squinting. The first page is left for your dedication: fill in “For” and “From”, and the book becomes a personal gift. Three levels of 50 puzzles each, from easy to hard, and an illustrated introduction that explains the methods step by step.',
    features: [
      '150 unique Sudoku puzzles in three levels: 50 easy, 50 medium, 50 hard',
      'Large print: 11 cm (4.3 in) grids, two per page',
      'Sturdy hardcover with a dedication page at the front',
      'Illustrated introduction to the methods; complete solutions at the back',
    ],
    coverImage: '/covers/large-print-sudoku-103.webp',
    amazonUrl: 'https://www.amazon.com/dp/8398390158',
    featured: true,
    formatInches: '8.25 × 11 in',
    hardcover: true,
    pageCount: 122,
    isbn: '978-83-983901-5-6',
    samplePages: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/samples/large-print-sudoku-103/${n}.webp`),
    seo: {
      title: 'Large Print Sudoku Gift Edition – 150 Puzzles in Hardcover',
      description:
        '150 large print Sudoku puzzles, easy, medium and hard, in a sturdy hardcover with a dedication page. Illustrated introduction and full solutions. A gift for Grandma or Grandpa.',
    },
  },
  {
    slug: 'sudoku-300-puzzles-200',
    title: 'Sudoku',
    subtitle: '300 puzzles from easy to very hard',
    ageRange: 'Dorośli',
    category: 'sudoku',
    series: 'lamiglowki-logiczne',
    audience: 'dorosli',
    lang: 'en',
    edition: 'sudoku-200',
    description:
      'One grid, nine digits and a moment just for you. This book contains 300 Sudoku puzzles arranged from the easiest to the hardest — you’ll start with simple ones and finish with grids that will keep you busy much longer. Every puzzle has exactly one solution and can be solved by logic alone, with no guessing. Perfect for travel, a morning coffee, a waiting room or an evening away from screens. A great gift for anyone who loves puzzles — and for yourself.',
    features: [
      '300 Sudoku puzzles in four levels: easy, medium, hard and very hard',
      'An introduction to solving methods — from the basics to X-Wing, Swordfish and XY-Wing',
      'Full solutions at the back of the book',
      'Clear grids with bold 3×3 box lines',
    ],
    coverImage: '/covers/sudoku-300-puzzles-200.webp',
    amazonUrl: 'https://a.co/d/0icV7JLn',
    featured: true,
    formatInches: '8.5 × 11 in',
    pageCount: 132,
    samplePages: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/samples/sudoku-300-puzzles-200/${n}.webp`),
    seo: {
      title: '300 Sudoku Puzzles – From Easy to Very Hard',
      description:
        '300 Sudoku puzzles in four difficulty levels, each with exactly one solution. An introduction to techniques from the basics to X-Wing and Swordfish. Solutions included.',
    },
  },
  {
    // Wydanie EN tomu 400 — czeka na publikację w KDP. Gdy będzie link (amazon.com):
    // wpisać amazonUrl, usunąć comingSoon, dodać isbn.
    slug: 'killer-sudoku-400-en',
    title: 'Killer Sudoku',
    subtitle: '150 easy puzzles for beginners',
    ageRange: 'Dorośli',
    category: 'sudoku',
    series: 'lamiglowki-logiczne',
    audience: 'dorosli',
    lang: 'en',
    edition: 'killer-sudoku-400',
    description:
      'Enjoy Sudoku and fancy trying something new? Killer Sudoku keeps the classic rules and adds a little simple arithmetic: besides filling every row, column and box with the digits 1 to 9, the digits in each cage must add up to the number shown. 150 puzzles arranged from the easiest to the hardest, with starting digits to get you going — great practice for logic and mental arithmetic, without the frustration.',
    features: [
      '150 puzzles for beginners, from the easiest to the hardest',
      'A starter guide: the rules, three basic techniques and the rule of 45',
      'Cage-sum tables for two-, three- and four-cell cages',
      'Complete solutions at the back of the book',
    ],
    coverImage: '/covers/killer-sudoku-400-en.webp',
    amazonUrl: 'https://www.amazon.com/dp/8398390123',
    featured: false,
    formatInches: '8.5 × 11 in',
    pageCount: 110,
    isbn: '978-83-983901-2-5',
    samplePages: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/samples/killer-sudoku-400-en/${n}.webp`),
    seo: {
      title: 'Killer Sudoku – 150 Easy Puzzles for Beginners',
      description:
        '150 easy Killer Sudoku puzzles with starting digits. A starter guide with the rule of 45, cage-sum tables and full solutions. A gentle way into a new puzzle.',
    },
  },
  {
    slug: 'kakuro-puzzle-book-for-beginners',
    title: 'Kakuro Puzzle Book for Beginners',
    cardTitle: 'Kakuro for Beginners',
    subtitle: '192 cross-sum puzzles, super easy to normal',
    detailSubtitle:
      '192 cross-sum puzzles from super easy to normal — with a step-by-step solving tutorial and complete answer key',
    ageRange: 'Dorośli',
    category: 'inne',
    series: 'lamiglowki-logiczne',
    audience: 'dorosli',
    lang: 'en',
    description:
      'Never solved a Kakuro? Start here. Kakuro is a number-logic puzzle, a little like a crossword made of sums: every white cell holds a digit from 1 to 9, the clues tell you what each run adds up to, and no digit may repeat within a run. A step-by-step tutorial solves a complete example puzzle with you before puzzle 1, and a reference table lists the sums that have only one possible set of digits. Then 192 puzzles take you gently from Super Easy to Normal, with the grids growing as you go: 4×4, then 5×5, then 6×6.',
    features: [
      '192 puzzles: 32 Super Easy, 64 Easy and 96 Normal',
      'Step-by-step tutorial with a fully solved example puzzle',
      'Four puzzles per page, each grid 3 in wide, with room to write',
      'One solution per puzzle, solvable by logic alone; full answer key at the back',
    ],
    coverImage: '/covers/kakuro-puzzle-book-for-beginners.webp',
    amazonUrl: 'https://www.amazon.com/dp/8398144181',
    featured: false,
    formatInches: '8.5 × 11 in',
    pageCount: 108,
    isbn: '978-83-981441-8-6',
    samplePages: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `/samples/kakuro-puzzle-book-for-beginners/${n}.webp`),
    seo: {
      title: 'Kakuro Puzzle Book for Beginners – 192 Cross-Sum Puzzles',
      description:
        '192 Kakuro puzzles for beginners, from super easy to normal, with a step-by-step tutorial, a table of unique sums and a full answer key. Solvable by logic alone.',
    },
  },
  {
    slug: 'znajdz-zakresl-zapamietaj-angielski-czasowniki',
    title: 'Znajdź, zakreśl, zapamiętaj',
    cardTitle: 'Znajdź, zakreśl, zapamiętaj – angielski',
    subtitle: 'Angielski – czasowniki nieregularne',
    detailSubtitle:
      'Angielski – czasowniki nieregularne · Wykreślanki i zdania z lukami. Ćwiczenia dla młodzieży i dorosłych',
    ageRange: '13+',
    category: 'nauka-jezykow',
    series: 'wykreslanki-jezykowe',
    audience: 'dorosli',
    lang: 'pl',
    description:
      'Wykreślanki dla nastolatków i dorosłych, którzy chcą wreszcie opanować angielskie czasowniki nieregularne. Na każdej rozkładówce plansza z wyrazami do odszukania po lewej, po prawej słówka, których szukasz, a następnie luki i zdania do uzupełnienia.',
    features: [
      '184 czasowniki: 120 podstawowych i 64 zaawansowane',
      '40 wykreślanek na rozkładówkach – plansza po lewej, zadania po prawej',
      '5 poziomów – od wyszukiwania form do zdań z lukami',
      '2 testy „Sprawdź się!”, tabela wszystkich form i rozwiązania',
    ],
    coverImage: '/covers/znajdz-zakresl-zapamietaj-angielski-czasowniki.webp',
    amazonUrl: 'https://www.amazon.pl/dp/8398299398',
    featured: false,
    formatInches: '8,5 × 11 cala',
    pageCount: 126,
    isbn: '978-83-982993-9-8',
    samplePages: [1, 2, 3, 4, 5, 6, 7].map(
      (n) => `/samples/znajdz-zakresl-zapamietaj-angielski-czasowniki/${n}.webp`,
    ),
    seo: {
      title: 'Angielskie czasowniki nieregularne w wykreślankach – Znajdź, zakreśl, zapamiętaj',
      description:
        '184 angielskie czasowniki nieregularne w 40 wykreślankach: plansze, luki i zdania w Past Simple i Present Perfect, 2 testy i tabela form. Dla młodzieży i dorosłych.',
      keywords: [
        'czasowniki nieregularne angielski',
        'irregular verbs ćwiczenia',
        'nauka angielskiego',
        'wykreślanki po angielsku',
        'Past Simple Present Perfect ćwiczenia',
      ],
    },
  },
  {
    slug: 'znajdz-zakresl-zapamietaj-niemiecki-biznesowy',
    title: 'Znajdź, zakreśl, zapamiętaj',
    cardTitle: 'Znajdź, zakreśl, zapamiętaj – niemiecki',
    subtitle: 'Niemiecki – słownictwo biznesowe',
    detailSubtitle:
      'Niemiecki – słownictwo biznesowe · Wykreślanki i zdania z lukami. Poziom C1–C2',
    ageRange: 'Dorośli',
    category: 'nauka-jezykow',
    series: 'wykreslanki-jezykowe',
    audience: 'dorosli',
    lang: 'pl',
    description:
      'Wykreślanki dla osób, które znają niemiecki na poziomie C1 i chcą brzmieć jak niemieckie biuro: wiedzieć, że decyzję się trifft, a nie macht, i że Konkurs to upadłość, a nie konkurs. Na każdej rozkładówce plansza po lewej, a po prawej zdania z życia firmy z lukami do uzupełnienia i ich polskie tłumaczenia. Najpierw wpisujesz brakujące słowo, potem szukasz go w planszy — tak sprawdzasz odpowiedź.',
    features: [
      '32 wykreślanki na rozkładówkach i 576 zdań z lukami',
      '5 części: słownictwo specjalistyczne, Funktionsverbgefüge, korespondencja, umowy i negocjacje, idiomy i fałszywi przyjaciele',
      '2 testy „Sprawdź się!” i słowniczek Funktionsverbgefüge',
      'Rozwiązania wszystkich wykreślanek',
    ],
    coverImage: '/covers/znajdz-zakresl-zapamietaj-niemiecki-biznesowy.webp',
    amazonUrl: 'https://www.amazon.pl/dp/8398390107',
    featured: false,
    formatInches: '8,5 × 11 cala',
    pageCount: 92,
    isbn: '978-83-983901-0-1',
    samplePages: [1, 2, 3, 4, 5, 6, 7].map(
      (n) => `/samples/znajdz-zakresl-zapamietaj-niemiecki-biznesowy/${n}.webp`,
    ),
    seo: {
      title: 'Niemiecki biznesowy C1–C2 w wykreślankach – Znajdź, zakreśl, zapamiętaj',
      description:
        '576 zdań z lukami i 32 wykreślanki: słownictwo specjalistyczne, Funktionsverbgefüge, korespondencja, umowy, idiomy i fałszywi przyjaciele. Niemiecki biznesowy C1–C2.',
      keywords: [
        'niemiecki biznesowy',
        'niemiecki C1 ćwiczenia',
        'Funktionsverbgefüge',
        'korespondencja handlowa niemiecki',
        'słownictwo biznesowe niemiecki',
      ],
    },
  },
];

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((book) => book.slug === slug);
}

// Wszystkie wydania językowe książki, łącznie z nią samą; pusta lista, gdy
// książka ma tylko jedno wydanie (hreflang z jednym językiem nic nie wnosi).
export function getEditions(book: Book): Book[] {
  if (!book.edition) {
    return [];
  }
  const editions = books.filter((other) => other.edition === book.edition);
  return editions.length > 1 ? editions : [];
}

// Sekcja „Wyróżnione książki” na stronie głównej mieści dwa rzędy po trzy kafelki.
export const FEATURED_LIMIT = 6;

// Każda wersja językowa strony głównej poleca własne tytuły — inaczej polska
// strona główna pokazywałaby niemieckie książki i odwrotnie.
export function getFeaturedBooks(lang: BookLang): Book[] {
  return books
    .filter((book) => book.featured && book.lang === lang)
    .slice(0, FEATURED_LIMIT);
}

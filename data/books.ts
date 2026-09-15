export type BookCategory =
  | 'wykreslanki'
  | 'sudoku'
  | 'labirynty'
  | 'kolorowanki'
  | 'laczenie-kropek'
  | 'inne';

export type BookAudience = 'dzieci' | 'dorosli' | 'duzy-druk';

// Język, w którym napisana jest książka (treść zagadek, nie strona sklepu).
export type BookLang = 'pl' | 'de' | 'en';

export type Book = {
  slug: string; // np. "znajdz-slowko-poziom-latwy"
  title: string; // "Znajdź słówko!"
  subtitle: string; // "Poziom najłatwiejszy"
  ageRange: string; // "5–6 lat"
  category: BookCategory;
  audience: BookAudience;
  lang: BookLang; // język treści książki
  description: string;
  features: string[]; // np. ["100 wykreślanek", "Duża czcionka", ...]
  coverImage: string; // /public/covers/<slug>.png — nazwa pliku równa slugowi
  amazonUrl: string;
  featured: boolean;
  comingSoon?: boolean;
  formatInches: string; // np. '8,5 × 11 cala'
  pageCount: number;
};

// Kategorie do filtrowania w katalogu — etykiety po polsku.
export const CATEGORY_LABELS: Record<BookCategory, string> = {
  wykreslanki: 'Wykreślanki',
  sudoku: 'Sudoku',
  labirynty: 'Labirynty',
  kolorowanki: 'Kolorowanki',
  'laczenie-kropek': 'Łączenie kropek',
  inne: 'Inne',
};

// Grupy odbiorców do filtrowania w katalogu — etykiety po polsku.
export const AUDIENCE_LABELS: Record<BookAudience, string> = {
  dzieci: 'Dla dzieci',
  dorosli: 'Dla dorosłych',
  'duzy-druk': 'Duży druk',
};

// Kolejność języków w subtelnym filtrze katalogu.
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
    subtitle: 'Poziom najłatwiejszy',
    ageRange: '5–6 lat',
    category: 'wykreslanki',
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
    coverImage: '/covers/znajdz-slowko-poziom-latwy.png',
    amazonUrl: 'https://amzn.eu/d/0coMqTkj',
    featured: true,
    formatInches: '8,5 × 11 cala',
    pageCount: 128,
  },
  {
    slug: 'znajdz-slowko-poziom-latwy-6-7',
    title: 'Znajdź słówko!',
    subtitle: 'Poziom łatwy',
    ageRange: '6–7 lat',
    category: 'wykreslanki',
    audience: 'dzieci',
    lang: 'pl',
    description:
      'Kolejna dawka wykreślanek na dobry start — znajome słowa i przejrzysty układ, który nie zniechęca. Świetna, żeby utrwalić czytanie tuż przed startem szkoły.',
    features: [
      '100 wykreślanek',
      'Utrwala naukę czytania',
      'Przejrzysty, czytelny układ',
      'Tematy bliskie dzieciom (zwierzęta, rodzina, kolory)',
    ],
    coverImage: '/covers/znajdz-slowko-poziom-latwy-6-7.png',
    amazonUrl: 'https://amzn.eu/d/07BBUa1X',
    featured: true,
    formatInches: '8,5 × 11 cala',
    pageCount: 128,
  },
  {
    slug: 'znajdz-slowko-poziom-sredni-7-9',
    title: 'Znajdź słówko!',
    subtitle: 'Poziom średni',
    ageRange: '7–9 lat',
    category: 'wykreslanki',
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
    coverImage: '/covers/znajdz-slowko-poziom-sredni-7-9.png',
    amazonUrl: 'https://amzn.eu/d/0dJNgtH1',
    featured: true,
    formatInches: '8,5 × 11 cala',
    pageCount: 128,
  },
  {
    slug: 'znajdz-slowko-poziom-trudny-10',
    title: 'Znajdź słówko!',
    subtitle: 'Poziom trudny',
    ageRange: '10+',
    category: 'wykreslanki',
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
    coverImage: '/covers/znajdz-slowko-poziom-trudny-10.png',
    amazonUrl: 'https://amzn.eu/d/07eXC8JG',
    featured: true,
    formatInches: '8,5 × 11 cala',
    pageCount: 128,
  },
  {
    slug: 'znajdz-slowko-poziom-ekspert-13',
    title: 'Znajdź słówko!',
    subtitle: 'Poziom ekspert',
    ageRange: '13+',
    category: 'wykreslanki',
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
    coverImage: '/covers/znajdz-slowko-poziom-ekspert-13.png',
    amazonUrl: 'https://amzn.eu/d/07es8Itl',
    featured: false,
    formatInches: '8,5 × 11 cala',
    pageCount: 128,
  },
  {
    slug: 'zdobywca-szczytow',
    title: 'Zdobywca Szczytów',
    subtitle: '75 wykreślanek z nazwami szczytów odznak turystycznych Polski i okolic',
    ageRange: 'Dorośli',
    category: 'wykreslanki',
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
    coverImage: '/covers/zdobywca-szczytow.png',
    amazonUrl: 'https://amzn.eu/d/03CTNBDE',
    featured: true,
    formatInches: '8,5 × 11 cala',
    pageCount: 100,
  },
  {
    slug: 'sudoku-duzym-drukiem-100',
    title: 'Sudoku dużym drukiem',
    subtitle: '120 łamigłówek, poziom łatwy–średni',
    ageRange: 'Dorośli',
    category: 'sudoku',
    audience: 'duzy-druk',
    lang: 'pl',
    description:
      '120 łamigłówek sudoku wydrukowanych naprawdę dużą czcionką. Dwie zagadki na stronę, wyraźne kratki i mnóstwo miejsca na notatki. Ta książka powstała z myślą o osobach, które lubią codzienną porcję logicznego myślenia, ale mają dość drobnego druku w klasycznych wydaniach — tu możesz skupić się na zadaniu, nie nadwyrężając oczu. Rozwiązywanie sudoku to spokojne ćwiczenie koncentracji i pamięci, świetna alternatywa dla telewizora czy telefonu. Idealny prezent dla mamy, taty, babci lub dziadka — na urodziny, święta albo bez okazji.',
    features: [
      '120 unikalnych sudoku (poziom łatwy i średni)',
      'Powiększona czcionka i duże kratki — wygodne przy słabszym wzroku',
      'Krótka instrukcja dla początkujących',
      'Komplet rozwiązań na końcu książki',
    ],
    coverImage: '/covers/sudoku-duzym-drukiem-100.png',
    amazonUrl: 'https://amzn.eu/d/01Wm4XgX',
    featured: false,
    formatInches: '8,5 × 11 cala',
    pageCount: 96,
  },
  {
    slug: 'sudoku-300-zagadek-200',
    title: 'Sudoku',
    subtitle: '300 zagadek od łatwych do bardzo trudnych',
    ageRange: 'Dorośli',
    category: 'sudoku',
    audience: 'dorosli',
    lang: 'pl',
    description:
      'Jedna plansza, dziewięć cyfr i chwila tylko dla siebie. Ten tom zawiera 300 zagadek sudoku ułożonych od najłatwiejszych do najtrudniejszych — zaczniesz od prostych, a skończysz na takich, przy których posiedzisz znacznie dłużej. Każda zagadka ma dokładnie jedno rozwiązanie i da się ją rozwiązać samą logiką, bez zgadywania. Świetnie sprawdza się w podróży, przy porannej kawie, w poczekalni albo wieczorem zamiast ekranu. Dobry pomysł na prezent dla kogoś, kto lubi łamigłówki — i dla siebie.',
    features: [
      '300 sudoku w czterech poziomach: łatwy, średni, trudny i bardzo trudny',
      'Wstęp z metodami rozwiązywania — od podstaw po X-Wing, Swordfish i XY-Wing',
      'Wszystkie rozwiązania na końcu książki',
      'Czytelne plansze z pogrubionymi liniami bloków 3×3',
    ],
    coverImage: '/covers/sudoku-300-zagadek-200.png',
    amazonUrl: 'https://amzn.eu/d/08vEb3Mk',
    featured: true,
    formatInches: '8,5 × 11 cala',
    pageCount: 132,
  },
  {
    slug: 'meine-ersten-wortsuchratsel-stufe-1',
    title: 'Meine ersten Wortsuchrätsel',
    subtitle: 'Stufe 1: 5–6 Jahre',
    ageRange: '5–6 lat',
    category: 'wykreslanki',
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
    coverImage: '/covers/meine-ersten-wortsuchratsel-stufe-1.png',
    amazonUrl: 'https://amzn.eu/d/06ffGySu',
    featured: true,
    formatInches: '8,5 × 11 cala',
    pageCount: 108,
  },
  {
    slug: 'meine-ersten-wortsuchratsel-stufe-2',
    title: 'Meine ersten Wortsuchrätsel',
    subtitle: 'Stufe 2: 6–7 Jahre',
    ageRange: '6–7 lat',
    category: 'wykreslanki',
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
    coverImage: '/covers/meine-ersten-wortsuchratsel-stufe-2.png',
    amazonUrl: 'https://amzn.eu/d/0cmPID9O',
    featured: true,
    formatInches: '8,5 × 11 cala',
    pageCount: 108,
  },
];

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((book) => book.slug === slug);
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

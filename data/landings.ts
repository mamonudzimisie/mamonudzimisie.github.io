import type { SiteLang } from '@/lib/catalog-i18n';

// Strony docelowe pod konkretne frazy („wykreślanki dla dzieci”, „sudoku dla
// seniorów”…). Katalog filtruje grupy parametrem ?grupa=, którego Google nie
// traktuje jak osobnej strony — te strony są trwałym adresem pod frazę:
// wstęp, książki, „jak wybrać”, FAQ (także jako FAQPage w JSON-LD).

export type LandingSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type Landing = {
  lang: SiteLang;
  slug: string; // adres: /<lang>/<slug>
  seoTitle: string; // bez „| ZALKA BOOKS” — dokleja go layout
  seoDescription: string;
  eyebrow: string;
  h1: string;
  intro: string[];
  booksHeading: string;
  bookSlugs: string[]; // w kolejności od najłatwiejszej
  sections: LandingSection[];
  faqHeading: string;
  faq: { q: string; a: string }[];
  linksHeading: string;
  links: { href: string; label: string }[];
};

export const landings: Landing[] = [
  {
    lang: 'pl',
    slug: 'wykreslanki-dla-dzieci',
    seoTitle: 'Wykreślanki dla dzieci 5, 6, 7 lat i starszych',
    seoDescription:
      'Wykreślanki dla dzieci od 5 do 13 lat: pięć poziomów serii Znajdź słówko!, tom świąteczny i darmowe plansze do druku. Jak dobrać poziom do wieku i umiejętności czytania.',
    eyebrow: 'Seria Znajdź słówko!',
    h1: 'Wykreślanki dla dzieci od 5 do 13 lat',
    intro: [
      'Wykreślanka to jedna z najprostszych łamigłówek: na planszy z literami trzeba odnaleźć ukryte słowa i je zakreślić. Dziecko nie potrzebuje do niej żadnych zasad poza jedną — szukaj. A przy okazji ćwiczy czytanie, spostrzegawczość i cierpliwość.',
      'Nasza seria Znajdź słówko! ma pięć poziomów, od pierwszych literek w wieku 5 lat po gęste plansze dla nastolatków. W każdym tomie jest 100 wykreślanek po polsku i rozwiązania na końcu książki.',
    ],
    booksHeading: 'Pięć poziomów i tom świąteczny',
    bookSlugs: [
      'znajdz-slowko-poziom-latwy',
      'znajdz-slowko-poziom-latwy-6-7',
      'znajdz-slowko-poziom-sredni-7-9',
      'znajdz-slowko-poziom-trudny-10',
      'znajdz-slowko-poziom-ekspert-13',
      'znajdz-slowko-swieta',
    ],
    sections: [
      {
        heading: 'Jak dobrać poziom?',
        paragraphs: ['Wiek to tylko wskazówka. Ważniejsze jest to, jak dziecko czyta:'],
        bullets: [
          '5–6 lat: dziecko zna litery albo dopiero je poznaje. Mała plansza (8×8), duże litery, krótkie, znajome słowa.',
          '6–7 lat: dziecko składa litery w słowa, zerówka lub pierwsza klasa. Słowa biegną tak, jak czytamy (od lewej i z góry), tylko jedno na planszy idzie po skosie.',
          '7–9 lat: dziecko czyta płynnie. Dłuższe słowa i większa plansza (13×13).',
          '10+: długie słowa we wszystkich kierunkach, także wspak.',
          '13+: najgęstsze plansze w serii (17×17), dla nastolatków i dorosłych, którzy lubią wyzwanie.',
        ],
      },
      {
        heading: 'Co dają wykreślanki?',
        paragraphs: [
          'Szukając słowa, dziecko wiele razy czyta je litera po literze i porównuje z planszą. To ten sam ruch oka, którego potrzebuje przy czytaniu, tylko w formie zabawy, a nie ćwiczenia. Do tego dochodzi skupienie na jednym zadaniu przez kilka minut i satysfakcja, gdy słowo w końcu się znajdzie.',
          'Wykreślanki nie wymagają ekranu, ładowarki ani dorosłego obok — dobrze sprawdzają się w podróży, w poczekalni i w spokojne popołudnie.',
        ],
      },
    ],
    faqHeading: 'Najczęstsze pytania',
    faq: [
      {
        q: 'Od jakiego wieku dziecko może rozwiązywać wykreślanki?',
        a: 'Najprostsze plansze sprawdzają się już u 5-latków, które znają litery. Dziecko, które jeszcze nie czyta, może szukać słów, porównując je litera po literze z listą — tak właśnie oswaja się z literkami.',
      },
      {
        q: 'Którą książkę wybrać, gdy waham się między dwoma poziomami?',
        a: 'Łatwiejszą. Dziecko, które samo rozwiąże pierwsze plansze, chętnie wraca do książki, a to, które od razu utknie, zwykle już do niej nie wraca.',
      },
      {
        q: 'Czy w książkach są rozwiązania?',
        a: 'Tak, każda książka ma na końcu rozwiązania wszystkich plansz z zaznaczonymi słowami.',
      },
      {
        q: 'Czy mogę najpierw sprawdzić, czy dziecku się spodoba?',
        a: 'Tak, w dziale Do pobrania są darmowe wykreślanki do wydrukowania dla dzieci 5–7 lat, z rozwiązaniami.',
      },
    ],
    linksHeading: 'Przeczytaj też',
    links: [
      { href: '/pl/materialy', label: 'Darmowe wykreślanki do druku dla dzieci 5–7 lat' },
      { href: '/pl/blog/wykreslanki-dla-dzieci', label: 'Wykreślanki dla dzieci – 6 powodów, dla których warto po nie sięgnąć' },
      { href: '/pl/blog/dziecko-nie-lubi-czytac', label: 'Jak pomóc dziecku, które nie lubi czytać – 5 zabaw z literami' },
      { href: '/pl/blog/lamiglowki-na-prezent-mikolajki-swieta', label: 'Łamigłówki na prezent na Mikołajki i pod choinkę' },
    ],
  },
  {
    lang: 'pl',
    slug: 'sudoku-dla-seniorow',
    seoTitle: 'Sudoku dla seniorów – duży druk, trzy poziomy',
    seoDescription:
      'Sudoku dużym drukiem dla seniorów i osób ze słabszym wzrokiem: dwie zagadki na stronę, plansza 11 cm, trzy poziomy od rozgrzewki po bardzo trudne. Jak wybrać tom.',
    eyebrow: 'Sudoku dużym drukiem',
    h1: 'Sudoku dla seniorów, dużym drukiem',
    intro: [
      'Wiele książek z sudoku drukuje się drobno, po cztery albo sześć plansz na stronie. Przy słabszym wzroku rozwiązywanie zamienia się wtedy w mrużenie oczu. Nasze sudoku dużym drukiem mają dwie zagadki na stronę, planszę o szerokości około 11 cm i cyfry, które czyta się bez lupy.',
      'Seria ma trzy tomy na trzy poziomy, więc łatwo dobrać książkę do kogoś, kto dopiero zaczyna, i do kogoś, kto rozwiązuje sudoku od lat.',
    ],
    booksHeading: 'Trzy tomy, od rozgrzewki po bardzo trudne',
    bookSlugs: ['sudoku-duzym-drukiem-102', 'sudoku-duzym-drukiem-100', 'sudoku-duzym-drukiem-101'],
    sections: [
      {
        heading: 'Który tom wybrać?',
        bullets: [
          'Nr 102, rozgrzewka i łatwy: na początek. Wstęp krok po kroku pokazuje dwie proste metody — dobry wybór dla kogoś, kto sudoku jeszcze nie zna albo dawno nie rozwiązywał.',
          'Nr 100, łatwy i średni: na co dzień. Bezpieczny środek, gdy nie wiesz, jak dobrze obdarowywana osoba radzi sobie z sudoku.',
          'Nr 101, trudny i bardzo trudny: dla wprawnych. 60 trudnych i 60 bardzo trudnych zagadek, wstęp z metodami zaawansowanymi (pary, X-Wing, Swordfish, XY-Wing).',
        ],
      },
      {
        heading: 'Co znaczy u nas „duży druk”?',
        bullets: [
          'Dwie zagadki na stronę formatu zbliżonego do A4 (21,6 × 27,9 cm).',
          'Plansza szerokości około 11 cm, wyraźnie pogrubione bloki 3×3.',
          'W kratkach mieści się też ołówkowa notatka, gdy zagadka robi się trudniejsza.',
          'Każda zagadka ma dokładnie jedno rozwiązanie i da się ją rozwiązać samą logiką, bez zgadywania. Rozwiązania są na końcu książki.',
        ],
      },
    ],
    faqHeading: 'Najczęstsze pytania',
    faq: [
      {
        q: 'Czy te sudoku nadają się dla osoby, która nigdy ich nie rozwiązywała?',
        a: 'Tak, tom nr 102 zaczyna się od rozgrzewki, przy której wystarczy uważne patrzenie, a wstęp krok po kroku objaśnia zasady i dwie podstawowe metody.',
      },
      {
        q: 'Jak duża jest czcionka?',
        a: 'Plansza ma około 11 cm szerokości, a cyfry są wyraźnie większe niż w gazetowych sudoku. Większość osób rozwiązuje je bez lupy.',
      },
      {
        q: 'Czy rozwiązywanie sudoku ćwiczy pamięć?',
        a: 'Sudoku to ćwiczenie koncentracji i logicznego myślenia: trzeba trzymać w głowie kilka możliwości naraz i je sprawdzać. Wiele osób traktuje je jako codzienną porcję ruchu dla umysłu, bez ekranu.',
      },
      {
        q: 'Gdzie kupić te książki?',
        a: 'Wszystkie tomy są dostępne na Amazon.pl — linki są przy każdej książce powyżej.',
      },
    ],
    linksHeading: 'Przeczytaj też',
    links: [
      { href: '/pl/blog/sudoku-duzym-drukiem-dla-seniorow', label: 'Sudoku dużym drukiem dla seniorów i osób niedowidzących – jak wybrać poziom' },
      { href: '/pl/blog/lamiglowki-na-prezent-mikolajki-swieta', label: 'Łamigłówki na prezent: co dla kogo w rodzinie' },
    ],
  },
  {
    lang: 'de',
    slug: 'raetsel-grossdruck',
    seoTitle: 'Rätselbücher im Großdruck – Sudoku und Wortsuche',
    seoDescription:
      'Rätselbücher in großer, gut lesbarer Schrift: Sudoku Großdruck in zwei Stufen, als Geschenkausgabe im Hardcover, und Weihnachts-Wortsuchrätsel. Ein Geschenk für Oma und Opa.',
    eyebrow: 'Großdruck',
    h1: 'Rätselbücher im Großdruck',
    intro: [
      'Viele Rätselhefte sind so klein gedruckt, dass das Rätseln schnell anstrengend wird. Unsere Großdruck-Bücher haben große, kräftige Ziffern und Buchstaben, viel Platz zum Schreiben und höchstens zwei Rätsel pro Seite.',
      'Hier finden Sie alle unsere deutschen Rätselbücher in großer Schrift: Sudoku für jeden Tag, eine Geschenkausgabe im Hardcover und Wortsuchrätsel für die Adventszeit.',
    ],
    booksHeading: 'Unsere Bücher im Großdruck',
    bookSlugs: ['sudoku-grossdruck-100', 'sudoku-grossdruck-103', 'weihnachts-wortsuchratsel'],
    sections: [
      {
        heading: 'Welches Buch passt?',
        bullets: [
          'Sudoku Großdruck, Band 100: 120 Rätsel, leicht und mittel, als Taschenbuch. Gut für alle, die gern täglich ein Sudoku lösen.',
          'Sudoku Großdruck, Geschenkausgabe: 150 Rätsel in drei Stufen (leicht, mittel, schwer), im festen Hardcover, mit Widmungsseite.',
          'Weihnachts-Wortsuchrätsel: 80 Wortsuchrätsel mit weihnachtlichen Themen, ein Rätsel pro Seite. Die Wörter verlaufen nur waagerecht, senkrecht oder diagonal, nie rückwärts.',
        ],
      },
      {
        heading: 'Wie groß ist „Großdruck“?',
        bullets: [
          'Seiten im Format 21,6 × 27,9 cm, also fast A4.',
          'Sudoku: zwei Rätsel pro Seite, jedes Gitter etwa 11 cm breit.',
          'Wortsuchrätsel: ein Rätsel pro Seite, Kästchen gut 1,1 cm, Wortliste in rund 18 pt.',
          'Alle Lösungen stehen am Ende des Buches.',
        ],
      },
    ],
    faqHeading: 'Häufige Fragen',
    faq: [
      {
        q: 'Braucht man zum Lösen eine Lupe?',
        a: 'In der Regel nicht. Die Gitter sind etwa 11 cm breit (Sudoku), die Buchstabenkästchen gut 1,1 cm (Wortsuche) – deutlich größer als in üblichen Rätselheften.',
      },
      {
        q: 'Eignen sich die Sudoku-Bücher für Einsteiger?',
        a: 'Ja. Band 100 beginnt mit leichten Rätseln und einer kurzen Anleitung, die Geschenkausgabe erklärt die Lösungsmethoden Schritt für Schritt mit Abbildungen.',
      },
      {
        q: 'Sind Lösungen enthalten?',
        a: 'Ja, alle Bücher enthalten am Ende die Lösungen aller Rätsel.',
      },
      {
        q: 'Wo kann ich die Bücher kaufen?',
        a: 'Alle Bücher gibt es bei Amazon.de – die Links finden Sie bei jedem Buch oben.',
      },
    ],
    linksHeading: 'Mehr lesen',
    links: [
      { href: '/de/blog/weihnachts-wortsuchraetsel-grossdruck', label: 'Weihnachts-Wortsuchrätsel im Großdruck – 80 Rätsel für gemütliche Adventsabende' },
      { href: '/de/blog/sudoku-grossdruck-geschenkausgabe', label: 'Sudoku Großdruck als Geschenk – im festen Hardcover, mit Platz für Ihre Widmung' },
    ],
  },
  {
    lang: 'en',
    slug: 'large-print-sudoku',
    seoTitle: 'Large Print Sudoku for Seniors – four books, every level',
    seoDescription:
      'Large print sudoku books for seniors and anyone with tired eyes: two puzzles per page, 11 cm (4.3 in) grids, levels from warm-up to very hard, plus a hardcover gift edition.',
    eyebrow: 'Large Print Sudoku',
    h1: 'Large print sudoku for seniors',
    intro: [
      'Many sudoku books squeeze four or six puzzles onto a page. With tired eyes, solving turns into squinting. Our large print sudoku books have two puzzles per page, grids about 11 cm (4.3 in) wide and digits you can read without a magnifying glass.',
      'There are four books — three levels and a hardcover gift edition — so it is easy to pick one for a complete beginner or for someone who has solved sudoku for years.',
    ],
    booksHeading: 'Four books, from warm-up to very hard',
    bookSlugs: ['large-print-sudoku-102', 'large-print-sudoku-100', 'large-print-sudoku-101', 'large-print-sudoku-103'],
    sections: [
      {
        heading: 'Which book should I choose?',
        bullets: [
          'Set 102, warm-up and easy: for beginners. A step-by-step guide shows two simple methods and what to do when you get stuck.',
          'Set 100, easy and medium: for everyday solving. The safe choice if you are not sure how experienced the person is.',
          'Set 101, hard and very hard: for experienced solvers, with an introduction to pairs, X-Wing, Swordfish and XY-Wing.',
          'Gift Edition (Set 103): 150 puzzles in three levels, sturdy hardcover, a dedication page at the front.',
        ],
      },
      {
        heading: 'What “large print” means in our books',
        bullets: [
          'Two puzzles per page on 8.5 × 11 in pages.',
          'Grids about 11 cm (4.3 in) wide with bold 3×3 boxes.',
          'Room in the cells for small pencil notes when a puzzle gets tricky.',
          'Every puzzle has exactly one solution and can be solved by logic alone — no guessing. Full solutions at the back.',
        ],
      },
    ],
    faqHeading: 'Frequently asked questions',
    faq: [
      {
        q: 'Are these books good for someone who has never played sudoku?',
        a: 'Yes. Set 102 starts with warm-up puzzles where careful looking is enough, and its step-by-step introduction explains the rules and two basic methods.',
      },
      {
        q: 'How big is the print?',
        a: 'Each grid is about 11 cm (4.3 in) wide with two puzzles per page — noticeably larger than newspaper sudoku. Most people solve them without a magnifying glass.',
      },
      {
        q: 'Are the solutions included?',
        a: 'Yes, every book has complete solutions at the back.',
      },
      {
        q: 'Where can I buy them?',
        a: 'All books are available on Amazon.com — the links are next to each book above.',
      },
    ],
    linksHeading: 'Read more',
    links: [
      { href: '/en/free-printables', label: 'Free printable large print sudoku' },
      { href: '/en/blog/large-print-sudoku-for-every-level', label: 'Large Print Sudoku – big, clear puzzles at the right level for you' },
    ],
  },
];

export function getLanding(lang: SiteLang, slug: string): Landing {
  const landing = landings.find((l) => l.lang === lang && l.slug === slug);
  if (!landing) {
    throw new Error(`Brak strony docelowej /${lang}/${slug}`);
  }
  return landing;
}

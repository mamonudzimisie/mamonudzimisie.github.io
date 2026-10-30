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
  {
    lang: 'pl',
    slug: 'sudoku-i-warianty',
    seoTitle: 'Sudoku i warianty – klasyczne sudoku i Killer Sudoku',
    seoDescription:
      'Klasyczne sudoku w czterech poziomach i Killer Sudoku dla początkujących. Czym różnią się warianty sudoku, od którego zacząć i jak wybrać książkę.',
    eyebrow: 'Sudoku i warianty',
    h1: 'Sudoku i jego warianty',
    intro: [
      'Klasyczne sudoku ma jedną zasadę: w każdym wierszu, kolumnie i bloku 3×3 cyfry od 1 do 9 mają się pojawić dokładnie raz. Warianty sudoku zostawiają tę zasadę i dokładają do niej jedną nową — sumy, nieregularne bloki, przekątne. Ta sama plansza 9×9, a zupełnie inny sposób myślenia.',
      'Tu zebraliśmy nasze książki z klasycznym sudoku i jego wariantami. Każda zagadka ma dokładnie jedno rozwiązanie, a rozwiązania są na końcu książki.',
    ],
    booksHeading: 'Nasze książki',
    bookSlugs: ['sudoku-300-zagadek-200', 'killer-sudoku-400'],
    sections: [
      {
        heading: 'Czym różnią się te łamigłówki?',
        bullets: [
          'Sudoku klasyczne: wypełniasz planszę cyframi od 1 do 9 tak, by nie powtarzały się w wierszu, kolumnie ani bloku 3×3. Wystarczy logika, nie trzeba nic liczyć.',
          'Killer Sudoku: zasady klasycznego sudoku plus klatki zaznaczone przerywaną linią. Cyfry w każdej klatce muszą dać sumę podaną w jej rogu. To połączenie logiki z prostym liczeniem w pamięci.',
        ],
      },
      {
        heading: 'Od czego zacząć?',
        bullets: [
          'Sudoku – 300 zagadek: jeśli chcesz klasyki na długo. Cztery poziomy, od łatwego po bardzo trudny, i wstęp z metodami od podstaw po X-Wing, Swordfish i XY-Wing.',
          'Killer Sudoku – 150 łatwych zagadek: jeśli znasz sudoku i chcesz spróbować czegoś nowego. Zagadki mają cyfry startowe, a poradnik na początku objaśnia zasady, trzy podstawowe techniki i regułę 45.',
        ],
      },
    ],
    faqHeading: 'Najczęstsze pytania',
    faq: [
      {
        q: 'Czy do Killer Sudoku trzeba dobrze liczyć?',
        a: 'Nie. Wystarczy dodawanie małych liczb, a w książce są tabele, które pokazują, z jakich cyfr może składać się suma klatki dwu-, trzy- i czteropolowej.',
      },
      {
        q: 'Co to jest reguła 45?',
        a: 'Cyfry od 1 do 9 sumują się do 45, więc suma każdego wiersza, kolumny i bloku też wynosi 45. Gdy znasz sumy prawie wszystkich klatek w bloku, z tej reguły wyliczysz brakującą cyfrę. Poradnik w książce pokazuje to na przykładach.',
      },
      {
        q: 'Czy zagadki da się rozwiązać bez zgadywania?',
        a: 'Tak, każda zagadka ma dokładnie jedno rozwiązanie, do którego dochodzi się samą logiką.',
      },
      {
        q: 'Szukam sudoku z większymi cyframi.',
        a: 'Zajrzyj do serii Sudoku dużym drukiem: dwie zagadki na stronę i plansza szerokości około 11 cm.',
      },
    ],
    linksHeading: 'Zobacz też',
    links: [
      { href: '/pl/sudoku-dla-seniorow', label: 'Sudoku dużym drukiem dla seniorów' },
      { href: '/pl/blog/lamiglowki-na-prezent-mikolajki-swieta', label: 'Łamigłówki na prezent: co dla kogo w rodzinie' },
    ],
  },
  {
    lang: 'pl',
    slug: 'wykreslanki-jezykowe',
    seoTitle: 'Wykreślanki językowe – angielski i niemiecki w ćwiczeniach',
    seoDescription:
      'Wykreślanki do nauki języków: 184 angielskie czasowniki nieregularne w 40 wykreślankach i niemieckie słownictwo biznesowe C1–C2 w 576 zdaniach z lukami.',
    eyebrow: 'Znajdź, zakreśl, zapamiętaj',
    h1: 'Wykreślanki językowe: angielski i niemiecki',
    intro: [
      'Słówko, które trzeba najpierw sobie przypomnieć, a potem wypatrzyć w planszy litera po literze, zostaje w głowie na dłużej niż to przeczytane na liście. Na tym opiera się nasza seria Znajdź, zakreśl, zapamiętaj.',
      'Każda rozkładówka to plansza po lewej i zadania po prawej: uzupełniasz lukę w zdaniu, a potem szukasz brakującego słowa w planszy. Jeśli je znajdziesz, odpowiedź jest dobra.',
    ],
    booksHeading: 'Nasze książki',
    bookSlugs: ['znajdz-zakresl-zapamietaj-angielski-czasowniki', 'znajdz-zakresl-zapamietaj-niemiecki-biznesowy'],
    sections: [
      {
        heading: 'Którą wybrać?',
        bullets: [
          'Angielski – czasowniki nieregularne: dla młodzieży i dorosłych. 184 czasowniki (120 podstawowych i 64 zaawansowane) w 40 wykreślankach, 5 poziomów od wyszukiwania form do zdań z lukami w Past Simple i Present Perfect.',
          'Niemiecki – słownictwo biznesowe: dla osób na poziomie C1–C2. 32 wykreślanki i 576 zdań z lukami w pięciu częściach: słownictwo specjalistyczne, Funktionsverbgefüge, korespondencja, umowy i negocjacje, idiomy i fałszywi przyjaciele.',
        ],
      },
    ],
    faqHeading: 'Najczęstsze pytania',
    faq: [
      {
        q: 'Czy w książkach są rozwiązania?',
        a: 'Tak, obie książki mają rozwiązania wszystkich wykreślanek.',
      },
      {
        q: 'Jak sprawdzić, czy umiem już materiał?',
        a: 'W każdej książce są dwa testy „Sprawdź się!”. W książce z angielskim jest też tabela wszystkich form czasowników, a w książce z niemieckim słowniczek Funktionsverbgefüge.',
      },
      {
        q: 'Ile czasowników jest w książce z angielskim?',
        a: '184: 120 podstawowych i 64 zaawansowane.',
      },
    ],
    linksHeading: 'Zobacz też',
    links: [
      { href: '/pl/wykreslanki-dla-dzieci', label: 'Wykreślanki dla dzieci od 5 do 13 lat' },
      { href: '/pl/books', label: 'Wszystkie książki' },
    ],
  },
  {
    lang: 'de',
    slug: 'suchraetsel-fuer-kinder',
    seoTitle: 'Suchrätsel für Kinder ab 5 Jahren – Meine ersten Wortsuchrätsel',
    seoDescription:
      'Wortsuchrätsel für Kinder von 5 bis 7 Jahren: zwei Stufen mit je 60 Rätseln und 12 Bildern zum Ausmalen. Große Buchstaben, vertraute Wörter – Lesenlernen mit Spaß.',
    eyebrow: 'Meine ersten Wortsuchrätsel',
    h1: 'Suchrätsel für Kinder von 5 bis 7 Jahren',
    intro: [
      'Ein Wortsuchrätsel braucht nur eine Regel: Finde die versteckten Wörter im Buchstabengitter und kreise sie ein. Dabei üben Kinder ganz nebenbei Lesen, Aufmerksamkeit und Geduld.',
      'Unsere Reihe Meine ersten Wortsuchrätsel hat zwei Stufen für Kinder rund um die Einschulung. Jedes Buch enthält 60 Rätsel mit großen Buchstaben und vertrauten Wörtern – und 12 Bilder zum Ausmalen als Pause zwischendurch.',
    ],
    booksHeading: 'Zwei Stufen',
    bookSlugs: ['meine-ersten-wortsuchratsel-stufe-1', 'meine-ersten-wortsuchratsel-stufe-2'],
    sections: [
      {
        heading: 'Welche Stufe passt?',
        bullets: [
          'Stufe 1, 5–6 Jahre: für Kinder, die die Buchstaben kennen oder gerade kennenlernen. Große Buchstaben, kurze und vertraute Wörter.',
          'Stufe 2, 6–7 Jahre: für Kinder kurz vor oder nach der Einschulung. Festigt das Lesen mit einem übersichtlichen Gitter, das Lust auf mehr macht.',
        ],
      },
      {
        heading: 'Was bringen Wortsuchrätsel?',
        paragraphs: [
          'Beim Suchen liest das Kind jedes Wort mehrmals Buchstabe für Buchstabe und vergleicht es mit dem Gitter. Das ist dieselbe Augenbewegung wie beim Lesen – nur als Spiel statt als Übung. Dazu kommen ein paar Minuten Konzentration auf eine Aufgabe und die Freude, wenn das Wort endlich gefunden ist.',
        ],
      },
    ],
    faqHeading: 'Häufige Fragen',
    faq: [
      {
        q: 'Ab welchem Alter eignen sich Wortsuchrätsel?',
        a: 'Die einfachsten Rätsel passen schon für Fünfjährige, die Buchstaben kennen. Kinder, die noch nicht lesen, können die Wörter Buchstabe für Buchstabe mit der Liste vergleichen – so werden sie mit den Buchstaben vertraut.',
      },
      {
        q: 'Ich schwanke zwischen zwei Stufen. Welche soll ich nehmen?',
        a: 'Die leichtere. Ein Kind, das die ersten Rätsel allein schafft, greift gern wieder zum Buch.',
      },
      {
        q: 'Wo kann ich die Bücher kaufen?',
        a: 'Beide Bücher gibt es bei Amazon.de – die Links finden Sie bei jedem Buch oben.',
      },
    ],
    linksHeading: 'Mehr entdecken',
    links: [
      { href: '/de/raetsel-grossdruck', label: 'Rätselbücher im Großdruck – für Oma und Opa' },
      { href: '/de/books', label: 'Alle Bücher' },
    ],
  },
  {
    lang: 'en',
    slug: 'sudoku-variants',
    seoTitle: 'Sudoku Variants – Classic Sudoku, Killer Sudoku and Kakuro',
    seoDescription:
      'Classic sudoku in four levels, Killer Sudoku for beginners and Kakuro cross-sum puzzles. How the variants differ, where to start and which book to choose.',
    eyebrow: 'Sudoku & variants',
    h1: 'Sudoku and its variants',
    intro: [
      'Classic sudoku has one rule: every row, column and 3×3 box holds the digits 1 to 9 exactly once. Sudoku variants keep that rule and add one more — sums, cages, odd-shaped boxes. The same 9×9 grid, a completely different way of thinking.',
      'Here are our books with classic sudoku, its variants and their number-puzzle cousin, Kakuro. Every puzzle has exactly one solution, solvable by logic alone, with full solutions at the back.',
    ],
    booksHeading: 'Our books',
    bookSlugs: ['sudoku-300-puzzles-200', 'killer-sudoku-400-en', 'kakuro-puzzle-book-for-beginners'],
    sections: [
      {
        heading: 'How do they differ?',
        bullets: [
          'Classic sudoku: fill the grid with the digits 1 to 9 so that none repeats in a row, column or 3×3 box. Pure logic, no arithmetic.',
          'Killer Sudoku: the classic rules plus cages marked with dashed lines. The digits in each cage must add up to the number in its corner — logic with a little mental arithmetic.',
          'Kakuro: a crossword made of sums. Every white cell holds a digit from 1 to 9, the clues give the total of each run, and no digit may repeat within a run.',
        ],
      },
      {
        heading: 'Where should I start?',
        bullets: [
          'Sudoku – 300 Puzzles: if you want classic sudoku for a long time. Four levels from easy to very hard and an introduction from the basics to X-Wing, Swordfish and XY-Wing.',
          'Killer Sudoku – 150 Easy Puzzles: if you know sudoku and want something new. Starting digits to get you going and a starter guide with three basic techniques and the rule of 45.',
          'Kakuro for Beginners: if you have never solved one. A step-by-step tutorial solves a full example with you, then 192 puzzles grow from 4×4 to 6×6.',
        ],
      },
    ],
    faqHeading: 'Frequently asked questions',
    faq: [
      {
        q: 'Do I need to be good at maths for Killer Sudoku or Kakuro?',
        a: 'No. Adding small numbers is enough, and the books include tables of cage sums (Killer Sudoku) and sums with only one possible set of digits (Kakuro).',
      },
      {
        q: 'What is the rule of 45?',
        a: 'The digits 1 to 9 add up to 45, so every row, column and box does too. When you know the sums of almost all the cages in a box, this rule gives you the missing digit. The starter guide shows it with examples.',
      },
      {
        q: 'Are the puzzles solvable without guessing?',
        a: 'Yes, every puzzle has exactly one solution that you can reach by logic alone.',
      },
      {
        q: 'I am looking for sudoku with bigger digits.',
        a: 'Try our Large Print Sudoku series: two puzzles per page and grids about 11 cm (4.3 in) wide.',
      },
    ],
    linksHeading: 'Read more',
    links: [
      { href: '/en/blog/what-is-kakuro', label: 'What is Kakuro? The crossword made of numbers' },
      { href: '/en/large-print-sudoku', label: 'Large print sudoku for seniors' },
      { href: '/en/free-printables', label: 'Free printable puzzles' },
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

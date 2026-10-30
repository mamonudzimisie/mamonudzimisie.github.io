import type { SiteLang } from '@/lib/catalog-i18n';

// Serie książek — katalog grupuje książki w sekcje w tej kolejności
// (tej samej co drzwi na stronie głównej, components/SeriesDoors.tsx).
// Nazwa i opis są w języku strony (nie książki): seria „Sudoku dużym
// drukiem” obejmuje wydania PL, DE i EN.
export type BookSeries =
  | 'znajdz-slowko'
  | 'meine-ersten-wortsuchratsel'
  | 'wykreslanki-jezykowe'
  | 'wykreslanki-tematyczne'
  | 'sudoku-duzy-druk'
  | 'lamiglowki-logiczne';

type SeriesText = { name: string; description: string };

export const SERIES: { id: BookSeries; text: Record<SiteLang, SeriesText> }[] = [
  {
    id: 'znajdz-slowko',
    text: {
      pl: { name: 'Znajdź słówko!', description: 'Wykreślanki po polsku dla dzieci — pięć poziomów od 5 do 13 lat i wydanie świąteczne.' },
      de: { name: 'Znajdź słówko!', description: 'Polnische Suchrätsel für Kinder — fünf Stufen von 5 bis 13 Jahren.' },
      en: { name: 'Znajdź słówko!', description: 'Polish word searches for kids — five levels from age 5 to 13.' },
    },
  },
  {
    id: 'meine-ersten-wortsuchratsel',
    text: {
      pl: { name: 'Meine ersten Wortsuchrätsel', description: 'Pierwsze wykreślanki po niemiecku dla dzieci 5–7 lat, z obrazkami do kolorowania.' },
      de: { name: 'Meine ersten Wortsuchrätsel', description: 'Die ersten Suchrätsel für Kinder von 5 bis 7 Jahren — mit Bildern zum Ausmalen.' },
      en: { name: 'Meine ersten Wortsuchrätsel', description: 'First German word searches for kids aged 5–7, with pictures to colour.' },
    },
  },
  {
    id: 'sudoku-duzy-druk',
    text: {
      pl: { name: 'Sudoku dużym drukiem', description: 'Duże cyfry i wyraźne kratki, dwie zagadki na stronę — od rozgrzewki po bardzo trudne.' },
      de: { name: 'Sudoku Großdruck', description: 'Große Ziffern und klare Kästchen, zwei Rätsel pro Seite — vom Einstieg bis sehr schwer.' },
      en: { name: 'Large Print Sudoku', description: 'Big digits and clear grids, two puzzles per page — from warm-up to very hard.' },
    },
  },
  {
    id: 'lamiglowki-logiczne',
    text: {
      pl: { name: 'Sudoku i warianty', description: 'Klasyczne sudoku, Killer Sudoku i inne łamigłówki liczbowe dla tych, którzy lubią policzyć.' },
      de: { name: 'Sudoku & Varianten', description: 'Klassisches Sudoku, Killer-Sudoku und andere Zahlenrätsel für alle, die gern rechnen.' },
      en: { name: 'Sudoku & variants', description: 'Classic sudoku, Killer Sudoku, Kakuro and other number puzzles for those who like numbers.' },
    },
  },
  {
    id: 'wykreslanki-jezykowe',
    text: {
      pl: { name: 'Znajdź, zakreśl, zapamiętaj', description: 'Wykreślanki językowe: słówka i zwroty z angielskiego i niemieckiego, utrwalane przez zabawę.' },
      de: { name: 'Znajdź, zakreśl, zapamiętaj', description: 'Sprach-Suchrätsel für Polnischsprachige: englische und deutsche Vokabeln spielerisch lernen.' },
      en: { name: 'Znajdź, zakreśl, zapamiętaj', description: 'Language word searches for Polish speakers: English and German vocabulary through play.' },
    },
  },
  {
    id: 'wykreslanki-tematyczne',
    text: {
      pl: { name: 'Wykreślanki tematyczne', description: 'Wykreślanki dla dorosłych wokół jednego tematu — na początek polskie góry i odznaki turystyczne.' },
      de: { name: 'Themen-Suchrätsel', description: 'Suchrätsel für Erwachsene rund um ein Thema — zum Beispiel Weihnachten im Großdruck.' },
      en: { name: 'Themed word searches', description: 'Word searches for adults built around one theme — Christmas in large print (German) and the Polish mountains (Polish).' },
    },
  },
];

export function seriesText(id: BookSeries, lang: SiteLang): SeriesText {
  return SERIES.find((s) => s.id === id)!.text[lang];
}

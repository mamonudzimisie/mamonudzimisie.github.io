// Mini wykreślanka do postów: {{wykreslanka Temat: SŁOWO SŁOWO …}}.
// Planszę układamy podczas budowania, a ziarno losowania bierzemy ze słów,
// więc ta sama lista zawsze daje tę samą planszę (bez skakania między buildami).
// Słowa idą tylko poziomo (od lewej) i pionowo (z góry) — tak jak radzimy
// w poście dla młodszych dzieci.

export type PuzzleWord = {
  word: string;
  row: number;
  col: number;
  dir: 'h' | 'v';
};

export type Puzzle = {
  title: string;
  size: number;
  grid: string[][];
  words: PuzzleWord[];
};

// Bez Q, V, X — w polskich słowach ich nie ma, a w siatce rzucałyby się w oczy.
const FILL = 'AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUWYZŹŻ';

function hashString(text: string): number {
  let h = 2166136261;
  for (const ch of text) {
    h ^= ch.codePointAt(0)!;
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// mulberry32 — mały, przewidywalny generator.
function makeRandom(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function countOccurrences(grid: string[][], word: string[]): number {
  const size = grid.length;
  let count = 0;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      for (const [dr, dc] of [
        [0, 1],
        [1, 0],
      ]) {
        if (word.every((ch, i) => grid[r + dr * i]?.[c + dc * i] === ch)) count++;
      }
    }
  }
  return count;
}

export function buildPuzzle(title: string, rawWords: string[]): Puzzle {
  const words = rawWords.map((w) => Array.from(w.normalize('NFC').toLocaleUpperCase('pl')));
  const longest = Math.max(...words.map((w) => w.length));
  const totalLetters = words.reduce((sum, w) => sum + w.length, 0);
  const minSize = Math.max(longest, Math.ceil(Math.sqrt(totalLetters * 1.6)));
  const order = [...words].sort((a, b) => b.length - a.length);

  for (let size = minSize; size <= minSize + 4; size++) {
    for (let attempt = 0; attempt < 400; attempt++) {
      const random = makeRandom(hashString(`${title}|${rawWords.join(' ')}|${size}|${attempt}`));
      const grid: string[][] = Array.from({ length: size }, () => Array<string>(size).fill(''));
      const placed: PuzzleWord[] = [];
      let ok = true;

      for (const [index, word] of order.entries()) {
        let done = false;
        for (let tries = 0; tries < 200 && !done; tries++) {
          // Na zmianę poziomo i pionowo, żeby nie wyszła plansza z samych
          // wierszy; dopiero gdy słowo się nie mieści, kierunek jest dowolny.
          const preferred = index % 2 === 0 ? 'h' : 'v';
          const dir = tries < 100 ? preferred : random() < 0.5 ? 'h' : 'v';
          const maxRow = dir === 'v' ? size - word.length : size - 1;
          const maxCol = dir === 'h' ? size - word.length : size - 1;
          const row = Math.floor(random() * (maxRow + 1));
          const col = Math.floor(random() * (maxCol + 1));
          const fits = word.every((ch, i) => {
            const cell = dir === 'h' ? grid[row][col + i] : grid[row + i][col];
            return cell === '' || cell === ch;
          });
          if (!fits) continue;
          word.forEach((ch, i) => {
            if (dir === 'h') grid[row][col + i] = ch;
            else grid[row + i][col] = ch;
          });
          placed.push({ word: word.join(''), row, col, dir });
          done = true;
        }
        if (!done) {
          ok = false;
          break;
        }
      }
      if (!ok) continue;

      const fill = Array.from(FILL);
      for (const line of grid) {
        for (let c = 0; c < size; c++) {
          if (line[c] === '') line[c] = fill[Math.floor(random() * fill.length)];
        }
      }
      // Przypadkowe drugie wystąpienie słowa zmyliłoby dziecko — losujemy od nowa.
      if (words.some((w) => countOccurrences(grid, w) !== 1)) continue;

      // Kolejność na liście taka, jak w znaczniku, a nie od najdłuższego.
      const byWord = new Map(placed.map((p) => [p.word, p]));
      return { title, size, grid, words: words.map((w) => byWord.get(w.join(''))!) };
    }
  }
  throw new Error(`Nie udało się ułożyć wykreślanki „${title}”`);
}

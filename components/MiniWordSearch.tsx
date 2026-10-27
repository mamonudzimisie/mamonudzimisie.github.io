'use client';

import Link from 'next/link';
import { useRef, useState, type PointerEvent } from 'react';
import type { Puzzle, PuzzleWord } from '@/data/posts/wordsearch';
import type { PostLang } from '@/data/posts';

// Interaktywna mini wykreślanka w poście. Słowo zaznacza się przeciągnięciem
// palcem/myszą od pierwszej do ostatniej litery albo dwoma stuknięciami
// (pierwsza i ostatnia litera). Zaznaczenie trzyma się wiersza lub kolumny.

const LABELS = {
  pl: {
    kicker: 'Spróbujcie sami!',
    hint: 'Przeciągnij palcem od pierwszej do ostatniej litery słowa albo stuknij obie.',
    found: 'znalezione',
    reveal: 'Pokaż rozwiązanie',
    reset: 'Zagraj jeszcze raz',
    done: 'Brawo! Wszystkie słowa znalezione.',
    doneRevealed: 'Oto wszystkie ukryte słowa.',
    more: 'Darmowe wykreślanki do druku',
    moreHref: '/pl/materialy',
  },
  de: {
    kicker: 'Probiert es selbst!',
    hint: 'Ziehe vom ersten zum letzten Buchstaben eines Wortes oder tippe beide an.',
    found: 'gefunden',
    reveal: 'Lösung zeigen',
    reset: 'Noch einmal spielen',
    done: 'Super! Alle Wörter gefunden.',
    doneRevealed: 'Das sind alle versteckten Wörter.',
    more: 'Kostenlose Rätsel',
    moreHref: '/de/books',
  },
  en: {
    kicker: 'Give it a try!',
    hint: 'Drag from the first to the last letter of a word, or tap both.',
    found: 'found',
    reveal: 'Show solution',
    reset: 'Play again',
    done: 'Well done! You found every word.',
    doneRevealed: 'Here are all the hidden words.',
    more: 'Free printables',
    moreHref: '/en/books',
  },
};

// Kolory zaznaczeń w barwach serii (okładki „Znajdź słówko!”).
const COLORS = ['#7cc47f', '#f0c33c', '#4fd1b0', '#f08a5d', '#8f8cf0', '#f2a7c3', '#5fb3e8', '#c9a26b'];

type Cell = { row: number; col: number };

function wordEnd(w: PuzzleWord): Cell {
  const len = Array.from(w.word).length - 1;
  return w.dir === 'h' ? { row: w.row, col: w.col + len } : { row: w.row + len, col: w.col };
}

function same(a: Cell, b: Cell): boolean {
  return a.row === b.row && a.col === b.col;
}

// Pasek zaznaczenia od komórki a do b (w procentach planszy).
function Bar({ a, b, size, color, dashed }: { a: Cell; b: Cell; size: number; color: string; dashed?: boolean }) {
  const top = Math.min(a.row, b.row);
  const left = Math.min(a.col, b.col);
  const rows = Math.abs(a.row - b.row) + 1;
  const cols = Math.abs(a.col - b.col) + 1;
  const pad = 0.12 / size;
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute rounded-full transition-all duration-150"
      style={{
        top: `${(top / size + pad) * 100}%`,
        left: `${(left / size + pad) * 100}%`,
        height: `${(rows / size - 2 * pad) * 100}%`,
        width: `${(cols / size - 2 * pad) * 100}%`,
        background: dashed ? 'transparent' : color,
        border: dashed ? `3px dashed ${color}` : undefined,
        opacity: dashed ? 1 : 0.55,
      }}
    />
  );
}

export default function MiniWordSearch({ puzzle, lang }: { puzzle: Puzzle; lang: PostLang }) {
  const t = LABELS[lang];
  const { size, grid, words } = puzzle;
  const gridRef = useRef<HTMLDivElement>(null);
  const [found, setFound] = useState<number[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [start, setStart] = useState<Cell | null>(null);
  const [end, setEnd] = useState<Cell | null>(null);
  const [dragging, setDragging] = useState(false);
  const [miss, setMiss] = useState(false);
  const moved = useRef(false);

  const allFound = found.length === words.length;
  const finished = allFound || revealed;

  const cellAt = (e: PointerEvent): Cell | null => {
    const box = gridRef.current?.getBoundingClientRect();
    if (!box) return null;
    const col = Math.floor(((e.clientX - box.left) / box.width) * size);
    const row = Math.floor(((e.clientY - box.top) / box.height) * size);
    if (row < 0 || col < 0 || row >= size || col >= size) return null;
    return { row, col };
  };

  // Koniec zaznaczenia przyciągamy do wiersza albo kolumny początku.
  const snap = (from: Cell, to: Cell): Cell =>
    Math.abs(to.row - from.row) > Math.abs(to.col - from.col) ? { row: to.row, col: from.col } : { row: from.row, col: to.col };

  const check = (a: Cell, b: Cell) => {
    const index = words.findIndex((w) => {
      const e = wordEnd(w);
      const s = { row: w.row, col: w.col };
      return (same(a, s) && same(b, e)) || (same(a, e) && same(b, s));
    });
    if (index >= 0 && !found.includes(index)) {
      setFound((prev) => [...prev, index]);
    } else if (!same(a, b)) {
      setMiss(true);
      window.setTimeout(() => setMiss(false), 400);
    }
    setStart(null);
    setEnd(null);
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    if (finished) return;
    const cell = cellAt(e);
    if (!cell) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    moved.current = false;
    setDragging(true);
    // Drugie stuknięcie: zamykamy zaznaczenie zaczęte poprzednim.
    if (start && !same(start, cell)) {
      setEnd(snap(start, cell));
      return;
    }
    setStart(cell);
    setEnd(cell);
  };

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging || !start) return;
    const cell = cellAt(e);
    if (!cell) return;
    const snapped = snap(start, cell);
    if (!end || !same(snapped, end)) {
      if (!same(snapped, start)) moved.current = true;
      setEnd(snapped);
    }
  };

  const onUp = () => {
    if (!dragging) return;
    setDragging(false);
    if (!start || !end) return;
    // Samo stuknięcie w jedną literę — czekamy na drugie.
    if (same(start, end) && !moved.current) return;
    check(start, end);
  };

  const reset = () => {
    setFound([]);
    setRevealed(false);
    setStart(null);
    setEnd(null);
  };

  return (
    <div className="not-prose my-10 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-ink/10 sm:p-7">
      <p className="text-sm font-800 uppercase tracking-wider text-orange-ink">{t.kicker}</p>
      <p className="mt-1 font-display text-2xl font-800 text-navy">{puzzle.title}</p>
      <p className="mt-1 text-base text-ink/70">{t.hint}</p>

      <div className="mt-5 grid gap-6 sm:grid-cols-[minmax(0,1fr)_11rem] sm:items-start">
        <div
          ref={gridRef}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className={`relative mx-auto aspect-square w-full max-w-md touch-none select-none rounded-2xl bg-paper p-0 ring-1 ring-ink/15 ${
            miss ? 'animate-puzzle-miss' : ''
          } ${finished ? '' : 'cursor-pointer'}`}
          role="img"
          aria-label={`${puzzle.title}: ${words.map((w) => w.word).join(', ')}`}
        >
          {words.map((w, i) =>
            found.includes(i) ? (
              <Bar key={w.word} a={w} b={wordEnd(w)} size={size} color={COLORS[i % COLORS.length]} />
            ) : revealed ? (
              <Bar key={w.word} a={w} b={wordEnd(w)} size={size} color={COLORS[i % COLORS.length]} dashed />
            ) : null,
          )}
          {start && end && <Bar a={start} b={end} size={size} color="#E8793C" />}
          <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
            {grid.flat().map((letter, i) => (
              <span
                key={i}
                aria-hidden
                className="relative flex items-center justify-center font-display font-700 text-navy"
                style={{ fontSize: `clamp(1rem, ${28 / size}vw, ${13 / size}rem)` }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-700 text-ink/60">
            {found.length} / {words.length} {t.found}
          </p>
          <ul className="mt-2 flex flex-wrap gap-2 sm:flex-col">
            {words.map((w, i) => {
              const isFound = found.includes(i);
              return (
                <li
                  key={w.word}
                  className={`!m-0 rounded-full px-3 py-1 font-display text-lg font-700 transition-colors ${
                    isFound ? 'text-ink/50 line-through' : 'bg-paper text-navy'
                  }`}
                  style={isFound ? { background: `${COLORS[i % COLORS.length]}55` } : undefined}
                >
                  {w.word}
                </li>
              );
            })}
          </ul>
          {!finished && (
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="mt-4 text-sm font-semibold text-ink/60 underline underline-offset-4 hover:text-orange-ink"
            >
              {t.reveal}
            </button>
          )}
        </div>
      </div>

      {finished && (
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl bg-green-light px-5 py-4">
          <p className="font-display text-xl font-800 text-green">{allFound ? t.done : t.doneRevealed}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-base">
            <Link href={t.moreHref} className="font-semibold text-navy underline underline-offset-4 hover:text-orange-ink">
              {t.more}
            </Link>
            <button
              type="button"
              onClick={reset}
              className="font-semibold text-navy underline underline-offset-4 hover:text-orange-ink"
            >
              {t.reset}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

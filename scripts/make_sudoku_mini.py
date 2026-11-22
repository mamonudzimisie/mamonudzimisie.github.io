#!/usr/bin/env python3
"""Podgląd stron „Sudoku mini” nr 600 → public/samples/sudoku-mini-600/1..8.webp.

Cztery prawdziwe rozkładówki z wnętrza (145 × 205 mm): metody + zagadka 1,
zagadki 2–3, zagadki ze środka, rozwiązania. Okładka: scripts/okladki-z-pdf.py.
Wymaga pdftoppm.
    python3 scripts/make_sudoku_mini.py
"""
import subprocess
import tempfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PDF = ROOT.parent / 'word-search/books/Sudoku/600-Mini-Latwy/pl/600-Mini-Latwy_pl.pdf'
SLUG = 'sudoku-mini-600'
PAGES = (4, 5, 6, 7, 64, 65, 126, 127)


def main() -> None:
    out = ROOT / 'public/samples' / SLUG
    out.mkdir(parents=True, exist_ok=True)
    for i, page in enumerate(PAGES, start=1):
        with tempfile.TemporaryDirectory() as tmp:
            subprocess.run(['pdftoppm', '-r', '220', '-png', '-f', str(page), '-l', str(page),
                            '-singlefile', str(PDF), f'{tmp}/p'], check=True)
            Image.open(f'{tmp}/p.png').convert('RGB').save(out / f'{i}.webp', quality=80)
    print(SLUG, len(PAGES), 'stron')


if __name__ == '__main__':
    main()

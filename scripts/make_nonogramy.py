#!/usr/bin/env python3
"""Podgląd stron „Nonogramy. Zakodowane obrazki” tom 1 → public/samples/nonogramy-zakodowane-obrazki-1/1..8.webp.

Cztery prawdziwe rozkładówki z wnętrza (145 × 205 mm): zasady i „Jak zacząć”, krok po kroku + nonogram 1,
15×15 ze środka, nonogram 100 (20×20) + rozwiązania. Okładka: scripts/okladki-z-pdf.py.
Wymaga pdftoppm.
    python3 scripts/make_nonogramy.py
"""
import subprocess
import tempfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PDF = ROOT.parent / 'word-search/books/Nonogramy/1-Latwe/pl/1-Latwe_pl.pdf'
SLUG = 'nonogramy-zakodowane-obrazki-1'
PAGES = (4, 5, 6, 7, 60, 61, 106, 107)


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

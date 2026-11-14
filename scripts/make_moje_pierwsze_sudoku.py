#!/usr/bin/env python3
"""Okładka i podgląd stron „Moje pierwsze sudoku” (Klub Mądrych Kapibar).

Z word-search/books/Klub_Madrych_Kapibar/PL/MojePierwszeSudoku/Poziom1/pl/:
- okladka.pdf → public/covers/<slug>.webp (sam przód, bez spadu). Format
  145 × 205 mm jest węższy niż 8,5 × 11", więc obrazek ma własne proporcje
  (850 × 1202), a nie 850 × 1100 jak reszta okładek.
- wnętrze → public/samples/<slug>/1..8.webp: cztery prawdziwe rozkładówki
  (spis treści + historyjka, plansze 4×4, start 6×6, sudoku 9×9 z Kasią).

Wymaga pdftoppm. Po uruchomieniu: scripts/cover-thumbs.py i scripts/cover-tints.py.
    python3 scripts/make_moje_pierwsze_sudoku.py
"""
import subprocess
import tempfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT.parent / 'word-search/books/Klub_Madrych_Kapibar/PL/MojePierwszeSudoku/Poziom1/pl'
SLUG = 'moje-pierwsze-sudoku'
BLEED_IN = 0.125
W_IN, H_IN = 145 / 25.4, 205 / 25.4
PAGES = (4, 5, 14, 15, 20, 21, 44, 45)
COVER_W = 850


def render(pdf: Path, page: int, dpi: int) -> Image.Image:
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(['pdftoppm', '-r', str(dpi), '-png', '-f', str(page), '-l', str(page),
                        '-singlefile', str(pdf), f'{tmp}/p'], check=True)
        return Image.open(f'{tmp}/p.png').convert('RGB')


def main() -> None:
    dpi = 300
    whole = render(SRC / 'okladka.pdf', 1, dpi)
    right = whole.width - round(BLEED_IN * dpi)
    top = round(BLEED_IN * dpi)
    front = whole.crop((right - round(W_IN * dpi), top, right, top + round(H_IN * dpi)))
    h = round(COVER_W * H_IN / W_IN)
    front.resize((COVER_W, h), Image.LANCZOS).save(ROOT / 'public/covers' / f'{SLUG}.webp', quality=88)
    out = ROOT / 'public/samples' / SLUG
    out.mkdir(parents=True, exist_ok=True)
    for i, page in enumerate(PAGES, start=1):
        im = render(SRC / 'Poziom1_pl.pdf', page, 220)
        im.save(out / f'{i}.webp', quality=80)
    print(SLUG, 'okładka', (COVER_W, h), '+', len(PAGES), 'stron', im.size)


if __name__ == '__main__':
    main()

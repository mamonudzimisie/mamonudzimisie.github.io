#!/usr/bin/env python3
"""Grafiki do postów „Czym jest Killer Sudoku” (PL) / „What is Killer Sudoku” (EN) → public/blog/.

Dla każdego języka:
- killer-sudoku-zasady.webp / killer-sudoku-rules.webp — rysunek bloku z klatkami
  i jego rozwiązania, wycięty z 1. strony darmowego PDF-u z /materialy
  (/free-printables), który składa word-search/books/Sudoku/_www/assemble_free_killer.py,
- killer-sudoku-strona.webp / killer-sudoku-page.webp — górna połowa prawdziwej
  strony z zagadką #1, wyrenderowana z PDF-u tomu 400.

Wymaga pdftoppm. Uruchomienie: python3 scripts/make_blog_killer.py
"""

import subprocess
import tempfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public/blog'
KILLER = ROOT.parent / 'word-search/books/Sudoku/Killer/400-Latwe'

DPI = 200
S = DPI / 72  # punkty PDF -> piksele

VARIANTS = {
    'pl': {
        'free': ROOT / 'public/materialy/killer-sudoku-do-druku.pdf',
        'book': KILLER / 'pl/400-Latwe_pl.pdf',
        'files': ('killer-sudoku-zasady.webp', 'killer-sudoku-strona.webp'),
    },
    'en': {
        'free': ROOT / 'public/free-printables/free-printable-killer-sudoku.pdf',
        'book': KILLER / 'en/400-Latwe_en.pdf',
        'files': ('killer-sudoku-rules.webp', 'killer-sudoku-page.webp'),
    },
}

BOOK_PUZZLE_PAGE = 9  # pierwsza strona z zagadkami (#1 i #2)


def render(pdf: Path, page: int) -> Image.Image:
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(['pdftoppm', '-r', str(DPI), '-png', '-f', str(page), '-l', str(page),
                        '-singlefile', str(pdf), f'{tmp}/p'], check=True)
        return Image.open(f'{tmp}/p.png').convert('RGB')


def main() -> None:
    for lang, v in VARIANTS.items():
        rules_name, page_name = v['files']
        # rysunek: od podpisów nad blokami do przypisu pod nimi (w punktach od góry strony)
        im = render(v['free'], 1)
        # Rysunek stoi w PL i EN na innej wysokości (akapit nad nim łamie się
        # inaczej), więc szukamy górnej ramki bloków: pierwszy wiersz pikseli
        # z długim ciemnym odcinkiem (dwie ramki po 3 x 0,62 cala).
        gray = im.convert('L')
        w = gray.width
        def longest_dark_run(y):
            best = run = 0
            for x in range(w):
                run = run + 1 if gray.getpixel((x, y)) < 80 else 0
                best = max(best, run)
            return best

        # ramka bloku = ciągła linia na ponad 1,5 cala (tekst nigdy nie jest ciągły)
        frame = next(y for y in range(int(300 * S), gray.height)
                     if longest_dark_run(y) > 1.5 * DPI)
        block = 3 * 0.62 * DPI
        fig = im.crop((int(80 * S), int(frame - 0.33 * DPI), int(532 * S),
                       int(frame + block + 0.62 * DPI)))
        fig.thumbnail((1600, 1600))
        fig.save(OUT / rules_name, quality=85)
        # strona z książki: górna zagadka
        im = render(v['book'], BOOK_PUZZLE_PAGE)
        w, h = im.size
        top = im.crop((0, int(h * 0.03), w, int(h * 0.49)))
        top.thumbnail((1600, 1600))
        top.save(OUT / page_name, quality=82)
        print(lang, OUT / rules_name, OUT / page_name)


if __name__ == '__main__':
    main()

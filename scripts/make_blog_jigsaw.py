#!/usr/bin/env python3
"""Grafiki do posta „Sudoku Jigsaw – zasady i jak zacząć” (PL) → public/blog/.

- sudoku-jigsaw-zasady.webp — rysunek układu obszarów z jednym obszarem
  wypełnionym cyframi, wycięty z 1. strony darmowego PDF-u z /materialy
  (składa go word-search/books/Sudoku/_www/assemble_free_jigsaw.py),
- sudoku-jigsaw-plansza.webp — zagadka nr 1 z tego PDF-u (górna połowa strony 3),
- sudoku-jigsaw-miniatura.webp — miniatura 3:2 na listę wpisów: plansza nr 1
  i rysunek obszaru jako dwie kartki.

Wymaga pdftoppm. Uruchomienie: python3 scripts/make_blog_jigsaw.py
"""

import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

PAPER_SOFT = '#F6F2EC'  # tło kafelków listy wpisów (bg-paper-soft)

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public/blog'
FREE = ROOT / 'public/materialy/sudoku-jigsaw-do-druku.pdf'
DPI = 200


def render(page: int) -> Image.Image:
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(['pdftoppm', '-r', str(DPI), '-png', '-f', str(page), '-l', str(page),
                        '-singlefile', str(FREE), f'{tmp}/p'], check=True)
        return Image.open(f'{tmp}/p.png').convert('RGB')


def frames(im: Image.Image, min_run_in: float) -> list[tuple[int, int, int]]:
    """Ramki plansz: (y, x_lewy, x_prawy) wierszy z ciągłą ciemną linią dłuższą
    niż `min_run_in` cali, po jednym na każdą grupę sąsiednich wierszy."""
    g = im.convert('L')
    px = g.load()
    found, last = [], -10
    for y in range(g.height):
        best = run = start = 0
        span = (0, 0)
        for x in range(g.width):
            if px[x, y] < 80:
                if run == 0:
                    start = x
                run += 1
                if run > best:
                    best, span = run, (start, x)
            else:
                run = 0
        if best > min_run_in * DPI:
            if y - last > 3:
                found.append((y, *span))
            last = y
    return found


def card(im: Image.Image, width: int, pad: int, angle: float) -> Image.Image:
    """Biała kartka z cieniem, obrócona."""
    im = im.convert('RGBA').resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    framed = Image.new('RGBA', (im.width + 2 * pad, im.height + 2 * pad), 'white')
    framed.alpha_composite(im, (pad, pad))
    shadow = Image.new('RGBA', (framed.width + 120, framed.height + 120), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rectangle([60, 74, 60 + framed.width, 74 + framed.height],
                                     fill=(46, 42, 38, 70))
    shadow = shadow.filter(ImageFilter.GaussianBlur(22))
    shadow.alpha_composite(framed, (60, 60))
    return shadow.rotate(angle, resample=Image.BICUBIC, expand=True)


def main() -> None:
    # rysunek: jedyna plansza na stronie 1 (bok 9 x 0,265 cala)
    first = render(1)
    top, left, right = frames(first, 1.5)[0]
    side = right - left
    m = int(0.12 * DPI)
    fig = first.crop((left - m, top - m, right + m, top + side + m))
    fig.save(OUT / 'sudoku-jigsaw-zasady.webp', quality=88)

    # zagadka nr 1: górna plansza strony 3 razem z nagłówkiem (#1, poziom)
    page = render(3)
    top, left, right = frames(page, 3.0)[0]
    side = right - left
    puzzle = page.crop((left - m, top - int(0.42 * DPI), right + m, top + side + m))
    puzzle.save(OUT / 'sudoku-jigsaw-plansza.webp', quality=85)

    W, H = 1500, 1000
    canvas = Image.new('RGBA', (W, H), PAPER_SOFT)
    a = card(puzzle, 640, 26, 4)
    canvas.alpha_composite(a, (470 - a.width // 2, 500 - a.height // 2))
    b = card(fig, 470, 24, -3)
    canvas.alpha_composite(b, (1090 - b.width // 2, 520 - b.height // 2))
    canvas.convert('RGB').save(OUT / 'sudoku-jigsaw-miniatura.webp', quality=85)
    print(OUT / 'sudoku-jigsaw-zasady.webp', fig.size, puzzle.size)


if __name__ == '__main__':
    main()

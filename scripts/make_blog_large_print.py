#!/usr/bin/env python3
"""Grafiki do angielskiego posta o serii Large Print Sudoku → public/blog/.

- large-print-sudoku-levels.webp — trzy okładki ułożone od najłatwiejszej
  do najtrudniejszej, z poziomami pod spodem,
- large-print-sudoku-page.webp — górna połowa prawdziwej strony z zagadką,
  wyrenderowana z PDF-u książki (wymaga pdftoppm).

Uruchomienie: python3 scripts/make_blog_large_print.py
"""

import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

from make_og import GRID, INK, NAVY, ORANGE, PAPER, body, cover, display, paste_with_shadow

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public/blog'
BOOKS_PDF = ROOT.parent / 'word-search/output/Sudoku'

W, H = 1600, 900

# Od najłatwiejszej: kolejność, w jakiej czytelnik ma przechodzić przez serię.
LEVELS = [
    ('large-print-sudoku-102', 'Warm-up & Easy', 'Set 102 · for beginners'),
    ('large-print-sudoku-100', 'Easy & Medium', 'Set 100 · everyday solving'),
    ('large-print-sudoku-101', 'Hard & Very Hard', 'Set 101 · a real challenge'),
]


def levels_image():
    # Tło jak w make_og (papier w kratkę), tylko w większym formacie.
    grid = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grid)
    for x in range(0, W, 28):
        gd.line([(x, 0), (x, H)], fill=GRID)
    for y in range(0, H, 28):
        gd.line([(0, y), (W, y)], fill=GRID)
    img = Image.alpha_composite(Image.new('RGBA', (W, H), PAPER), grid)
    d = ImageDraw.Draw(img)

    d.text((W / 2, 112), 'Large Print Sudoku', font=display(78), fill=NAVY, anchor='ms')
    d.text((W / 2, 168), 'Three levels · the same big, clear grids in every book',
           font=body(36, 'Bold'), fill='#3B7A57', anchor='ms')

    cover_h = 500
    xs = [W / 2 - 480, W / 2, W / 2 + 480]
    cy = 210 + cover_h / 2 + 20
    for (slug, _, _), x in zip(LEVELS, xs):
        paste_with_shadow(img, cover(slug, cover_h), (x, cy))

    # Strzałka trudności pod okładkami.
    d = ImageDraw.Draw(img)
    ay = cy + cover_h / 2 + 52
    d.line([(xs[0] - 150, ay), (xs[2] + 170, ay)], fill=ORANGE, width=6)
    d.polygon([(xs[2] + 196, ay), (xs[2] + 166, ay - 16), (xs[2] + 166, ay + 16)], fill=ORANGE)
    for (_, level, note), x in zip(LEVELS, xs):
        d.ellipse([x - 13, ay - 13, x + 13, ay + 13], fill=ORANGE)
        d.text((x, ay + 58), level, font=display(44), fill=NAVY, anchor='ms')
        d.text((x, ay + 98), note, font=body(28), fill=INK, anchor='ms')
    return img


def page_image():
    pdf = BOOKS_PDF / '102-DuzyDruk-RozgrzewkaLatwy/en.pdf'
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(['pdftoppm', '-f', '12', '-l', '12', '-r', '150', '-png',
                        '-singlefile', str(pdf), f'{tmp}/page'], check=True)
        page = Image.open(f'{tmp}/page.png').convert('RGBA')
    # Górna zagadka strony: nagłówek, poziom i cała plansza, z odrobiną marginesu.
    # Ramkę zagadki wyznaczamy z ciemnych pikseli górnej połowy, nie z procentów strony.
    w, h = page.size
    top_half = page.crop((0, 0, w, h // 2)).convert('L').point(lambda v: 255 if v < 128 else 0)
    left, top, right, bottom = top_half.getbbox()
    margin = 60
    # Dolny margines mniejszy: tuż pod planszą zaczyna się nagłówek następnej zagadki.
    crop = page.crop((left - margin, top - margin, right + margin, bottom + margin // 2))
    pad, caption_h = 70, 70
    canvas = Image.new('RGBA', (crop.width + 2 * pad, crop.height + 2 * pad + caption_h), PAPER)
    shadow = Image.new('RGBA', canvas.size, (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rectangle(
        [pad + 6, pad + 14, pad + crop.width - 6, pad + crop.height + 6], fill=(46, 42, 38, 90))
    canvas = Image.alpha_composite(canvas, shadow.filter(ImageFilter.GaussianBlur(16)))
    canvas.alpha_composite(crop, (pad, pad))
    d = ImageDraw.Draw(canvas)
    y = pad + crop.height + 74
    d.text((canvas.width / 2, y), 'In the book: grid 11 cm (4.4 in) wide · digits 19 pt',
           font=body(34, 'Bold'), fill=NAVY, anchor='ms')
    return canvas


def save(img, name):
    path = OUT / name
    img.convert('RGB').save(path, 'WEBP', quality=86, method=6)
    print(path.relative_to(ROOT))


def main():
    save(levels_image(), 'large-print-sudoku-levels.webp')
    save(page_image(), 'large-print-sudoku-page.webp')


if __name__ == '__main__':
    main()

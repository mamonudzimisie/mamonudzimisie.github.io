#!/usr/bin/env python3
"""Grafiki do postów „Czym jest Killer Sudoku” (PL) / „What is Killer Sudoku” (EN) → public/blog/.

Dla każdego języka:
- killer-sudoku-zasady.webp / killer-sudoku-rules.webp — rysunek bloku z klatkami
  i jego rozwiązania, wycięty z 1. strony darmowego PDF-u z /materialy
  (/free-printables), który składa word-search/books/Sudoku/_www/assemble_free_killer.py,
- killer-sudoku-strona.webp / killer-sudoku-page.webp — górna połowa prawdziwej
  strony z zagadką #1, wyrenderowana z PDF-u tomu 400,
- killer-sudoku-miniatura.webp / killer-sudoku-thumb.webp — miniatura 3:2 na listę
  wpisów (`image:` w nagłówku posta): okładka książki i rozwiązany blok z rysunku.

Wymaga pdftoppm. Uruchomienie: python3 scripts/make_blog_killer.py
"""

import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

from make_og import cover, paste_with_shadow

PAPER_SOFT = '#F6F2EC'  # tło kafelków listy wpisów (bg-paper-soft)

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
        'thumb': 'killer-sudoku-miniatura.webp',
        'cover': 'killer-sudoku-400',
    },
    'en': {
        'free': ROOT / 'public/free-printables/free-printable-killer-sudoku.pdf',
        'book': KILLER / 'en/400-Latwe_en.pdf',
        'files': ('killer-sudoku-rules.webp', 'killer-sudoku-page.webp'),
        'thumb': 'killer-sudoku-thumb.webp',
        'cover': 'killer-sudoku-400-en',
    },
}

BOOK_PUZZLE_PAGE = 9  # pierwsza strona z zagadkami (#1 i #2)


def render(pdf: Path, page: int) -> Image.Image:
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(['pdftoppm', '-r', str(DPI), '-png', '-f', str(page), '-l', str(page),
                        '-singlefile', str(pdf), f'{tmp}/p'], check=True)
        return Image.open(f'{tmp}/p.png').convert('RGB')


def solved_block(fig: Image.Image) -> Image.Image:
    """Sam rozwiązany blok (prawa ramka) z rysunku, bez podpisu i strzałki."""
    g = fig.convert('L')
    dark = lambda x, y: g.getpixel((x, y)) < 80
    half = g.width // 2
    top = next(y for y in range(g.height)
               if sum(dark(x, y) for x in range(half, g.width)) > g.width * 0.2)
    left = next(x for x in range(half, g.width) if dark(x, top))
    right = max(x for x in range(half, g.width) if dark(x, top))
    size = right - left
    m = 12
    return fig.crop((left - m, top - 6, right + m, top + size + m))


def make_thumb(v: dict, solved: Image.Image) -> None:
    W, H = 1500, 1000
    canvas = Image.new('RGBA', (W, H), PAPER_SOFT)
    paste_with_shadow(canvas, cover(v['cover'], 760), (430, 500), angle=4)
    card = solved.convert('RGBA')
    card = card.resize((520, round(card.height * 520 / card.width)), Image.LANCZOS)
    pad = 24
    framed = Image.new('RGBA', (card.width + 2 * pad, card.height + 2 * pad), 'white')
    framed.alpha_composite(card, (pad, pad))
    shadow = Image.new('RGBA', (framed.width + 120, framed.height + 120), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rectangle([60, 74, 60 + framed.width, 74 + framed.height],
                                     fill=(46, 42, 38, 70))
    shadow = shadow.filter(ImageFilter.GaussianBlur(22))
    shadow.alpha_composite(framed, (60, 60))
    shadow = shadow.rotate(-3, resample=Image.BICUBIC, expand=True)
    canvas.alpha_composite(shadow, (1080 - shadow.width // 2, 520 - shadow.height // 2))
    canvas.convert('RGB').save(OUT / v['thumb'], quality=85)


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
        # miniatura: prawa połowa rysunku = rozwiązany blok z podpisem
        solved = solved_block(fig)
        make_thumb(v, solved)
        # strona z książki: górna zagadka
        im = render(v['book'], BOOK_PUZZLE_PAGE)
        w, h = im.size
        top = im.crop((0, int(h * 0.03), w, int(h * 0.49)))
        top.thumbnail((1600, 1600))
        top.save(OUT / page_name, quality=82)
        print(lang, OUT / rules_name, OUT / page_name)


if __name__ == '__main__':
    main()

#!/usr/bin/env python3
"""Przody okładek z aktualnych okladka.pdf z repo word-search → public/covers/<slug>.webp.

Miękka oprawa: przód = prawy dolny prostokąt formatu przycięcia, bez spadu.
Twarda (tom 103): przód = tektura przodu bez zawinięcia i bez zawiasu
(wymiary z okladka.yaml, sekcja `twarda`), przycięta do 3:4.

    python3 scripts/okladki-z-pdf.py [slug ...]      # bez argumentów: wszystkie

Potem: scripts/cover-thumbs.py, scripts/cover-tints.py, scripts/make_og.py.
Wymaga pdftoppm.
"""
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
BOOKS = ROOT.parent / 'word-search/books'
OUT = ROOT / 'public/covers'
DPI = 300
WIDTH = 850
BLEED = 0.125
LETTER = (8.5, 11.0)
MINI = (145 / 25.4, 205 / 25.4)

# slug → (folder książki, format przycięcia w calach albo 'twarda')
COVERS = {
    'znajdz-slowko-poziom-latwy': ('Znajdz_Slowko/5_6', LETTER),
    'znajdz-slowko-poziom-latwy-6-7': ('Znajdz_Slowko/6_7', LETTER),
    'znajdz-slowko-poziom-sredni-7-9': ('Znajdz_Slowko/7_9', LETTER),
    'znajdz-slowko-poziom-trudny-10': ('Znajdz_Slowko/10_PLUS', LETTER),
    'znajdz-slowko-poziom-ekspert-13': ('Znajdz_Slowko/13_PLUS', LETTER),
    'znajdz-slowko-swieta': ('Wykreslanki_Tematyczne/Boze_Narodzenie', LETTER),
    'moje-pierwsze-sudoku': ('Klub_Madrych_Kapibar/PL/MojePierwszeSudoku/Poziom1/pl', MINI),
    'sudoku-mini-600': ('Sudoku/600-Mini-Latwy/pl', MINI),
    'hiszpanski-w-wykreslankach-a1-a2': ('Nauka_Jezykow/Hiszpanski/Hiszpanski_Wykreslanki', MINI),
    'nonogramy-zakodowane-obrazki-1': ('Nonogramy/1-Latwe/pl', MINI),
    'wielki-polow': ('Wykreslanki_Tematyczne/Wedkarz', MINI),
    'sudoku-grossdruck-103': ('Sudoku/103-DuzyDruk-Prezent/de', 'twarda'),
    'large-print-sudoku-103': ('Sudoku/103-DuzyDruk-Prezent/en', 'twarda'),
}


def render(pdf: Path) -> Image.Image:
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(['pdftoppm', '-r', str(DPI), '-png', '-f', '1', '-l', '1',
                        '-singlefile', str(pdf), f'{tmp}/p'], check=True)
        return Image.open(f'{tmp}/p.png').convert('RGB')


def hard_box(folder: Path, im: Image.Image) -> tuple[int, int, int, int]:
    import yaml  # tylko dla twardej oprawy
    t = yaml.safe_load((folder / 'okladka.yaml').read_text())['twarda']
    px = im.width / t['calosc'][0]
    front_x0 = t['zawiniecie'] + t['przod'][0] + t['grzbiet']
    x0 = front_x0 + t['zawias']
    x1 = front_x0 + t['przod'][0]
    # Ramka okładki na stronie ma proporcje 3:4, a przód bez zawiasu jest
    # wyższy - przycinamy po równo z góry i z dołu (jak okładki 103 z 21.11).
    h = (x1 - x0) * 4 / 3
    y0 = t['zawiniecie'] + (t['przod'][1] - h) / 2
    return (round(x0 * px), round(y0 * px), round(x1 * px), round((y0 + h) * px))


def main(slugs: list[str]) -> None:
    for slug in slugs or COVERS:
        rel, trim = COVERS[slug]
        folder = BOOKS / rel
        im = render(folder / 'okladka.pdf')
        if trim == 'twarda':
            box = hard_box(folder, im)
        else:
            px = im.height / (trim[1] + 2 * BLEED)
            right = im.width - round(BLEED * px)
            top = round(BLEED * px)
            box = (right - round(trim[0] * px), top, right, top + round(trim[1] * px))
        front = im.crop(box)
        h = round(WIDTH * front.height / front.width)
        front.resize((WIDTH, h), Image.LANCZOS).save(OUT / f'{slug}.webp', 'WEBP', quality=88, method=6)
        print(slug, (WIDTH, h))


if __name__ == '__main__':
    main(sys.argv[1:])

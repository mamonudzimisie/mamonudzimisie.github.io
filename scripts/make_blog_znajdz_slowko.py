#!/usr/bin/env python3
"""Grafika do wpisu PL o wykreślankach dla dzieci → public/blog/znajdz-slowko-seria.webp.

Wachlarz pięciu okładek serii „Znajdź słówko!” z public/covers/ na tle w kratkę.
Po zmianie okładek: python3 scripts/make_blog_znajdz_slowko.py
"""

from pathlib import Path

from PIL import Image, ImageDraw

from make_og import GRID, NAVY, PAPER, body, cover, display, paste_with_shadow

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public/blog/znajdz-slowko-seria.webp'

W, H = 1600, 840
GREEN = '#2E7D4F'
SLUGS = [
    'znajdz-slowko-poziom-latwy',
    'znajdz-slowko-poziom-latwy-6-7',
    'znajdz-slowko-poziom-sredni-7-9',
    'znajdz-slowko-poziom-trudny-10',
    'znajdz-slowko-poziom-ekspert-13',
]
# (środek x, środek y, kąt) - rozsunięte tak, żeby z każdej okładki było widać tytuł
PLACES = [(300, 530, 7), (540, 475, 3.5), (800, 450, 0), (1060, 475, -3.5), (1300, 530, -7)]


def checked_paper(w, h):
    img = Image.new('RGBA', (w, h), PAPER)
    grid = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grid)
    for x in range(0, w, 28):
        gd.line([(x, 0), (x, h)], fill=GRID)
    for y in range(0, h, 28):
        gd.line([(0, y), (w, y)], fill=GRID)
    return Image.alpha_composite(img, grid)


def main():
    img = checked_paper(W, H)
    d = ImageDraw.Draw(img)
    d.text((W / 2, 112), 'Seria „Znajdź słówko!”', font=display(64), fill=NAVY, anchor='ms')
    d.text((W / 2, 165), '5 poziomów trudności · od 5 lat do nastolatków',
           font=body(30, 'Bold'), fill=GREEN, anchor='ms')
    for i in (0, 4, 1, 3, 2):                   # środkowa na wierzchu
        x, y, angle = PLACES[i]
        paste_with_shadow(img, cover(SLUGS[i], 450), (x, y), angle)
    img.convert('RGB').save(OUT, 'WEBP', quality=86, method=6)
    print(OUT.relative_to(ROOT), img.size)


if __name__ == '__main__':
    main()

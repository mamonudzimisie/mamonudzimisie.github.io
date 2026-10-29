#!/usr/bin/env python3
"""Grafiki do wpisu DE o Weihnachts-Wortsuchrätsel → public/blog/.

- weihnachts-wortsuch.webp — przód okładki na tle w kratkę (obrazek wpisu),
- weihnachts-wortsuch-seite.webp — cała strona z zagadką (Rätsel 2) z podpisem z wymiarami,
- weihnachts-wortsuch-themen.webp — 20 tematów (gotowy moduł A+ z folderu książki),
- weihnachts-wortsuch-loesungen.webp — górna połowa pierwszej strony rozwiązań.

Wymaga pdftoppm. Uruchomienie: python3 scripts/make_blog_weihnachts.py
"""

import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

from make_og import GRID, NAVY, PAPER, body, display, paste_with_shadow

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public/blog'
BOOK = ROOT.parent / 'word-search/books/DE/Weihnachts_Wortsuch_Senioren'
INTERIOR = BOOK / 'Weihnachts_Wortsuch_Senioren.pdf'
COVER = BOOK / 'okladka.pdf'

PUZZLE_PAGE = 5     # Rätsel 2 · Auf dem Weihnachtsmarkt (ta sama strona co w A+)
SOLUTION_PAGE = 84  # pierwsza strona „Lösungen”
BLEED_PT = 9        # 0,125" spadu okładki KDP
TRIM_W_PT = 612     # 8,5"

W, H = 1600, 900
GREEN = '#1F4A35'
RED = '#B5242F'


def render(pdf, page, dpi):
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(['pdftoppm', '-f', str(page), '-l', str(page), '-r', str(dpi), '-png',
                        '-singlefile', str(pdf), f'{tmp}/page'], check=True)
        return Image.open(f'{tmp}/page.png').convert('RGBA')


def checked_paper(w, h):
    grid = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grid)
    for x in range(0, w, 28):
        gd.line([(x, 0), (x, h)], fill=GRID)
    for y in range(0, h, 28):
        gd.line([(0, y), (w, y)], fill=GRID)
    return Image.alpha_composite(Image.new('RGBA', (w, h), PAPER), grid)


def front_cover():
    dpi = 150
    full = render(COVER, 1, dpi)
    scale = dpi / 72
    # Przód to prawa część rozkładówki: strona 8,5" + spad z prawej, bez spadu z góry i dołu.
    left = full.width - round((TRIM_W_PT + BLEED_PT) * scale)
    edge = round(BLEED_PT * scale)
    return full.crop((left, edge, full.width - edge, full.height - edge))


def cover_image():
    img = checked_paper(W, H)
    front = front_cover()
    cover_h = 720
    front = front.resize((round(front.width * cover_h / front.height), cover_h), Image.LANCZOS)
    paste_with_shadow(img, front, (W * 0.32, H / 2 + 10), angle=-3)
    d = ImageDraw.Draw(img)
    x = W * 0.58
    d.text((x, 300), 'Weihnachts-', font=display(76), fill=NAVY)
    d.text((x, 385), 'Wortsuchrätsel', font=display(76), fill=NAVY)
    # Kropki rysowane, nie znak ★ — fonty strony go nie mają.
    for i, line in enumerate(['80 Rätsel im Großdruck', '20 weihnachtliche Themen', 'mit allen Lösungen']):
        y = 520 + i * 56
        d.ellipse([x, y + 17, x + 14, y + 31], fill=RED)
        d.text((x + 34, y), line, font=body(38, 'Bold'), fill=GREEN)
    return img


def framed(page, caption):
    """Strona na papierze w kratkę, z cieniem i podpisem pod spodem."""
    pad, caption_h = 70, 80
    canvas = checked_paper(page.width + 2 * pad, page.height + 2 * pad + caption_h)
    shadow = Image.new('RGBA', canvas.size, (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rectangle(
        [pad + 6, pad + 14, pad + page.width - 6, pad + page.height + 6], fill=(46, 42, 38, 90))
    canvas = Image.alpha_composite(canvas, shadow.filter(ImageFilter.GaussianBlur(16)))
    canvas.alpha_composite(page, (pad, pad))
    d = ImageDraw.Draw(canvas)
    d.text((canvas.width / 2, pad + page.height + 84), caption,
           font=body(34, 'Bold'), fill=NAVY, anchor='ms')
    return canvas


def page_image():
    page = render(INTERIOR, PUZZLE_PAGE, 110)
    return framed(page, 'Originalseite 21,6 × 27,9 cm · Kästchen 1,1 cm · Wortliste 18 pt')


def solutions_image():
    page = render(INTERIOR, SOLUTION_PAGE, 150)
    # Górna połowa: nagłówek „Lösungen” i dwie pierwsze rozwiązane plansze.
    ink = page.convert('L').point(lambda v: 255 if v < 128 else 0)
    left, top, right, _ = ink.getbbox()
    half = page.crop((0, 0, page.width, page.height // 2)).convert('L').point(lambda v: 255 if v < 128 else 0)
    bottom = half.getbbox()[3]
    margin = 50
    crop = page.crop((left - margin, top - margin, right + margin, bottom + margin))
    return framed(crop, 'Alle Lösungen am Ende des Buches, vier pro Seite')


def themes_image():
    return Image.open(BOOK / 'aplus/4-themen-970x600.png').convert('RGBA')


def save(img, name):
    path = OUT / name
    img.convert('RGB').save(path, 'WEBP', quality=86, method=6)
    print(path.relative_to(ROOT), img.size)


def main():
    save(cover_image(), 'weihnachts-wortsuch.webp')
    save(page_image(), 'weihnachts-wortsuch-seite.webp')
    save(themes_image(), 'weihnachts-wortsuch-themen.webp')
    save(solutions_image(), 'weihnachts-wortsuch-loesungen.webp')


if __name__ == '__main__':
    main()

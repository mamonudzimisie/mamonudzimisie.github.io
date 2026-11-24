#!/usr/bin/env python3
"""Podgląd stron „Wielki połów” → public/samples/wielki-polow/1..8.webp.

Strony z wnętrza (145 × 205 mm): tytuł, wstęp, zasady, ciekawostka,
dwie plansze, rozwiązania, dyplom. Okładka: scripts/okladki-z-pdf.py.
Wymaga pdftoppm.
    python3 scripts/make_wielki_polow.py
"""
import subprocess
import tempfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PDF = ROOT.parent / 'word-search/books/Wykreslanki_Tematyczne/Wedkarz/Wedkarz.pdf'
SLUG = 'wielki-polow'
PAGES = (1, 3, 4, 5, 6, 61, 95, 103)


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

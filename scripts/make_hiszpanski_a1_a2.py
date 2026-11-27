#!/usr/bin/env python3
"""Podgląd stron „Hiszpański w wykreślankach” A1–A2 → public/samples/hiszpanski-w-wykreslankach-a1-a2/1..8.webp.

Strony z wnętrza (145 × 205 mm): tytuł, wstęp, jak grać, plansze 1, 3,
36 i 37, rozwiązania. Okładka: scripts/okladki-z-pdf.py.
Wymaga pdftoppm.
    python3 scripts/make_hiszpanski_a1_a2.py
"""
import subprocess
import tempfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PDF = ROOT.parent / 'word-search/books/Nauka_Jezykow/Hiszpanski/Hiszpanski_Wykreslanki/Hiszpanski_Wykreslanki.pdf'
SLUG = 'hiszpanski-w-wykreslankach-a1-a2'
PAGES = (1, 3, 4, 5, 7, 40, 41, 75)


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

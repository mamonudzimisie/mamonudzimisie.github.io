#!/usr/bin/env python3
"""Okładki i podglądy stron trzech tomów Spanish Word Search (EN).

Z word-search/books/EN/Spanish_Word_Search/<tom>/:
- okladka.pdf → public/covers/<slug>.webp (sam przód, 850 × 1100, bez spadu),
- wnętrze → public/samples/<slug>/1..8.webp (1275 × 1650): cztery prawdziwe
  rozkładówki (strona parzysta i następna nieparzysta) - początek, pierwsze
  zagadki, środek książki, rozwiązania.

Wymaga pdftoppm. Po uruchomieniu: scripts/cover-thumbs.py i scripts/cover-tints.py.
    python3 scripts/make_spanish_word_search.py
"""
import subprocess
import tempfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT.parent / 'word-search/books/EN/Spanish_Word_Search'
BLEED_IN, W_IN, H_IN = 0.125, 8.5, 11.0

VOLUMES = {
    'spanish-word-search-beginner': ('Vol1_Beginner', (2, 3, 4, 5, 40, 41, 92, 93)),
    'spanish-word-search-intermediate': ('Vol2_Intermediate', (2, 3, 4, 5, 40, 41, 88, 89)),
    'spanish-word-search-verbs': ('Vol3_Verbs', (4, 5, 6, 7, 40, 41, 90, 91)),
}


def render(pdf: Path, page: int, dpi: int) -> Image.Image:
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(['pdftoppm', '-r', str(dpi), '-png', '-f', str(page), '-l', str(page),
                        '-singlefile', str(pdf), f'{tmp}/p'], check=True)
        return Image.open(f'{tmp}/p.png').convert('RGB')


def main() -> None:
    for slug, (folder, pages) in VOLUMES.items():
        dpi = 200
        whole = render(SRC / folder / 'okladka.pdf', 1, dpi)
        right = whole.width - round(BLEED_IN * dpi)
        top = round(BLEED_IN * dpi)
        front = whole.crop((right - round(W_IN * dpi), top, right, top + round(H_IN * dpi)))
        front.resize((850, 1100), Image.LANCZOS).save(ROOT / 'public/covers' / f'{slug}.webp',
                                                      quality=88)
        out = ROOT / 'public/samples' / slug
        out.mkdir(parents=True, exist_ok=True)
        for i, page in enumerate(pages, start=1):
            im = render(SRC / folder / f'{folder}.pdf', page, 150)
            im.save(out / f'{i}.webp', quality=80)
        print(slug, 'okładka + ', len(pages), 'stron')


if __name__ == '__main__':
    main()

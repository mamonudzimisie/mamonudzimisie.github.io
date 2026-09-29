#!/usr/bin/env python3
"""Obrazki do udostępniania (Open Graph, 1200×630, JPG) → public/og/.

- public/og/{pl,de,en}.jpg  — wachlarz okładek danej sekcji językowej,
- public/og/books/<slug>.jpg — okładka książki z tytułem obok.

Dane książek czytane z data/books.ts, okładki z public/covers/.
Po dodaniu książki albo zmianie okładki: python3 scripts/make_og.py
"""

import math
import re
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / 'scripts/fonts'
OUT = ROOT / 'public/og'

W, H = 1200, 630
PAPER = '#FBF3E3'
GRID = (0, 0, 0, 18)
INK = '#2E2A26'
NAVY = '#26355D'
ORANGE = '#E8793C'
ORANGE_LIGHT = '#FCE7DA'

SECTIONS = {
    'pl': {
        'headline': ['Łamigłówki,', 'które naprawdę', 'wciągają'],
        'accent': '— bez ekranu',
        'amazon': 'Dostępne na Amazon',
    },
    'de': {
        'headline': ['Rätselbücher,', 'die wirklich', 'fesseln'],
        'accent': '— ohne Bildschirm',
        'amazon': 'Erhältlich bei Amazon',
    },
    'en': {
        'headline': ['Puzzle books', 'that really', 'draw you in'],
        'accent': '— screen-free',
        'amazon': 'Available on Amazon',
    },
}


def font(name, size, weight):
    f = ImageFont.truetype(str(FONTS / name), size)
    f.set_variation_by_name(weight)
    return f


def display(size, weight='ExtraBold'):
    return font('Baloo2.ttf', size, weight)


def body(size, weight='SemiBold'):
    return font('Nunito.ttf', size, weight)


def load_books():
    """Pola najwyższego poziomu każdej książki (wcięcie 4 spacje, więc bez seo.title)."""
    src = (ROOT / 'data/books.ts').read_text(encoding='utf-8')
    src = src[src.index('export const books'):]
    books = []
    for block in re.split(r'\n  \{\n', src)[1:]:
        fields = dict(re.findall(r"^    (\w+): '((?:[^'\\]|\\.)*)'", block, re.M))
        fields['featured'] = 'featured: true' in block
        books.append(fields)
    return books


def background():
    img = Image.new('RGBA', (W, H), PAPER)
    grid = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(grid)
    for x in range(0, W, 28):
        d.line([(x, 0), (x, H)], fill=GRID)
    for y in range(0, H, 28):
        d.line([(0, y), (W, y)], fill=GRID)
    return Image.alpha_composite(img, grid)


def cover(slug, height):
    img = Image.open(ROOT / 'public/covers' / f'{slug}.webp').convert('RGBA')
    return img.resize((round(img.width * height / img.height), height), Image.LANCZOS)


def as_book(img):
    """Płaską okładkę zamienia w książkę: grzbiet, połysk i brzeg kartek."""
    w, h = img.size
    t = max(2, round(h / 160))  # grubość bloku kartek
    book = Image.new('RGBA', (w + t, h + t), (0, 0, 0, 0))
    d = ImageDraw.Draw(book)
    # Blok kartek wystający w prawo i w dół, z cienkimi liniami stron.
    d.rounded_rectangle([t, t, w + t - 1, h + t - 1], radius=5, fill='#EFE6D2')
    for k in range(1, t, 2):
        d.line([(w + k, t + 4), (w + k, h + k - 2)], fill='#D9CDB4')
        d.line([(t + 4, h + k), (w + k - 2, h + k)], fill='#D9CDB4')

    face = img.copy()
    shade = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shade)
    # Grzbiet: ciemny pas przy lewej krawędzi i jasne zagięcie obok.
    spine = max(10, round(w * 0.045))
    for x in range(spine):
        sd.line([(x, 0), (x, h)], fill=(0, 0, 0, round(95 * (1 - x / spine) ** 1.6)))
    sd.line([(spine + 2, 0), (spine + 2, h)], fill=(255, 255, 255, 70))
    sd.line([(spine + 4, 0), (spine + 4, h)], fill=(0, 0, 0, 30))
    face = Image.alpha_composite(face, shade)
    # Połysk: ukośne rozjaśnienie od lewego górnego rogu, lekkie przyciemnienie w prawym dolnym.
    vertical = Image.linear_gradient('L').resize((w, h))
    gloss = ImageChops.add(vertical, vertical.rotate(90).resize((w, h)), scale=2)
    light = Image.new('RGBA', (w, h), (255, 255, 255, 0))
    light.putalpha(gloss.point(lambda v: round(max(0, 128 - v) * 0.35)))
    dark = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    dark.putalpha(gloss.point(lambda v: round(max(0, v - 150) * 0.25)))
    face = Image.alpha_composite(Image.alpha_composite(face, light), dark)
    # Lekko zaokrąglone rogi po stronie otwierania.
    mask = Image.new('L', (w, h), 0)
    ImageDraw.Draw(mask).rounded_rectangle([-10, 0, w - 1, h - 1], radius=6, fill=255)
    face.putalpha(mask)
    book.alpha_composite(face, (0, 0))
    return book


def paste_with_shadow(canvas, img, xy, angle=0):
    """Wkleja okładkę jako książkę obróconą o `angle` stopni, z cieniem; xy = środek."""
    img = as_book(img)
    pad = 80
    layer = Image.new('RGBA', (img.width + 2 * pad, img.height + 2 * pad), (0, 0, 0, 0))
    # Dwa cienie: szeroki, miękki i krótki, ciemny tuż przy krawędzi.
    for off, blur, alpha, inset in ((28, 26, 95, 10), (8, 6, 110, 2)):
        shadow = Image.new('RGBA', layer.size, (0, 0, 0, 0))
        ImageDraw.Draw(shadow).rectangle(
            [pad + inset, pad + off, pad + img.width - inset, pad + img.height + off / 3],
            fill=(46, 42, 38, alpha),
        )
        layer = Image.alpha_composite(layer, shadow.filter(ImageFilter.GaussianBlur(blur)))
    layer.alpha_composite(img, (pad, pad))
    if angle:
        layer = layer.rotate(angle, resample=Image.BICUBIC, expand=True)
    cx, cy = xy
    canvas.alpha_composite(layer, (round(cx - layer.width / 2), round(cy - layer.height / 2)))


def brand(canvas, x, y):
    logo = Image.open(ROOT / 'public/logo.png').convert('RGBA')
    logo = logo.crop(logo.getbbox())
    logo = logo.resize((round(logo.width * 52 / logo.height), 52), Image.LANCZOS)
    canvas.alpha_composite(logo, (x, y))
    ImageDraw.Draw(canvas).text(
        (x + logo.width + 14, y + 26), 'ZALKA BOOKS', font=display(34), fill=NAVY, anchor='lm'
    )


def footer(canvas, x, y, amazon):
    d = ImageDraw.Draw(canvas)
    d.text((x, y), 'zalkabooks.com', font=body(26, 'Bold'), fill=ORANGE, anchor='ls')
    w = d.textlength('zalkabooks.com', font=body(26, 'Bold'))
    d.text((x + w + 14, y), f'·  {amazon}', font=body(24), fill=INK, anchor='ls')


def wrap(text, fnt, max_w, draw):
    lines, line = [], ''
    for word in text.split():
        trial = f'{line} {word}'.strip()
        if line and draw.textlength(trial, font=fnt) > max_w:
            lines.append(line)
            line = word
        else:
            line = trial
    return lines + [line]


def fan(canvas, slugs, center_x, center_y, height):
    """Wachlarz okładek obracanych wokół punktu pod kompozycją.

    Rysowany najpierw na osobnej warstwie, a potem wklejany tak, żeby środek
    samych okładek (bez miękkiego cienia) wypadł dokładnie w (center_x, center_y).
    """
    n = len(slugs)
    spread = max(min(7 * (n - 1), 28), 14 if n > 1 else 0)
    radius = 600 if n > 2 else 1000
    layer = Image.new('RGBA', (W * 2, H * 2), (0, 0, 0, 0))
    order = sorted(range(n), key=lambda i: -abs(i - (n - 1) / 2))  # środkowa na wierzchu
    for i in order:
        t = 0 if n == 1 else i / (n - 1) - 0.5
        angle = -t * spread  # PIL: dodatni kąt = przeciwnie do wskazówek zegara
        rad = math.radians(-angle)
        cx = W + radius * math.sin(rad)
        cy = H + radius - radius * math.cos(rad)
        paste_with_shadow(layer, cover(slugs[i], height), (cx, cy), angle)
    left, top, right, bottom = layer.getchannel('A').point(lambda a: 255 if a > 200 else 0).getbbox()
    canvas.alpha_composite(
        layer, (round(center_x - (left + right) / 2), round(center_y - (top + bottom) / 2))
    )


def section_image(lang, books):
    cfg = SECTIONS[lang]
    own = [b for b in books if b['lang'] == lang and not b.get('comingSoon')]
    own.sort(key=lambda b: not b['featured'])
    slugs = [b['slug'] for b in own[:5]]

    img = background()
    brand(img, 64, 56)
    d = ImageDraw.Draw(img)
    y = 190
    for line in cfg['headline']:
        d.text((64, y), line, font=display(60), fill=NAVY, anchor='ls')
        y += 64
    d.text((64, y), cfg['accent'], font=display(56), fill=ORANGE, anchor='ls')
    d.line([(66, y + 18), (66 + d.textlength(cfg['accent'], font=display(56)), y + 14)],
           fill=ORANGE, width=6)
    footer(img, 64, H - 56, cfg['amazon'])

    # Kolejność w wachlarzu: polecane w środku.
    middle = len(slugs) // 2
    arranged = [None] * len(slugs)
    positions = sorted(range(len(slugs)), key=lambda i: abs(i - middle))
    for pos, slug in zip(positions, slugs):
        arranged[pos] = slug
    height = 380 if len(slugs) > 2 else 420
    fan(img, arranged, 845 if len(slugs) > 2 else 890, H / 2, height)
    return img


def book_image(book):
    lang = book['lang']
    cfg = SECTIONS[lang]
    img = background()
    paste_with_shadow(img, cover(book['slug'], 520), (300, H / 2), 2.5)

    x, max_w = 590, 560
    brand(img, x, 64)
    d = ImageDraw.Draw(img)
    title_font = display(72)
    y = 210
    for line in wrap(book['title'], title_font, max_w, d):
        d.text((x, y), line, font=title_font, fill=NAVY, anchor='ls')
        y += 74
    sub_font = body(32, 'Bold')
    y += 6
    for line in wrap(book.get('detailSubtitle') or book['subtitle'], sub_font, max_w, d):
        d.text((x, y), line, font=sub_font, fill=INK, anchor='ls')
        y += 42
    # Wiek jako znaczek tylko w polskich książkach dla dzieci, gdy nie ma go w podtytule.
    subtitle = book.get('detailSubtitle') or book['subtitle']
    if lang == 'pl' and book['ageRange'] != 'Dorośli' and book['ageRange'] not in subtitle:
        label = f"Wiek: {book['ageRange']}"
        f = body(28, 'ExtraBold')
        w = d.textlength(label, font=f)
        top = y + 4
        d.rounded_rectangle([x, top, x + w + 40, top + 50], radius=25, fill=ORANGE_LIGHT)
        d.text((x + 20, top + 25), label, font=f, fill=ORANGE, anchor='lm')
    footer(img, x, H - 64, cfg['amazon'])
    return img


def save(img, path):
    path.parent.mkdir(parents=True, exist_ok=True)
    img.convert('RGB').save(path, quality=88, optimize=True, progressive=True)
    print(path.relative_to(ROOT))


def main():
    books = load_books()
    for lang in SECTIONS:
        save(section_image(lang, books), OUT / f'{lang}.jpg')
    for book in books:
        save(book_image(book), OUT / 'books' / f"{book['slug']}.jpg")


if __name__ == '__main__':
    main()

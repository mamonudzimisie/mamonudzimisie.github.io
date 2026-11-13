#!/usr/bin/env python3
"""Grafiki do wpisu PL „Wykreślanki dla dzieci” → public/blog/.

- wykreslanki-dla-dzieci.webp          — główna: kartka z rozwiązywaną wykreślanką,
                                         ołówek, spokojne tło,
- wykreslanki-dla-dzieci-miniatura.webp — ta sama scena 3:2 na listę wpisów,
- wykreslanki-poziomy-trudnosci.webp    — trzy poziomy z zakreślonymi słowami.

Plansze są prawdziwe — wyjęte z książek „Znajdź słówko!” (silnik wordsearch, repo
word-search) do scripts/data/wykreslanki-dla-dzieci.json, razem z położeniem słów.
Uruchom: python3 scripts/make_blog_wykreslanki.py
"""

import json
import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

from make_og import NAVY, body, display

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public/blog'
DATA = json.loads((ROOT / 'scripts/data/wykreslanki-dla-dzieci.json').read_text(encoding='utf-8'))

INK = '#2E2A26'
# Zakreślacze: stonowane, z jednej rodziny ciepłych pasteli.
MARKERS = ['#F7D774', '#A9D8B8', '#F4B6A6', '#AFCFEA', '#F3C58F', '#CDBFE6']
LEVEL_COLORS = {'5_6': '#3FA66B', '7_9': '#E8793C', '13_PLUS': '#2D3A8C'}


# ---------- drobne elementy ----------

def soft_shadow(size, radius, blur, alpha, offset=(0, 18)):
    w, h = size
    pad = blur * 3
    sh = Image.new('RGBA', (w + 2 * pad, h + 2 * pad), (0, 0, 0, 0))
    ImageDraw.Draw(sh).rounded_rectangle(
        [pad + offset[0], pad + offset[1], pad + w + offset[0], pad + h + offset[1]],
        radius=radius, fill=(70, 45, 20, alpha))
    return sh.filter(ImageFilter.GaussianBlur(blur)), pad


def paste_rotated(canvas, layer, center, angle, shadow=(26, 70)):
    """Wkleja warstwę obróconą wokół środka, z miękkim cieniem pod spodem."""
    blur, alpha = shadow
    sh, pad = soft_shadow(layer.size, 24, blur, alpha)
    sh.alpha_composite(layer, (pad, pad))
    rot = sh.rotate(angle, resample=Image.BICUBIC, expand=True)
    canvas.alpha_composite(rot, (round(center[0] - rot.width / 2), round(center[1] - rot.height / 2)))


def capsule(draw, a, b, width, fill):
    """Zaokrąglony pasek zakreślacza od punktu a do b."""
    draw.line([a, b], fill=fill, width=round(width))
    r = width / 2
    for x, y in (a, b):
        draw.ellipse([x - r, y - r, x + r, y + r], fill=fill)


def shade(hex_color, k):
    h = hex_color.lstrip('#')
    r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
    return (round(r * k), round(g * k), round(b * k), 255)


def crayon(length, thick, color):
    """Kredka leżąca poziomo, czubkiem w prawo."""
    tip = thick * 1.6
    im = Image.new('RGBA', (round(length + 8), round(thick + 8)), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    y0, y1 = 4, 4 + thick
    body_end = length - tip
    d.rounded_rectangle([4, y0, body_end, y1], radius=thick * 0.25, fill=color)
    d.rectangle([4, y0 + thick * 0.62, body_end, y1], fill=shade(color, 0.82))  # cień na dole
    d.rectangle([4, y0 + thick * 0.12, body_end, y0 + thick * 0.26], fill=(255, 255, 255, 70))
    # papierowa owijka z paskami
    wrap0, wrap1 = length * 0.18, body_end - thick * 0.6
    d.rectangle([wrap0, y0, wrap1, y1], fill=shade(color, 0.9))
    for x in (wrap0 + 10, wrap1 - 18):
        d.rectangle([x, y0, x + 6, y1], fill=shade(color, 0.6))
    # drewniany stożek i grafit
    d.polygon([(body_end, y0), (length - tip * 0.35, y0 + thick * 0.33),
               (length - tip * 0.35, y1 - thick * 0.33), (body_end, y1)], fill='#F1D3A2')
    d.polygon([(length - tip * 0.35, y0 + thick * 0.33), (length + 2, y0 + thick / 2),
               (length - tip * 0.35, y1 - thick * 0.33)], fill=color)
    return im


# ---------- plansza ----------

def draw_grid(d, puzzle, x0, y0, cell, font_size, highlight=None, marker_w=0.74, letter_color=INK):
    """Rysuje litery planszy i pod nimi zakreślenia słów z listy `highlight` (indeksy)."""
    cells = puzzle['cells']
    hl = range(len(puzzle['pl'])) if highlight is None else highlight
    layer = Image.new('RGBA', d.im.size, (0, 0, 0, 0))
    ld = ImageDraw.Draw(layer)
    for k in hl:
        word, r, c, dr, dc = puzzle['pl'][k]
        n = len(word) - 1
        a = (x0 + (c + 0.5) * cell, y0 + (r + 0.5) * cell)
        b = (x0 + (c + dc * n + 0.5) * cell, y0 + (r + dr * n + 0.5) * cell)
        col = MARKERS[k % len(MARKERS)]
        capsule(ld, a, b, cell * marker_w, col + 'B0')
    return layer, [(x0 + (c + 0.5) * cell, y0 + (r + 0.5) * cell, ch)
                   for r, row in enumerate(cells) for c, ch in enumerate(row)]


def puzzle_sheet(puzzle, found):
    """Kartka z zeszytu: tytuł, plansza 8×8 z zakreśleniami, lista słów z ptaszkami."""
    W, H = 700, 820
    sheet = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(sheet)
    d.rounded_rectangle([0, 0, W, H], radius=26, fill='#FFFDF8')
    # linie zeszytu w kratkę, bardzo jasne
    for x in range(22, W, 30):
        d.line([(x, 0), (x, H)], fill='#F3F1EC')
    for y in range(22, H, 30):
        d.line([(0, y), (W, y)], fill='#F3F1EC')
    # pasek tytułu
    d.text((W / 2, 82), puzzle['theme'], font=display(50), fill=NAVY, anchor='ms')
    tw = d.textlength(puzzle['theme'], font=display(50))
    d.line([(W / 2 - tw / 2, 98), (W / 2 + tw / 2, 98)], fill='#E8793C', width=4)
    # plansza
    n = len(puzzle['cells'])
    cell = 70
    gx, gy = (W - n * cell) / 2, 140
    d.rounded_rectangle([gx - 14, gy - 14, gx + n * cell + 14, gy + n * cell + 14], radius=22,
                        fill='white', outline='#D8DEE8', width=3)
    marks, letters = draw_grid(d, puzzle, gx, gy, cell, 40, highlight=found)
    sheet.alpha_composite(marks)
    d = ImageDraw.Draw(sheet)
    f = body(40, 'ExtraBold')
    for x, y, ch in letters:
        d.text((x, y), ch, font=f, fill=INK, anchor='mm')
    # lista słów: dwa rzędy po trzy, znalezione przekreślone z ptaszkiem
    words = [p[0] for p in puzzle['pl']]
    ly = gy + n * cell + 50
    fw = body(30, 'ExtraBold')
    colw = (W - 80) / 3
    for i, w in enumerate(words):
        cx = 40 + colw * (i % 3) + 34
        cy = ly + (i // 3) * 52
        box = [cx - 30, cy - 15, cx - 0, cy + 15]
        d.rounded_rectangle(box, radius=7, outline='#9AA3B5', width=3, fill='white')
        if i in found:
            d.line([(cx - 24, cy), (cx - 16, cy + 8), (cx - 3, cy - 10)], fill='#E8793C', width=5, joint='curve')
        d.text((cx + 14, cy + 1), w, font=fw, fill=INK if i not in found else '#8A8279', anchor='lm')
        if i in found:
            tw = d.textlength(w, font=fw)
            d.line([(cx + 12, cy + 2), (cx + 16 + tw, cy + 2)], fill='#8A8279', width=3)
    return sheet, (gx, gy, cell)


# ---------- tło ----------

def calm_background(W, H):
    """Ciepły papier z jednym miękkim światłem z prawej, bez wzorów."""
    bg = Image.new('RGBA', (W, H), '#FAF3E6')
    mask = Image.new('L', (W, H), 0)
    r = 0.42 * W
    ImageDraw.Draw(mask).ellipse([0.72 * W - r, 0.5 * H - r, 0.72 * W + r, 0.5 * H + r], fill=150)
    glow = Image.new('RGBA', (W, H), '#FFFBF3')
    return Image.composite(glow, bg, mask.filter(ImageFilter.GaussianBlur(W * 0.08)))


# ---------- grafika główna ----------

def hero(W, H, compact=False):
    img = calm_background(W, H)
    puzzle = DATA['hero']
    found = [0, 2, 3, 5]  # TYGRYS, PANDA, ZEBRA, LEW — KOALA i LAMA jeszcze czekają
    s = H / 900  # skala względem wersji 1600×900

    sx = 0.70 * W if not compact else 0.72 * W

    # kartka z wykreślanką
    sheet, _ = puzzle_sheet(puzzle, found)
    k = (0.9 if not compact else 0.76) * s
    sheet = sheet.resize((round(sheet.width * k), round(sheet.height * k)), Image.LANCZOS)
    paste_rotated(img, sheet, (sx, H / 2 + 4 * s), 3, shadow=(30, 80))

    # jeden ołówek obok kartki, cały widoczny
    paste_rotated(img, crayon(440 * s, 30 * s, '#2D3A8C'), (sx + (0.255 if not compact else 0.235) * W, H * 0.52),
                  100, shadow=(10, 60))

    # tekst
    d = ImageDraw.Draw(img)
    tx = 80 * s
    kicker = body(round(22 * s), 'ExtraBold')
    x = tx
    for ch in 'PORADNIK DLA RODZICÓW':  # rozstrzelone wersaliki
        d.text((x, 250 * s), ch, font=kicker, fill='#D9682F', anchor='ls')
        x += d.textlength(ch, font=kicker) + 3 * s
    size = 108 if not compact else 100  # przed skalą s; w miniaturze kartka jest bliżej tekstu
    ty = 370 * s
    for i, line in enumerate(['Wykreślanki', 'dla dzieci']):
        d.text((tx, ty + i * size * s), line, font=display(round(size * s)), fill=NAVY, anchor='ls')
    ly = ty + size * s + 50 * s
    d.line([(tx, ly), (tx + 90 * s, ly)], fill='#E8793C', width=round(6 * s))
    d.text((tx, ly + 70 * s), '6 powodów, żeby po nie sięgnąć', font=body(round(38 * s), 'SemiBold'),
           fill='#5A524A', anchor='ls')
    return img


# ---------- poziomy trudności ----------

def levels():
    W, H = 2000, 900
    img = calm_background(W, H)
    cards = [('5_6', '5–6 lat', 'siatka 8×8', 'poziomo i pionowo'),
             ('7_9', '7–9 lat', 'siatka 13×13', 'także po skosie'),
             ('13_PLUS', '13+', 'siatka 17×17', 'we wszystkich kierunkach')]
    cw, ch_, gap = 590, 790, 45
    x = (W - 3 * cw - 2 * gap) / 2
    for key, age, grid_lbl, dirs in cards:
        puzzle = DATA[key]
        col = LEVEL_COLORS[key]
        card = Image.new('RGBA', (cw, ch_), (0, 0, 0, 0))
        d = ImageDraw.Draw(card)
        d.rounded_rectangle([0, 0, cw, ch_], radius=34, fill='white')
        d.text((36, 80), age, font=display(72), fill=col, anchor='lm')
        d.text((cw - 36, 62), grid_lbl, font=body(30, 'ExtraBold'), fill=NAVY, anchor='rm')
        d.text((cw - 36, 102), dirs, font=body(24, 'SemiBold'), fill='#7A7168', anchor='rm')
        d.line([(36, 150), (cw - 36, 150)], fill='#ECE6DC', width=3)
        n = len(puzzle['cells'])
        area = cw - 70
        cell = area / n
        gx, gy = 35, 185
        marks, letters = draw_grid(d, puzzle, gx, gy, cell, 0, marker_w=0.8)
        card.alpha_composite(marks)
        d = ImageDraw.Draw(card)
        f = body(round(cell * 0.56), 'ExtraBold')
        for lx, ly, chh in letters:
            d.text((lx, ly), chh, font=f, fill=INK, anchor='mm')
        d.text((cw / 2, gy + area + 46), f'„{puzzle["theme"]}” · {len(puzzle["pl"])} słów',
               font=body(30, 'ExtraBold'), fill='#6B625A', anchor='mm')
        paste_rotated(img, card, (x + cw / 2, H / 2 - 8), 0, shadow=(26, 60))
        x += cw + gap
    return img


def save(img, name):
    path = OUT / name
    img.convert('RGB').save(path, 'WEBP', quality=88, method=6)
    print(path.relative_to(ROOT), img.size)


def main():
    save(hero(1600, 900), 'wykreslanki-dla-dzieci.webp')
    save(hero(1200, 800, compact=True), 'wykreslanki-dla-dzieci-miniatura.webp')
    save(levels(), 'wykreslanki-poziomy-trudnosci.webp')


if __name__ == '__main__':
    main()

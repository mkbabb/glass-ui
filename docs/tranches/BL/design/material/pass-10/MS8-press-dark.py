"""MS8-press-dark.py · the arithmetic behind MINOR-SPLIT-v8.md §4.3's sizing.css:258 reading: what the minor's DARK
--dock-control-press-bg (color-mix(in oklab, var(--glass-plate-resting), var(--foreground) 7%), sizing.css:262-265) does
to the lightness under it. Inputs are the minor v8's dark tokens: --glass-veil-ink oklch(0.17 0.03 70) and resting α 0.18
(dark-arm.css:275-281), --foreground hsl(30 14% 90%) (:86), --card hsl(26 22% 17%) (:93), page --neutral-0 hsl(24 9% 4%)
(:56), the dock plate at --glass-veil-dock α 0.14 (:287). color-mix interpolates premultiplied; the layer composites
source-over in sRGB. Computed, not painted: no browser ran. Usage: python3 -I MS8-press-dark.py"""
import math, colorsys
def lin(c): return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
def enc(c): return 12.92 * c if c <= 0.0031308 else 1.055 * c ** (1 / 2.4) - 0.055
def to_lab(r, g, b):
    r, g, b = map(lin, (r, g, b))
    l = (0.4122214708*r + 0.5363325363*g + 0.0514459929*b) ** (1/3); m = (0.2119034982*r + 0.6806995451*g + 0.1073969566*b) ** (1/3); s = (0.0883024619*r + 0.2817188376*g + 0.6299787005*b) ** (1/3)
    return (0.2104542553*l + 0.7936177850*m - 0.0040720468*s, 1.9779984951*l - 2.4285922050*m + 0.4505937099*s, 0.0259040371*l + 0.7827717662*m - 0.8086757660*s)
def to_rgb(L, a, b):
    l = (L + 0.3963377774*a + 0.2158037573*b) ** 3; m = (L - 0.1055613458*a - 0.0638541728*b) ** 3; s = (L - 0.0894841775*a - 1.2914855480*b) ** 3
    return tuple(enc(min(1, max(0, x))) for x in (4.0767416621*l - 3.3077115913*m + 0.2309699292*s, -1.2684380046*l + 2.6097574011*m - 0.3413193965*s, -0.0041960863*l - 0.7034186147*m + 1.7076147010*s))
def hsl(h, s, l): return colorsys.hls_to_rgb(h / 360, l / 100, s / 100)
def over(top, a, bot): return tuple(top[i] * a + bot[i] * (1 - a) for i in range(3))
ink = (0.17, 0.03 * math.cos(math.radians(70)), 0.03 * math.sin(math.radians(70)))
fg = to_lab(*hsl(30, 14, 90))
w1, w2 = 0.18 * 0.93, 1.0 * 0.07
A = w1 + w2
P = tuple((ink[i] * w1 + fg[i] * w2) / A for i in range(3))
print(f"press layer (dark): OKLab L {P[0]:.3f}, alpha {A:.3f}")
page = hsl(24, 9, 4); card = hsl(26, 22, 17); inkrgb = to_rgb(*ink)
grounds = {"the dark page --neutral-0": page, "the dark --card": card, "the dock plate (ink at α 0.14) over the dark page": over(inkrgb, 0.14, page)}
for name, g in grounds.items():
    print(f"{name}: L {to_lab(*g)[0]:.3f} -> under the press layer {to_lab(*over(to_rgb(*P), A, g))[0]:.3f}")

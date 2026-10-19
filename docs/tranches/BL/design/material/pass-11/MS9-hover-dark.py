"""MS9-hover-dark.py · the arithmetic behind MINOR-SPLIT-v9.md §4.3: what the minor's DARK hover fill
(--dock-control-hover-bg's dark arm = --glass-plate-resting = oklch(0.17 0.03 70 / 0.18) at level 1; sizing.css:206,
tokens/glass.css:184, dark-arm.css:275-281) does to the lightness under it, beside the light arm (foreground ink at
--fill-hover 0.05). Same method and inputs as pass-10/MS8-press-dark.py (dark --foreground hsl(30 14% 90%), --card
hsl(26 22% 17%), page --neutral-0 hsl(24 9% 4%), the dock plate at --glass-veil-dock alpha 0.14; source-over in sRGB).
The light inputs: light --foreground and --card from the minor's tokens, passed as hsl triples on the command line.
Computed, not painted: no browser ran. Usage: python3 -I MS9-hover-dark.py"""
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
ink = to_rgb(0.17, 0.03 * math.cos(math.radians(70)), 0.03 * math.sin(math.radians(70)))
page = hsl(24, 9, 4); card = hsl(26, 22, 17)
dock = over(ink, 0.14, page)
print("DARK hover layer: the veil ink oklch(0.17 0.03 70) at alpha 0.18 (the resting rung, level 1)")
for name, g in {"the dark page --neutral-0": page, "the dock plate (ink at 0.14) over the dark page": dock, "the dark --card": card}.items():
    print(f"  {name}: L {to_lab(*g)[0]:.4f} -> under the hover layer {to_lab(*over(ink, 0.18, g))[0]:.4f}")

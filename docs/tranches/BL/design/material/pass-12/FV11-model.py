#!/usr/bin/env python3
"""FV11-model.py · D3 pass 12, floor v11: a static model of the focus veil's paint, used to choose R-32's dark arm.
Not an instrument and not a gate: the battery seat measures paint. The model is what the CSS spec says the chain does
(Filter Effects 1 §12: saturate() and brightness() as sRGB-encoded matrices / component transfers, clipped to [0,1]
after each function; the background composited source-over in encoded sRGB), CALIBRATED below against R-2's measured
pairs (pass-7 FV6 M-9 logs): Chromium paints the chain then the background; Playwright WebKit paints NO
backdrop-filter (HARNESS.md:133, lib.mjs:112), so it composites the background alone.
  python3 -I FV11-model.py            # calibration, the arm's search, the chosen arm's predicted R-32 rows
"""
import math, sys

def lin(c): return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
def oklch(rgb):
    r, g, b = (lin(v / 255) for v in rgb)
    l = 0.4122214708*r + 0.5363325363*g + 0.0514459929*b
    m = 0.2119034982*r + 0.6806995451*g + 0.1073969566*b
    s = 0.0883024619*r + 0.2817188376*g + 0.6299787005*b
    l, m, s = (math.copysign(abs(x) ** (1/3), x) for x in (l, m, s))
    L = 0.2104542553*l + 0.7936177850*m - 0.0040720468*s
    A = 1.9779984951*l - 2.4285922050*m + 0.4505937099*s
    B = 0.0259040371*l + 0.7827717662*m - 0.8086757660*s
    return L, math.hypot(A, B), math.degrees(math.atan2(B, A)) % 360
def hexrgb(h): return tuple(int(h[i:i+2], 16) for i in (1, 3, 5))
def tohex(rgb): return "#" + "".join(f"{v:02x}" for v in rgb)
clip = lambda v: min(1.0, max(0.0, v))
def saturate(c, s):  # Filter Effects 1, saturate(): the feColorMatrix type=saturate, on encoded sRGB, clipped
    r, g, b = c
    return (clip((0.213+0.787*s)*r + (0.715-0.715*s)*g + (0.072-0.072*s)*b),
            clip((0.213-0.213*s)*r + (0.715+0.285*s)*g + (0.072-0.072*s)*b),
            clip((0.213-0.213*s)*r + (0.715-0.715*s)*g + (0.072+0.928*s)*b))
def brightness(c, k): return tuple(clip(v * k) for v in c)
def contrast(c, x): return tuple(clip((v - 0.5) * x + 0.5) for v in c)  # Filter Effects 1, contrast(): slope x, intercept 0.5 - 0.5x
FN = {"saturate": saturate, "brightness": brightness, "contrast": contrast}
def over(c, a, ink=(0, 0, 0)): return tuple((1 - a) * v + a * i for v, i in zip(c, ink))
def paint(raw, chain, bg_a, engine):
    c = tuple(v / 255 for v in hexrgb(raw))
    if engine == "chromium":  # the backdrop-filter chain, in order, then the background over it
        for fn, x in chain: c = FN[fn](c, x)
    c = over(c, bg_a)
    return tuple(round(v * 255) for v in c)
def r32(raw, out):
    L0, C0, h0 = oklch(hexrgb(raw)); L1, C1, h1 = oklch(out)
    dh = abs((h1 - h0 + 180) % 360 - 180)
    return dict(veiled=tohex(out), L=(L0, L1), C=(C0, C1), h=(h0, h1), dh=dh, k=C1 / C0 if C0 else float("nan"), dL=L1 - L0)

SPOT_SHELL, SPOT_GL, PAGE = "#ec9642", "#e87237", "#0b0a09"   # FV6 M-9 logs: the Chromium shell spot, the GL spot, the dark page
R2 = ([("saturate", 1.5)], 0.40)                               # floor v10: blur() saturate(--glass-saturate) + #000 40%

def line(tag, raw, d):
    return (f"  {tag:<34} {raw} → {d['veiled']}  L {d['L'][0]:.3f}→{d['L'][1]:.3f}  C {d['C'][0]:.3f}→{d['C'][1]:.3f}  "
            f"h {d['h'][0]:.1f}°→{d['h'][1]:.1f}°  |Δh| {d['dh']:.1f}°  C×{d['k']:.3f}  ΔL {d['dL']:+.3f}")

if __name__ == "__main__":
    print("== calibration: R-2 (floor v10) through the model vs the measured pairs (FV6 M-9-chromium.log:5,6; M-9-webkit.log:5,6)")
    for eng, raw, meas in (("chromium", SPOT_SHELL, "#99560a"), ("chromium", PAGE, "#060604"), ("webkit", SPOT_GL, "#8b4421"), ("webkit", PAGE, "#070605")):
        out = paint(raw, *R2, eng)
        dE = math.dist([x for x in oklch(out)[:1]] + [0], [oklch(hexrgb(meas))[0], 0])
        print(f"  {eng:<8} {raw} model {tohex(out)} measured {meas}  |ΔL model−measured| {dE:.4f}")
    print("\n== search: chain blur() brightness(K) saturate(S), background transparent (Chromium paint; WebKit paints none of it)")
    print("   rows: K, S, then the worst of the two Chromium spot grounds (shell #ec9642, GL #e87237): max |Δh|, min C×, and each ΔL")
    best = []
    for K in [x / 100 for x in range(60, 96, 2)]:
        for S in [x / 100 for x in range(150, 261, 5)]:
            ch = [("brightness", K), ("saturate", S)]
            a = r32(SPOT_SHELL, paint(SPOT_SHELL, ch, 0, "chromium")); b = r32(SPOT_GL, paint(SPOT_GL, ch, 0, "chromium"))
            p = r32(PAGE, paint(PAGE, ch, 0, "chromium"))
            if max(a["dh"], b["dh"]) <= 3 and min(a["k"], b["k"]) >= 0.95 and p["dL"] < 0:
                best.append((K, S, max(a["dh"], b["dh"]), min(a["k"], b["k"]), a["dL"], b["dL"], p["dL"]))
    for row in sorted(best, key=lambda r: (r[4] + r[5]))[:12]:
        print("   K %.2f S %.2f  max|Δh| %.1f°  min C× %.3f  ΔL shell %+.3f GL %+.3f page %+.3f" % row)
    print("   (none: a scale, before or after saturate(), cannot both keep the spot's chroma and dim the page 0.02; see --arm)")
    if len(sys.argv) > 1 and sys.argv[1] == "--arm":
        S, CX, K = 1.5, float(sys.argv[2]), float(sys.argv[3])
        ch = [("saturate", S), ("contrast", CX), ("brightness", K)]
        print(f"\n== the arm: blur() saturate({S}) contrast({CX}) brightness({K}), background transparent (Playwright WebKit paints none of the chain)")
        for eng, raw, tag in (("chromium", SPOT_SHELL, "chromium shell spot"), ("chromium", SPOT_GL, "chromium GL spot (frame 1's ground)"), ("chromium", PAGE, "chromium page"),
                              ("webkit", SPOT_GL, "Playwright WebKit GL spot"), ("webkit", PAGE, "Playwright WebKit page")):
            print(line(tag, raw, r32(raw, paint(raw, ch, 0, eng))))
        print("\n== R-2 beside it (floor v10)")
        for eng, raw, tag in (("chromium", SPOT_SHELL, "chromium shell spot"), ("chromium", SPOT_GL, "chromium GL spot (frame 1's ground)"), ("chromium", PAGE, "chromium page"),
                              ("webkit", SPOT_GL, "Playwright WebKit GL spot"), ("webkit", PAGE, "Playwright WebKit page")):
            print(line(tag, raw, r32(raw, paint(raw, *R2, eng))))
        print("\n== search 2: saturate(1.5) contrast(c) brightness(K), the worst of both Chromium spot grounds; page ΔL ≤ -0.024 (M-9's 0.02 plus the calibration's 0.0024)")
        n = 0
        for cx in (1.0, 1.01, 1.02, 1.03, 1.04, 1.05):
            for k in (0.70, 0.75, 0.80, 0.85, 0.90):
                c2 = [("saturate", 1.5), ("contrast", cx), ("brightness", k)]
                a, b, p = (r32(g, paint(g, c2, 0, "chromium")) for g in (SPOT_SHELL, SPOT_GL, PAGE))
                ok = max(a["dh"], b["dh"]) <= 3 and min(a["k"], b["k"]) >= 0.95 and p["dL"] <= -0.024 and a["dL"] < 0 and b["dL"] < 0
                n += ok
                print(f"   c {cx:.2f} K {k:.2f}  max|Δh| {max(a['dh'], b['dh']):.1f}°  min C× {min(a['k'], b['k']):.3f}  ΔL shell {a['dL']:+.3f} GL {b['dL']:+.3f} page {p['dL']:+.4f}  {'PASS' if ok else '-'}")
        print(f"   {n} of 30 pass")
        print("\n== off the spot, model only, REPORTED (R-32 gates the spot; these are other hues an aurora can carry), Chromium")
        for raw in ("#8a5cf6", "#3b82f6", "#2bb3a3", "#e0559b", "#f4d35e", "#5a3a2a"):
            print(line("other ground", raw, r32(raw, paint(raw, ch, 0, "chromium"))))

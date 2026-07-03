#!/usr/bin/env python3
# BG.W-PAPER-TEXTURE-UNIFY paint pixel analysis — the BINDING painted-truth numbers.
# For the tooth specimen region: warm-hue floor, no-metallic (dark fibers stay warm),
# no-double-warm ceiling (card mean chroma bounded), no-squint modulation (L std),
# cross-engine parity (chrome vs safari mean deltas).
import numpy as np
from PIL import Image
import math, os, json

OUT = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-PAPER-TEXTURE-UNIFY-paint"

def srgb_to_linear(c):
    c = c / 255.0
    return np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)

def linear_to_oklab(r, g, b):
    l = 0.4122214708*r + 0.5363325363*g + 0.0514459929*b
    m = 0.2119034982*r + 0.6806995451*g + 0.1073969566*b
    s = 0.0883024619*r + 0.2817188376*g + 0.6299787005*b
    l_ = np.cbrt(l); m_ = np.cbrt(m); s_ = np.cbrt(s)
    L = 0.2104542553*l_ + 0.7936177850*m_ - 0.0040720468*s_
    a = 1.9779984951*l_ - 2.4285922050*m_ + 0.4505937099*s_
    bb = 0.0259040371*l_ + 0.7827717662*m_ - 0.8086757660*s_
    return L, a, bb

def analyze_region(img, x0, y0, x1, y1):
    arr = np.asarray(img.convert("RGB"))[y0:y1, x0:x1, :].astype(np.float64)
    R = srgb_to_linear(arr[:,:,0]); G = srgb_to_linear(arr[:,:,1]); B = srgb_to_linear(arr[:,:,2])
    L, a, b = linear_to_oklab(R, G, B)
    C = np.sqrt(a*a + b*b)
    H = (np.degrees(np.arctan2(b, a)) + 360) % 360
    # dark 12% (the umber fibers) vs light 12% (the ecru gaps)
    flatL = L.flatten()
    order = np.argsort(flatL)
    n = len(order); k = max(1, n // 8)
    dark_idx = order[:k]; light_idx = order[-k:]
    af = a.flatten(); bf = b.flatten(); Cf = C.flatten(); Hf = H.flatten()
    def stat(idx):
        return dict(L=float(np.mean(flatL[idx])), a=float(np.mean(af[idx])), b=float(np.mean(bf[idx])),
                    C=float(np.mean(Cf[idx])), H=float(np.mean(Hf[idx])))
    return dict(
        meanRGB=[float(np.mean(arr[:,:,i])) for i in range(3)],
        meanL=float(np.mean(L)), meanC=float(np.mean(C)), meanH=float(np.mean(H)),
        stdL=float(np.std(L)),
        dark=stat(dark_idx), light=stat(light_idx),
    )

# ── paper-texture: CLEAN specimen card tooth region (actual 2880x1800 coords) ──
# CLEAN card ~ x 245-1050, y 700-1140 (2x). Sample a text-free upper band.
REGIONS = {
    "clean_tooth":   (360, 730, 900, 860),   # inside CLEAN card, above the centered label
    "warm_retint":   (260, 1400, 1000, 1520), # WARM cascade-retint card (default warm tooth)
    "cool_retint":   (1120, 1400, 1900, 1520),# COOL cascade-retint card (the intentional override)
    "page_bg":       (2400, 500, 2750, 750),  # page background, content-free
}

report = {}
for engine in ["chrome", "safari"]:
    for mode in ["light", "dark"]:
        f = f"{OUT}/{engine}-foundations_paper-texture-{mode}.png"
        if not os.path.exists(f): continue
        img = Image.open(f)
        key = f"{engine}-{mode}"
        report[key] = {name: analyze_region(img, *r) for name, r in REGIONS.items()}

# ── Summary judgments ──
def warmhue(h): return 40 <= h <= 130  # OKLab warm band (amber/ecru/umber)

print("=== BG.W-PAPER-TEXTURE-UNIFY — painted tooth analysis (OKLab) ===\n")
for key in report:
    r = report[key]["clean_tooth"]
    d = r["dark"]; l = r["light"]
    print(f"[{key}] CLEAN tooth:")
    print(f"   mean L={r['meanL']:.3f} C={r['meanC']:.4f} H={r['meanH']:.1f}  stdL(modulation)={r['stdL']:.4f}")
    print(f"   DARK fibers (umber): L={d['L']:.3f} C={d['C']:.4f} H={d['H']:.1f}  warm={warmhue(d['H'])}")
    print(f"   LIGHT gaps  (ecru) : L={l['L']:.3f} C={l['C']:.4f} H={l['H']:.1f}  warm={warmhue(l['H'])}")
    wr = report[key]["warm_retint"]; cr = report[key]["cool_retint"]
    print(f"   WARM-retint card: C={wr['meanC']:.4f} H={wr['meanH']:.1f} | COOL-retint card: C={cr['meanC']:.4f} H={cr['meanH']:.1f} (override demo)")
    print()

# Cross-engine parity on the CLEAN tooth (chrome vs safari, per mode)
print("=== Cross-engine parity (CLEAN tooth mean RGB delta) ===")
for mode in ["light", "dark"]:
    ck = f"chrome-{mode}"; sk = f"safari-{mode}"
    if ck in report and sk in report:
        c = report[ck]["clean_tooth"]["meanRGB"]; s = report[sk]["clean_tooth"]["meanRGB"]
        d = [abs(c[i]-s[i]) for i in range(3)]
        print(f"   {mode}: chrome{[round(x,1) for x in c]} vs safari{[round(x,1) for x in s]}  ΔRGB={[round(x,1) for x in d]} maxΔ={max(d):.1f}")

json.dump(report, open(f"{OUT}/pixel-analysis.json", "w"), indent=2)
print(f"\nwrote pixel-analysis.json")

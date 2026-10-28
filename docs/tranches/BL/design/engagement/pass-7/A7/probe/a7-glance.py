# P-A7 · the CK-25 cells read from the owner-glance set (capture.mjs frames and index), no browser.
#   python3 -I a7-glance.py <label> <glance-dir> [<reference-frames-dir> <reference-label>]
# Cells (PASS/FAIL per engine × pointer × theme, from the frames capture.mjs took on this build):
#   button committed still   the committed frame's measured scale (capture's `s`, read on the target at the frame) is at
#                            least ×1.050, the committed Switch frame both pass-6 critics read as legible in a still
#                            (C-A6 §4 "reads clearly"; C-E6 §4), and above its own pressed frame's. The pass-6 Button
#                            committed at ×1.021 and could not be told from rest (C-A6 §4, C-E6 §4)
#   switch coarse press      the coarse rest → pressed frames: the mean |ΔL| (OKLab L) over the pixels that change by
#                            ≥ 0.02 L, and their count. Dark PASSES when its mean |ΔL| is at least the light press's on
#                            the reference frames (pass 6, the light frame the critics read as cured: C-A6 §4 "the whole
#                            bit greys", REGISTRY §P6-4 "the light frame is cured, the dark is not"). Light passes on
#                            the same bound, so the light frame does not get worse
import json, os, sys, glob
from PIL import Image

label, gdir = sys.argv[1], sys.argv[2]
ref_dir = sys.argv[3] if len(sys.argv) > 3 else None
ref_label = sys.argv[4] if len(sys.argv) > 4 else None


def L(c):
    lin = lambda u: u / 12.92 if u <= 0.04045 else ((u + 0.055) / 1.055) ** 2.4
    r, g, b = (lin(x / 255) for x in c[:3])
    l = (0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b) ** (1 / 3)
    m = (0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b) ** (1 / 3)
    s = (0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b) ** (1 / 3)
    return 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s


def press_dl(rest, pressed):
    a = Image.open(rest).convert("RGB"); b = Image.open(pressed).convert("RGB")
    if a.size != b.size: return None
    pa, pb = a.load(), b.load(); d = []
    for y in range(a.size[1]):
        for x in range(a.size[0]):
            v = abs(L(pb[x, y]) - L(pa[x, y]))
            if v >= 0.02: d.append(v)
    return (sum(d) / len(d) if d else 0.0, len(d), a.size[0] * a.size[1])


out = []
cell = lambda name, ok, line: (out.append((name, ok, line)), print(f"{'PASS' if ok else 'FAIL'}  {name} · {line}"))

# the reference: the light coarse switch press on the pass-6 frames (the cured frame), per engine
ref = {}
if ref_dir:
    for eng in ("chromium", "webkit"):
        r = os.path.join(ref_dir, f"{ref_label}-{eng}-coarse-light-switch-rest.png")
        if os.path.exists(r):
            ref[eng] = press_dl(r, r.replace("-rest.png", "-pressed.png"))
            print(f"REF   pass-6 light coarse switch press ({eng}, {ref_label}): mean |ΔL| {ref[eng][0]:.4f} over {ref[eng][1]} px")

for idx in sorted(glob.glob(os.path.join(gdir, f"{label}-index-*.json"))):
    rows = json.load(open(idx))
    for row in rows:
        eng, ptr, th, sc = row["engine"], row["pointer"], row["theme"], row["scene"]
        sh = row["shots"]
        if sc == "button" and "committed" in sh:
            s1, sp = sh["committed"].get("s"), sh.get("pressed", {}).get("s")
            ok = s1 is not None and s1 >= 1.050 and (sp is None or s1 > sp)
            cell(f"CK-25 button committed still {eng} {ptr} {th}", ok, f"committed ×{s1:.4f}, pressed ×{(sp or 0):.4f}, commit {row.get('commit', {}).get('s0')} → {row.get('commit', {}).get('s1')} (bound: ≥ ×1.050, the legible Switch commit, and above its pressed frame) · {sh['committed']['file']}")
        if sc == "switch" and ptr == "coarse" and "pressed" in sh:
            fr = os.path.join(gdir, "frames")
            r = press_dl(os.path.join(fr, sh["rest"]["file"]), os.path.join(fr, sh["pressed"]["file"]))
            if r is None: cell(f"CK-25 switch coarse press {eng} {th}", False, "frames differ in size"); continue
            bound = ref.get(eng, (None,))[0]
            ok = bound is not None and r[0] >= bound
            cell(f"CK-25 switch coarse press {eng} {th}", ok, f"mean |ΔL| {r[0]:.4f} over {r[1]} px of {r[2]} (bound: ≥ {bound if bound is None else round(bound, 4)}, the pass-6 light press read as cured) · {sh['pressed']['file']}")
n_f = sum(1 for _, ok, _ in out if not ok)
print(f"a7-glance {label}: {'PASS' if out and not n_f else 'FAIL'} · {len(out) - n_f} pass, {n_f} fail")
sys.exit(0 if out and not n_f else 1)

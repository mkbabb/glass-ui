#!/usr/bin/env python3
"""C-E7's own plants (CK-27: each half of E7's clip construction must be failable alone).
  clipOnly  the clip removed (writeClip does nothing), position-visibility: always kept: the promoted control is never
            dropped but paints over its card (must FAIL the painted-outside bound, not the step bound)
  pvOnly    position-visibility: always removed, the clip kept: the UA's anchors-visible drops the whole control when the
            last pixel of its anchor leaves (must FAIL the adjacent-step bound, if the clip alone does not hide it first)
"""
import os, shutil, sys
STAGE = "src/composables/motion/engage/stage.ts"
STAGE_CSS = "src/styles/glass/engage-stage.css"
PLANTS = {
    "clipOnly": [(STAGE, "function writeClip(h: Holder): void {\n    if (!h.footprint) return;", "function writeClip(h: Holder): void {\n    return; // PLANT clipOnly\n    if (!h.footprint) return;")],
    "pvOnly": [(STAGE_CSS, "    position-visibility: always;\n", "")],
}
plant, op, wt = sys.argv[1], sys.argv[2], sys.argv[3]
keep = os.path.join(wt, ".ce7plant", plant)
files = sorted({f for f, _, _ in PLANTS[plant]})
if op == "apply":
    os.makedirs(keep, exist_ok=True)
    for f in files: shutil.copy2(os.path.join(wt, f), os.path.join(keep, f.replace("/", "__")))
    for f, a, b in PLANTS[plant]:
        p = os.path.join(wt, f); s = open(p).read()
        if s.count(a) != 1: sys.exit(f"plant {plant}: anchor not found once in {f}")
        open(p, "w").write(s.replace(a, b))
    print(f"plant {plant} applied to {', '.join(files)}")
else:
    for f in files: shutil.copy2(os.path.join(keep, f.replace("/", "__")), os.path.join(wt, f))
    shutil.rmtree(keep); print(f"plant {plant} reverted")

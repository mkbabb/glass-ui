#!/usr/bin/env python3
# P-E10 library plants, each one edit to the candidate (run in the worktree at HEAD + P-E10.patch). `plants.py <worktree> <plant>`:
#   swap         the side changes with no travel (CK-20: the pass-9 shape, on the cured correction)
#   owed         the correction closes the travel each frame (nothing is left owed): the travel never paints
#   nohyst       the side has no band: back above at the line itself
#   fixed        the side is fixed at the first lay: a hold reaching the line carries the lens out of the viewport
#   fast         the travel plays at 3× its row's clock
#   zero         the correction is zeroed on the frame of the change, read again the next (the anchor leaves a 40 px gap, so it exists in both engines)
#   reducetravel the side change travels under reduce
#   clock        the correction back inside `transform`, under the raise's `scale`, the anchor leaving a 40 px gap (so a correction exists in both engines)
#   exitfrozen   a lens on its exit clock is not re-laid on a scroll or a re-render (REPORT cell's control, §P9-7 item 5)
#   noread, nolens, loop: as pass-9/E9/plants.py, the same edits on these bytes
import sys
W, which = sys.argv[1], sys.argv[2]
ST = f"{W}/src/composables/motion/engage/stage.ts"; CSS = f"{W}/src/components/slider/styles.css"
TRAVEL = "        L.travel = glide(lens, 0, L.span);\n"
GAP = ("    position: fixed;\n    inset: auto;\n    margin: 0;\n", "    position: fixed;\n    inset: auto;\n    margin: 40px 0;\n")
E = {
  "swap": [(ST, TRAVEL, "")],
  "owed": [(ST, "    let owed = L.span * (1 - (L.travel?.effect?.getComputedTiming().progress ?? 1));\n", "    let owed = 0;\n")],
  "nohyst": [(ST, "const below = L.below ? room <= HOLD_SLOP_PX : room < 0;", "const below = room < 0;")],
  "fixed": [(ST, "const below = L.below ? room <= HOLD_SLOP_PX : room < 0;", "const below = L.written ? L.below : room < 0;")],
  "fast": [(ST, TRAVEL, TRAVEL + "        L.travel?.updatePlaybackRate(3);\n")],
  "zero": [(ST, "    const dy = round((below ? t.bottom - r.top : t.top - r.bottom) + owed);\n", "    if (turned) { L.dx = 0; L.dy = 0; }\n    const dy = turned ? 0 : round((below ? t.bottom - r.top : t.top - r.bottom) + owed);\n"),
           (ST, "    L.dx = round(L.dx + (t.left + t.width / 2 - (r.left + r.width / 2)));\n", "    if (!turned) L.dx = round(L.dx + (t.left + t.width / 2 - (r.left + r.width / 2)));\n"),
           (ST, "        L.span = painted - (r.top + r.height / 2 + dy);\n", "        L.span = 96;\n"),
           (CSS, *GAP)],
  "reducetravel": [(ST, "    if (Math.hypot(dx, dy) < 0.5 || reducedMotion()) return undefined;\n", "    if (Math.hypot(dx, dy) < 0.5) return undefined;\n")],
  "clock": [(CSS, "    translate: calc(-50% + var(--lens-dx, 0px)) var(--lens-dy, 0px);\n    scale: 0.13;\n    transform: scale(var(--lens-sx, 1), var(--lens-sy, 1));\n",
                  "    translate: -50% 0;\n    scale: 0.13;\n    transform: translate(var(--lens-dx, 0px), var(--lens-dy, 0px)) scale(var(--lens-sx, 1), var(--lens-sy, 1));\n"),
            (CSS, *GAP)],
  "exitfrozen": [(ST, "        glide(h.host, was.x - h.at.x, was.y - h.at.y);\n        if (!h.engaged) placeLens(h);\n", "        glide(h.host, was.x - h.at.x, was.y - h.at.y);\n"),
                 (ST, "        writeGeometry(h);\n        if (!h.engaged) placeLens(h);\n", "        writeGeometry(h);\n")],
  "noread": [(ST, "        sizes?.unobserve(h.host);\n        sizes?.observe(h.host);\n", "")],
  "nolens": [(ST, "function placeLens(h: Holder): void {\n", "function placeLens(h: Holder): void {\n    if (h) return;\n")],
  "loop": [(ST, "    if (![...holders.values()].some((x) => x.engaged)) stopFrames();\n", "")],
}
for p, old, new in E[which]:
    s = open(p).read(); assert s.count(old) == 1, (which, old); open(p, "w").write(s.replace(old, new))
print("plant", which)

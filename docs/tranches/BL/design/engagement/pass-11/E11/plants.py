#!/usr/bin/env python3
# P-E11 library plants, each one edit to the candidate (run in the worktree at HEAD + P-E11.patch). `plants.py <worktree> <plant>`:
#   nozoom     the frame reads no CSS zoom (frameOf's zoom term 1): every write in painted px again, the pass-10 shape (CK-20, E-10, E-13)
#   owedframe  the travel's owed remainder read in the lens's own px, not painted: one term out of the frame (C-E10 §1.2's remainder)
#   loudthrow  the row's easing checked for presence only, as P-E10 did: a refused easing reaches animate() (CK-21, E-11)
#   swap       the side changes with no travel (P-E10's, on these bytes)
#   fast       the travel at 3x its row's clock (P-E10's, on these bytes; H11's step over any 16.7 ms of real time)
#   clock      the correction back inside `transform`, the anchor leaving a 40 px gap (P-E10's, on these bytes; CK-25)
#   loop       the frame read never stops at release (P-E10's, on these bytes; O-103f (3))
import sys
W, which = sys.argv[1], sys.argv[2]
ST = f"{W}/src/composables/motion/engage/stage.ts"; CSS = f"{W}/src/components/slider/styles.css"
TRAVEL = "        L.travel = glide(lens, 0, L.span);\n"
GAP = ("    position: fixed;\n    inset: auto;\n    margin: 0;\n", "    position: fixed;\n    inset: auto;\n    margin: 40px 0;\n")
E = {
  "nozoom": [(ST, "    let x = el.currentCSSZoom;\n", "    let x = 1;\n"),
             (ST, "        const z = e.currentCSSZoom / el.currentCSSZoom;\n", "        const z = 1;\n")],
  "owedframe": [(ST, "    let owed = L.span * f.y * (1 - (", "    let owed = L.span * (1 - (")],
  "loudthrow": [(ST, '    const parsed = easing !== "" && CSS.supports("animation-timing-function", easing);\n', '    const parsed = easing !== "";\n')],
  "swap": [(ST, TRAVEL, "")],
  "fast": [(ST, TRAVEL, TRAVEL + "        L.travel?.updatePlaybackRate(3);\n")],
  "clock": [(CSS, "    translate: calc(-50% + var(--lens-dx, 0px)) var(--lens-dy, 0px);\n    scale: 0.13;\n    transform: scale(var(--lens-sx, 1), var(--lens-sy, 1));\n",
                  "    translate: -50% 0;\n    scale: 0.13;\n    transform: translate(var(--lens-dx, 0px), var(--lens-dy, 0px)) scale(var(--lens-sx, 1), var(--lens-sy, 1));\n"),
            (CSS, *GAP)],
  "loop": [(ST, "    if (![...holders.values()].some((x) => x.engaged)) stopFrames();\n", "")],
}
for p, old, new in E[which]:
    s = open(p).read(); assert s.count(old) == 1, (which, old); open(p, "w").write(s.replace(old, new))
print("plant", which)

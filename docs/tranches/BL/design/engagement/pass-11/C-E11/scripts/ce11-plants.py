#!/usr/bin/env python3
# C-E11 library plants, each one edit to the candidate (HEAD + P-E11.patch), written by this critic to test whether a cell separates one term of the
# frame left out. `ce11-plants.py <worktree> <plant>`:
#   sidezoom   the side test reads the lens's height without the subject's zoom (pass-10's mixed frame in the test alone)
#   spanframe  the travel's span stored in painted px, not the lens's px (one write out of the frame)
#   hostzoom   flowBox's zoom ratio dropped: the host's re-render glide in mixed px under a zoom between boxes
#   roomframe  writeGeometry's room read as P-E10 did (painted centre against the unzoomed width, not divided by the frame)
#   waapicure  CONTROL, not a plant: glide's parse asks the parser animate() itself uses (a KeyframeEffect timing), not CSS.supports on a
#              list-valued property, so an easing list is refused before animate() (proves the cause of the list counterexample)
#   unitcure   CONTROL, not a plant: rowClockMs reads a <time> in its own unit (ms or s), so a settle token written in ms is not read x1000
import sys
W, which = sys.argv[1], sys.argv[2]
ST = f"{W}/src/composables/motion/engage/stage.ts"; SE = f"{W}/src/composables/motion/engage/settle.ts"
E = {
 "waapicure": [('    const parsed = easing !== "" && CSS.supports("animation-timing-function", easing);\n', '    const parsed = easing !== "" && (() => { try { new KeyframeEffect(null, null, { easing }); return true; } catch { return false; } })();\n')],
 "unitcure": [("    const s = Number.parseFloat(getComputedStyle(el).getPropertyValue(token));\n", "    const raw = getComputedStyle(el).getPropertyValue(token).trim();\n    const s = Number.parseFloat(raw) / (/ms$/.test(raw) ? 1000 : 1);\n")],
 "sidezoom": [("    const room = t.top - lens.offsetHeight * s.y;\n", "    const room = t.top - lens.offsetHeight * (s.y / subject.currentCSSZoom);\n")],
 "spanframe": [("        L.span = round((painted - (r.top + r.height / 2 + dy)) / f.y);\n", "        L.span = round(painted - (r.top + r.height / 2 + dy));\n")],
 "hostzoom": [("        const z = e.currentCSSZoom / el.currentCSSZoom;\n", "        const z = 1;\n")],
 "roomframe": [("    const room = Math.max(0, Math.min(cx - (w * f) / 2, vw - (cx + (w * f) / 2))) / f;\n", "    const room = Math.max(0, Math.min(cx - w / 2, vw - (cx + w / 2)));\n")],
}
F = SE if which == "unitcure" else ST
s = open(F).read()
for a, b in E[which]:
    assert s.count(a) == 1, (which, a); s = s.replace(a, b)
open(F, "w").write(s); print("plant", which)

#!/usr/bin/env python3
# C-A10's two cure plants, each one edit to the candidate, to prove a cause rather than to propose bytes. `ca10-plants.py <worktree> <plant>`:
#   zoomcure  the lens's correction and its travel written in the lens's own CSS px: a painted px over `currentCSSZoom`, the room read at that zoom
#   loudcure  an easing the engine refuses is a loud unreadable token (one console.error naming it), no throw
import sys
W, which = sys.argv[1], sys.argv[2]
ST = f"{W}/src/composables/motion/engage/stage.ts"
E = {
 "zoomcure": [("    const room = t.top - lens.offsetHeight * s.y;\n", "    const z = (lens as unknown as { currentCSSZoom?: number }).currentCSSZoom ?? 1;\n    const room = t.top - lens.offsetHeight * z * s.y;\n"),
              ("    L.dx = round(L.dx + (t.left + t.width / 2 - (r.left + r.width / 2)));\n    L.dy = round(L.dy + dy);\n", "    L.dx = round(L.dx + (t.left + t.width / 2 - (r.left + r.width / 2)) / z);\n    L.dy = round(L.dy + dy / z);\n"),
              ("        L.travel = glide(lens, 0, L.span);\n", "        L.travel = glide(lens, 0, L.span / z);\n"),
              ("const painted = r.top + r.height / 2;\n", "const painted = r.top + r.height / 2;\n")],
 "loudcure": [("    if (!easing) loud(\"--spring-dock\", el);\n", "    if (!easing || !CSS.supports(\"animation-timing-function\", easing)) { loud(\"--spring-dock\", el); return undefined; }\n")],
}
s = open(ST).read()
for a, b in E[which]:
    assert s.count(a) == 1, a
    s = s.replace(a, b)
open(ST, "w").write(s); print("plant", which)

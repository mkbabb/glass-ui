#!/usr/bin/env python3
# C-E10's own edits to the candidate, each one edit (`plants.py <worktree> <name>`):
#   cure-zoom  the travel's offset written in the lens's own zoomed px: span ÷ the lens's effective CSS zoom (proves the cause of the zoom jump; not a proposal of record)
import sys
W, which = sys.argv[1], sys.argv[2]
ST = f"{W}/src/composables/motion/engage/stage.ts"
E = {
  "cure-zoom": [(ST, "        L.travel = glide(lens, 0, L.span);\n", "        L.travel = glide(lens, 0, L.span / ((lens as HTMLElement & { currentCSSZoom?: number }).currentCSSZoom ?? 1));\n")],
}
for p, old, new in E[which]:
    s = open(p).read(); assert s.count(old) == 1, (which, old); open(p, "w").write(s.replace(old, new))
print("plant", which)

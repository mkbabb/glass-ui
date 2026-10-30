#!/usr/bin/env python3
# P-E9 library plants, each one edit to the candidate's stage.ts (run in the worktree at HEAD + P-E9.patch):
#   noread  the per-frame read deleted (the frame re-observes nothing): the 16 stale-place cells' plant (O-103f (1))
#   nolens  the lens never laid (no correction, no painted scale, no below side): the loupe place/viewport cells' plant
#   loop    the frame loop kept to the exit clock's end (not stopped at release): e9-probe's loop cell's plant (O-103f (3))
import sys
W, which = sys.argv[1], sys.argv[2]
p = f"{W}/src/composables/motion/engage/stage.ts"; s = open(p).read()
edits = {
  "noread": ("        sizes?.unobserve(h.host);\n        sizes?.observe(h.host);\n", ""),
  "nolens": ("function placeLens(h: Holder): void {\n", "function placeLens(h: Holder): void {\n    if (h) return;\n"),
  "loop": ("    if (![...holders.values()].some((x) => x.engaged)) stopFrames();\n", ""),
}
old, new = edits[which]; assert s.count(old) == 1, which; open(p, "w").write(s.replace(old, new)); print("plant", which)

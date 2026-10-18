#!/usr/bin/env python3
# R-21 (b) on the minor v7: the two lines this seat read FALSE on the minor v7 (MS7-rulings.py FALSE; MINOR-SPLIT-v7.md
# §4.2), with proposed comment-only rewrites. NOT in minor-split-v7.patch, which is the minor v6 + R-23 exactly as ruled:
# this is a proposed delta on top of it (MS7-r21b-proposed.diff) for the critic, measured beside the minor v7 (DEL, the
# frozen list, the byte proof). Each old string must occur exactly once, and each edit keeps its line count.
#   python3 -I MS7-r21b-proposed.py <worktree holding the minor v7>
import sys, pathlib
W = pathlib.Path(sys.argv[1])
E = [
# DESIGN.md:34: false because of the minor's light law (the light rung is the --card pole at α >= the solved bound;
# the dark rung is the ink at 0.10-0.26)
("DESIGN.md",
"""2. **Surface tint (rgba background)** — the light-vs-dark admit-through. Light-mode and dark-mode tints differ; the dark-mode tint is denser to compensate for the lower contrast floor.
""",
"""2. **Surface tint (rgba background)** — the light-vs-dark admit-through. Light-mode and dark-mode tints differ: light paints the `--card` pole at or above the solved bound α (a cream frost, never an ink: O-62), and dark paints the warm near-black ink at its own rung α.
"""),
# surface-axis.css:21-22: 'the tint axis zeroed', in a sentence the minor's patch rewrote at :22; there is no tint axis
# (glass/ladder.css:165; this file's :79 as R-18 rewrote it)
("src/styles/glass/surface-axis.css",
"""               solid `--card` + `blur(0)` through the ONE level knob, the tint axis
               zeroed (a solid plate has no translucent backdrop to earn ink over).
""",
"""               solid `--card` + `blur(0)` through the ONE level knob, with no tint axis
               to zero (a solid plate has no translucent backdrop to earn ink over).
"""),
]
texts = {}
for f, old, new in E:
    t = texts.setdefault(f, (W / f).read_text())
    if t.count(old) != 1:
        print(f"REFUSED: {f}: old string occurs {t.count(old)} times"); sys.exit(4)
    texts[f] = t.replace(old, new)
for f, t in texts.items():
    if t.count("\n") != (W / f).read_text().count("\n"):
        print(f"REFUSED: {f}: line count moved"); sys.exit(4)
for f, t in texts.items():
    (W / f).write_text(t)
print(f"R-21 (b) proposed: {len(E)} edits in {len(texts)} files, each old string matched exactly once, line counts kept")

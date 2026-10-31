# edit-p11.py <useDockScene.ts>: the two pass-11 prose edits (REGISTRY §P10-7.3 item 1), comments only.
#   1. The header's "The seam." paragraph states the leaving-pair exemption as the code makes it true: the facing-pair
#      pass skips a pair whose two units both leave (`(u.m.exit && w.m.exit) … continue`), so two leaving units keep no
#      seam between them, because their fronts are the exchange's.
#   2. "(Q-18 (a))" comes out of the reduced-motion comment in the episode's trigger; the comment states its law alone.
# Fails loud if either old text is not there exactly once. Nothing outside a comment changes.
import sys

EDITS = [
    (
        """// The seam. A unit going out wipes from each side a unit arrives from: its front. The
// unit coming in stops one seam short of that front: `--dock-seam`, one glyph advance
// (`1ch`) of the wider of the two, and any two cut edges that face each other keep it too,
// the unit coming in giving way. Two faces never meet inside a glyph run, so no frame paints
// a false glyph ("Bools"). A unit cut inside the plate to less than its own seam paints nothing:
""",
        """// The seam. A unit going out wipes from each side a unit arrives from: its front. The
// unit coming in stops one seam short of that front: `--dock-seam`, one glyph advance
// (`1ch`) of the wider of the two, and any two cut edges that face each other keep it too,
// the unit coming in giving way. Two units going out keep no seam between them: their
// fronts are the exchange's. Two faces never meet inside a glyph run, so no frame paints
// a false glyph ("Bools"). A unit cut inside the plate to less than its own seam paints nothing:
""",
    ),
    (
        """        // Under reduced motion every lane has seated already: nothing moves, so no window
        // opens, and the write below lands the episode in this frame (Q-18 (a)).
""",
        """        // Under reduced motion every lane has seated already: nothing moves, so no window
        // opens, and the write below lands the episode in this frame.
""",
    ),
]
p = sys.argv[1]
s = open(p, encoding="utf8").read()
for old, new in EDITS:
    if s.count(old) != 1:
        sys.exit(f"old text found {s.count(old)} times: {old[:60]!r}")
    s = s.replace(old, new)
open(p, "w", encoding="utf8").write(s)
print("edited:", p)

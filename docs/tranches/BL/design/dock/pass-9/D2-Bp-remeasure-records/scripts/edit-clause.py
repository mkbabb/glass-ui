# edit-clause.py <useDockScene.ts>: the pass-9 header clause (REGISTRY §P8-7.3 step 1), prose only.
# The header's "The handoff." paragraph gains the far-side condition arm() enforces (`de > 0 ? undefined : heir`).
# Seven comment lines in, seven out; nothing outside the comment changes. Fails loud if the old text is not there once.
import sys

OLD = """// The handoff. Where a unit comes in on the very place a unit leaves (centred on it), the
// seam between them would cross both glyphs, and for as long as it did the place would
// show neither. So the leaving unit's two fronts close on the place's middle, each on half
// the sweep: it keeps the ink at its middle to its last frame and is cut below its seam no
// sooner than one front alone would cut it. On the frame it is cut, the unit coming in
// takes at once the part it gave up, and eases on from there. Every frame of the exchange
// shows one of the two on that place.
"""
NEW = """// The handoff. Where a unit comes in on the very place a unit leaves (centred on it), the
// seam between them would cross both glyphs, and for as long as it did the place would
// show neither. So, when nothing comes in on the leaving unit's far side, its two fronts
// close on the place's middle, each on half the sweep: it keeps the ink at its middle to
// its last frame and is cut below its seam no sooner than one front alone would cut it. On
// the frame it is cut, the unit coming in takes at once the part it gave up, and eases on
// from there. Every frame of the exchange shows one of the two on that place.
"""
p = sys.argv[1]
s = open(p, encoding="utf8").read()
if s.count(OLD) != 1:
    sys.exit(f"old paragraph found {s.count(OLD)} times")
open(p, "w", encoding="utf8").write(s.replace(OLD, NEW))
print("clause edited:", p)

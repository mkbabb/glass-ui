# FV10-seat-proposed.py · D3 pass 11, the floor v10 seat: a PROPOSED comment-only delta on floor v10 for this pass's
# critic and the agglomeration to rule (R-26, R-30). Not a build and not in floor-v10.patch (the build is R-28 and nothing
# else). It rewrites only the two printed lines the seat reads false on floor v10, each an exact substitution that occurs
# once, every file keeping its line count:
#   src/styles/tokens/property-regs.css:150-151  "each rung's α, held at the / bound (`--glass-bound`), with nothing
#       sampled from the backdrop. Level scales that α" -> "held at or / above the bound …, with nothing sampled. Level
#       scales the rung's 1 − α" (the floor's ladder: wash, floating, chassis, dock, crown at the bound; quiet, overlay,
#       sheet one step above; resting two; dialog 1, tokens/glass.css:278-290; and α = 1 − (1 − rung)·level,
#       glass/veil.css:64-72, so level scales 1 − α, R-24 (ii)'s reading)
#   src/components/_shared/feedback/feedback-tone.css:38  "the rung's alpha at the" -> "the rung's alpha at or above the"
# Usage: python3 -I FV10-seat-proposed.py <tree root>
import sys, pathlib
root = pathlib.Path(sys.argv[1])
EDITS = {
    "src/styles/tokens/property-regs.css": [
        ("   Legibility rides the SEPARATE `--glass-veil-*` axis: each rung's α, held at the\n"
         "   bound (`--glass-bound`), with nothing sampled from the backdrop. Level scales that α\n",
         "   Legibility rides the SEPARATE `--glass-veil-*` axis: each rung's α, held at or\n"
         "   above the bound (`--glass-bound`), with nothing sampled. Level scales the rung's 1 − α\n"),
    ],
    "src/components/_shared/feedback/feedback-tone.css": [
        ("tints ITS OWN rung: the rung's alpha at the\n",
         "tints ITS OWN rung: the rung's alpha at or above the\n"),
    ],
}
for rel, edits in EDITS.items():
    p = root / rel
    s = p.read_text()
    n0 = s.count("\n")
    for old, new in edits:
        c = s.count(old)
        if c != 1:
            sys.exit(f"{rel}: expected 1 match, found {c}: {old[:60]!r}")
        s = s.replace(old, new)
    if s.count("\n") != n0:
        sys.exit(f"{rel}: line count moved")
    p.write_text(s)
    print(f"{rel}: {len(edits)} edit(s), {n0} lines kept")

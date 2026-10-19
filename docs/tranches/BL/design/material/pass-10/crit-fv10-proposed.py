# crit-fv10-proposed.py · D3 pass-10 critic: a PROPOSED comment-only delta on floor v9 for the agglomeration to rule.
# Not a build and not in any patch. It rewrites only the printed lines the critic reads false (D3-critique.md §3), each
# edit an exact substitution that occurs once, every file keeping its line count:
#   icon-button.css:95, :104   "card-tinted" hover fill  -> the one-ink hover fill (sizing.css:201-204)
#   icon-button.css:118-120    "DARKEN ... glass-darken (..., a tier below resting) ... darken + shrink" -> the one-ink
#                              selected fill (sizing.css:256-259); FV9 §4.2's counterexample
#   sizing.css:256-257         "The press DARKEN ... a brief darken" -> FILL (the dark arm lifts: crit-press-dark.py)
#   overlay-plate.css:272-273  "paints the overlay rung at the bound" -> one step above it (tokens/glass.css:284)
# Usage: python3 -I crit-fv10-proposed.py <tree root>
import sys, pathlib
root = pathlib.Path(sys.argv[1])
EDITS = {
    "src/components/dock/styles/controls/icon-button.css": [
        ("surface, not a flat `--muted` plate: a translucent card-tinted fill is",
         "surface, not a flat `--muted` plate: a translucent one-ink fill is"),
        ("surface was the worst-offending double-light blowout; the card-tinted",
         "surface was the worst-offending double-light blowout; the one-ink"),
        ("/* The iOS press DARKEN-plus-shrink. Press lands the\n"
         "           glass-darken (`--dock-control-press-bg`, a tier below resting) alongside\n"
         "           the existing scale-press, so a tap reads \"darken + shrink\" (C4-INV-4 was",
         "/* The iOS press FILL-plus-shrink. Press lands the\n"
         "           one-ink selected fill (`--dock-control-press-bg`) alongside\n"
         "           the existing scale-press, so a tap reads \"fill + shrink\" (C4-INV-4 was"),
    ],
    "src/styles/tokens/sizing.css": [
        ("/* The press DARKEN, read on `:active` alongside the scale-press so a press lands a\n"
         "       brief darken rather than scaling alone.",
         "/* The press FILL, read on `:active` alongside the scale-press so a press lands a\n"
         "       brief fill rather than scaling alone."),
    ],
    "src/styles/glass/overlay-plate.css": [
        ("the veil already paints the overlay rung\n       at the bound, and",
         "the veil already paints the overlay rung\n       a step above the bound, and"),
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

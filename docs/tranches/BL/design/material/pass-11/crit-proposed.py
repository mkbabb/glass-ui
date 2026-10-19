# crit-proposed.py · D3 pass 11, the critic: PROPOSED comment-only deltas (R-21 (b), owner ruling O-103) for the one
# printed sentence the critic reads false in each tree, both in R-30's class (a value change falsifies a sentence that
# never names the changed token: the held rung gained a floor, `max(0.6 × rest, --glass-veil-floor)`).
#   --tree floor: src/styles/glass/grasp.css:132-133 (floor v10 and floor v10 + FV10-seat-proposed.diff). The dock is a
#       plate at the bound (shell.css:96-98 both tiers `--glass-veil-dock` = `--glass-bound`, tokens/glass.css:287), so
#       its held rung is max(0.6 × bound, bound) = bound: it sheds no ink. "runs the same 1 → 0.6 there and 'sheds 40% of
#       its ink' is a paint fact on BOTH shipped consumers" is false for the dock.
#   --tree minor: src/styles/glass/grasp.css:136-137 (the minor v9). Light floor = the bound (tokens/glass.css:154),
#       dark floor 0 (dark-arm.css:294): the dock keeps the bound in light and sheds 40 % in dark.
# Each edit is an exact substitution that occurs once; every file keeps its line count; no frozen word is added
# (harness/sweep-frozen.json: the new words carry none).
# Usage: python3 -I crit-proposed.py --tree floor|minor <tree root>
import sys, pathlib
kind, root = sys.argv[2], pathlib.Path(sys.argv[3])
OLD = ("       strength by the rung, so `rung ÷ rest` runs the same 1 → 0.6 there and \"sheds 40%\n"
       "       of its ink\" is a paint fact on BOTH shipped consumers rather than prose on one. */\n")
NEW = {
    "floor": ("       strength by the rung, so `rung ÷ rest` runs 1 → 0.6 there and the fill sheds 40%\n"
              "       of its strength in paint; the dock, a plate at the bound, keeps its α when held. */\n"),
    "minor": ("       strength by the rung, so `rung ÷ rest` runs 1 → 0.6 there and the fill sheds 40%\n"
              "       of its strength in paint; the dock keeps the bound in light and sheds 40% in dark. */\n"),
}[kind]
p = root / "src/styles/glass/grasp.css"
s = p.read_text(); n0 = s.count("\n"); c = s.count(OLD)
if c != 1: sys.exit(f"grasp.css: expected 1 match, found {c}")
s = s.replace(OLD, NEW)
if s.count("\n") != n0: sys.exit("grasp.css: line count moved")
p.write_text(s); print(f"grasp.css ({kind}): 1 edit, {n0} lines kept")

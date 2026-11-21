# markplant.py <tree-dir> <ref> apply|revert: RU-66's run-mark plant (RULINGS-7: "the mark's move removed, so the plate
# jumps"), applied to a `git archive` tree only, never the worktree: sync() paints the new destination at once instead of
# gliding to it. apply keeps the tree's file beside it (<file>.s8-orig), so a candidate tree's uncommitted file survives;
# revert puts it back (<ref> is kept for the call's form and no longer read).
import os, sys
T, ref, op = sys.argv[1:4]
F = "src/components/dock/composables/useDockRunMark.ts"
p = f"{T}/{F}"
if op == "apply":
    s = open(p).read()
    old = "        if (!start) {\n            paint(run, plate(run, next));"
    assert s.count(old) == 1, "plant site not found"
    open(p + ".s8-orig", "w").write(s)
    open(p, "w").write(s.replace(old, "        if (!start || true) {\n            paint(run, plate(run, next));"))
    print("applied")
else:
    os.replace(p + ".s8-orig", p)
    print("reverted")

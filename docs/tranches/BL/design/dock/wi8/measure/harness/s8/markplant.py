# markplant.py <tree-dir> <ref> apply|revert: RU-66's run-mark plant (RULINGS-7: "the mark's move removed, so the plate
# jumps"), applied to a `git archive` tree only, never the worktree: sync() paints the new destination at once instead of
# gliding to it. revert restores the file from <ref>.
import subprocess, sys
T, ref, op = sys.argv[1:4]
F = "src/components/dock/composables/useDockRunMark.ts"
p = f"{T}/{F}"
if op == "apply":
    s = open(p).read()
    old = "        if (!start) {\n            paint(run, plate(run, next));"
    assert s.count(old) == 1, "plant site not found"
    open(p, "w").write(s.replace(old, "        if (!start || true) {\n            paint(run, plate(run, next));"))
    print("applied")
else:
    W = "/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8"
    open(p, "w").write(subprocess.run(["git", "-C", W, "show", f"{ref}:{F}"], capture_output=True, text=True, check=True).stdout)
    print("reverted")

# foldplant.py <tree-dir> <ref> apply|revert: RU-79's plant (RULINGS-7: "the phone rule restored (RED: no fold at
# 1440)"), applied to a `git archive` tree only, never the worktree; revert restores the file from <ref>.
import subprocess, sys
T, ref, op = sys.argv[1:4]
W = "/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8"
F = "src/components/dock/ControlsDock.vue"
p = f"{T}/{F}"
if op == "apply":
    s = open(p).read()
    old = '    return count === 1 ? false : "closed";'
    assert s.count(old) == 1
    s = s.replace(old, '    return count === 1 ? false : typeof matchMedia === "function" && matchMedia("(max-width: 40rem)").matches ? "closed" : false;')
    open(p, "w").write(s); print("applied")
else:
    open(p, "w").write(subprocess.run(["git", "-C", W, "show", f"{ref}:{F}"], capture_output=True, text=True, check=True).stdout)
    print("reverted")

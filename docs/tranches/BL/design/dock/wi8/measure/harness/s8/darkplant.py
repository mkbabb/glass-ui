# darkplant.py <tree-dir> apply|revert: C7-3's plant, applied to a candidate tree only, never the worktree: the dark
# blur arm back to `.dark .glass-dock` alone, so a dock that carries `.dark` in a light document misses it (RED on
# level8's dock-dark-in-light cell). revert puts the selector pair back.
import sys
T, op = sys.argv[1:3]
p = f"{T}/src/components/dock/styles/shell.css"
s = open(p).read()
pair, one = "    .dark .glass-dock,\n    .glass-dock.dark {", "    .dark .glass-dock {"
if op == "apply":
    assert s.count(pair) == 1, "plant site not found"
    open(p, "w").write(s.replace(pair, one)); print("applied")
else:
    assert s.count(one) == 1 and s.count(pair) == 0, "revert site not found"
    open(p, "w").write(s.replace(one, pair)); print("reverted")

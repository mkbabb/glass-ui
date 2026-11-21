# fillstep.py <tree-dir> <current%> <hover%>: S4's fill union (RU-68 as amended for R7-5, R7-3, C7-M4). Writes the
# dock's current and hover steps into a candidate tree's dock.css (never the worktree's), so the tree's dev server serves
# them as the source would: `--dock-control-active-bg` and `--dock-control-hover-bg` on `.glass-dock`, each that
# percentage of the dock's ink. Prints the two lines it wrote.
import re, sys
T, cur, hov = sys.argv[1], sys.argv[2], sys.argv[3]
p = f"{T}/src/components/dock/styles/dock.css"
s = open(p).read()
pat = lambda tok: re.compile(r"(\n\s*" + tok + r": color-mix\(in oklab, var\(--dock-fg-on-aurora, var\(--foreground\)\) )[\d.]+(%, transparent\);)")
for tok, v in (("--dock-control-active-bg", cur), ("--dock-control-hover-bg", hov)):
    r = pat(tok)
    assert len(r.findall(s)) == 1, f"{tok}: site not found once"
    s = r.sub(lambda m: m.group(1) + v + m.group(2), s)
open(p, "w").write(s)
print(f"current {cur}% hover {hov}%")

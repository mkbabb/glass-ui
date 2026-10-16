# compare GAP.md table cells between two commits: which cells of which rows changed (sections 2 and 5), and the section-3 bullet labels
import subprocess, sys, re
def rows(rev):
    t = subprocess.run(["git", "show", f"{rev}:docs/tranches/BL/design/reference/apple-homeview/GAP.md"], capture_output=True, text=True, check=True).stdout
    out, sec = {}, None
    for l in t.split("\n"):
        m = re.match(r"^## (\d+)", l)
        if m: sec = m.group(1)
        if l.startswith("| ") and not l.startswith("|---"):
            c = [x.strip() for x in l.strip().strip("|").split(" | ")]
            out[(sec, c[0][:40])] = c
        if sec == "3" and l.startswith("- "):
            out[("3", l[:60])] = [l[:60], l]
    return out
a, b = rows(sys.argv[1]), rows(sys.argv[2])
for k in sorted(set(a) | set(b), key=str):
    if k not in a or k not in b: print("ADDED/REMOVED", k); continue
    if a[k] != b[k]:
        ch = [i for i in range(max(len(a[k]), len(b[k]))) if (a[k][i] if i < len(a[k]) else None) != (b[k][i] if i < len(b[k]) else None)]
        print("CHANGED", k, "cells", ch)

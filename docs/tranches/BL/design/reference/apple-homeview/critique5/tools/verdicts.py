"""CRITIQUE-5 K-8: the verdict cell of every §2 row (and §3's words) in two GAP versions; prints the rows whose verdict differs."""
import re, subprocess, sys
def rows(text):
    out = {}
    sec = text.split("## 2 · Property by property")[1].split("## 3 ·")[0]
    for l in sec.split("\n"):
        if not l.startswith("| "): continue
        c = [x.strip() for x in l.strip().strip("|").split(" | ")]
        if len(c) < 4 or c[0] in ("#", "Row", "---") or set(c[0]) <= set("-: "): continue
        out[c[0]] = c[3]
    return out
old = subprocess.run(["git", "show", sys.argv[1] + ":docs/tranches/BL/design/reference/apple-homeview/GAP.md"], capture_output=True, text=True, cwd=sys.argv[2]).stdout
new = open(sys.argv[3]).read()
a, b = rows(old), rows(new)
tag = lambda v: sorted(set(re.findall(r"\b(MATCH|EXCEED|SHORT|ABSENT)\b", re.sub(r"~~.*?~~", "", v))))
print("rows old/new", len(a), len(b))
for k in sorted(set(a) | set(b)):
    if tag(a.get(k, "")) != tag(b.get(k, "")) or (a.get(k) != b.get(k)):
        print(k, "| old", tag(a.get(k, "")), "| new", tag(b.get(k, "")), "| text changed" if a.get(k) != b.get(k) else "")

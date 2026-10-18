#!/usr/bin/env python3
# crit-undeclared.py · D3 pass 7, the critic: the identifiers my extractor finds absent from floor v6 and not declared
# (crit-records/declcheck.log), each classified by its removed-line context, and each searched in floor v6 by word form.
#   python3 -I crit-undeclared.py <patch> <tree> <name>...
import os, re, sys
patch, tree, names = sys.argv[1], sys.argv[2], sys.argv[3:]
ctx = {n: [] for n in names}; cur = None
for line in open(patch, encoding="utf8", errors="replace"):
    if line.startswith("diff --git"): cur = re.search(r" b/(\S+)", line).group(1)
    elif line.startswith("-") and not line.startswith("---"):
        for n in names:
            if re.search(r"(?<![A-Za-z0-9_-])" + re.escape(n) + r"(?![A-Za-z0-9_-])", line) and len(ctx[n]) < 2: ctx[n].append(f"{cur}: {line[1:].strip()[:150]}")
files = {}
for top in ("src", "demo"):
    for dp, _, fs in os.walk(os.path.join(tree, top)):
        for f in fs:
            if f.endswith((".ts", ".vue", ".css", ".js", ".md", ".json", ".html")):
                p = os.path.join(dp, f); files[os.path.relpath(p, tree)] = open(p, encoding="utf8", errors="replace").read()
SEP = r"(?:[\s*/#<>!\-_.]|//)*"
def words(n):
    out = []
    for p in re.split(r"[-_]+", n.lstrip("-")):
        out += re.findall(r"[A-Z]+(?=[A-Z][a-z])|[A-Z]?[a-z]+|[A-Z]+|\d+", p)
    return [w.lower() for w in out]
for n in names:
    ws = words(n); hits = []
    if len(ws) >= 2:
        pat = r"(?<![A-Za-z])" + SEP.join(re.escape(w) + r"[a-z]{0,4}" for w in ws) + r"(?![A-Za-z])"
        for f, s in files.items():
            for m in re.finditer(pat, s, re.I):
                ln = s.count("\n", 0, m.start()) + 1; line = s.splitlines()[ln - 1].strip()
                hits.append(f"{f}:{ln} «{line[:110]}»")
    print(f"== {n} · words {' '.join(ws)} · word-form hits in tree {len(hits)}")
    for c in ctx[n]: print(f"   removed: {c}")
    for h in hits[:6]: print(f"   HIT {h}")

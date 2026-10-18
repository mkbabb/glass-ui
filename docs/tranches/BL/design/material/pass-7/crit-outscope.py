#!/usr/bin/env python3
# crit-outscope.py · D3 pass 7, the critic: the declared names (seat's floor v6 declaration) in their word forms over the
# files DEL does not read: tests/, docs/ outside docs/tranches/, and the repo-root markdown, in the floor v6 worktree.
#   python3 -I crit-outscope.py <worktree> <declaration.json>
import json, os, re, sys
wt, declf = sys.argv[1:3]
decl = json.load(open(declf)); names = decl["names"]; exact = {e["name"] for e in decl.get("exact", [])}
SEP = r"(?:[\s*/#<>!\-_.]|//)*"
def words(n):
    out = []
    for p in re.split(r"[-_\s]+", re.sub(r"^data-", "", n.lstrip("-"))):
        out += re.findall(r"[A-Z]+(?=[A-Z][a-z])|[A-Z]?[a-z]+|[A-Z]+|\d+", p)
    return [w.lower() for w in out]
files = {}
roots = [os.path.join(wt, "tests")] + [os.path.join(wt, "docs", d) for d in os.listdir(os.path.join(wt, "docs")) if d != "tranches"]
for r in roots:
    if os.path.isfile(r): files[os.path.relpath(r, wt)] = open(r, errors="replace").read(); continue
    for dp, _, fs in os.walk(r):
        for f in fs:
            if f.endswith((".ts", ".md", ".vue", ".css", ".js", ".mjs", ".json")):
                p = os.path.join(dp, f); files[os.path.relpath(p, wt)] = open(p, errors="replace").read()
for f in os.listdir(wt):
    if f.endswith(".md"): files[f] = open(os.path.join(wt, f), errors="replace").read()
n_hits = 0
for n in names:
    ws = words(n); pats = [(re.escape(n), 0)]
    if len(ws) >= 2 and n not in exact: pats.append((r"(?<![A-Za-z])" + SEP.join(re.escape(w) + r"[a-z]{0,4}" for w in ws) + r"(?![A-Za-z])", re.I))
    for f, s in sorted(files.items()):
        for pat, fl in pats:
            for m in re.finditer(pat, s, fl):
                ln = s.count("\n", 0, m.start()) + 1; n_hits += 1
                print(f"{n} · {f}:{ln} · {s.splitlines()[ln-1].strip()[:150]}")
print(f"OUTSCOPE files={len(files)} hits={n_hits}")

# Critic 5: every JS export entry's static import closure, gzipped (closure.mjs), on the
# published 11.0.2 and 11.1.0 packages and on the tip's fresh dist; one line per entry
# whose closure moved from 11.1.0, largest first.   sizes.py <v11.0.2 root> <v11.1.0 root> <tip root>
import json, os, subprocess, sys
here = os.path.dirname(os.path.abspath(__file__))
def entries(root):
    ex = json.load(open(os.path.join(root, "package.json")))["exports"]
    out = {}
    for k, v in ex.items():
        f = v.get("import") if isinstance(v, dict) else v
        if isinstance(f, dict): f = f.get("default")
        if isinstance(f, str) and f.endswith(".js"): out[k] = f.replace("./dist/", "")
    return out
def sizes(root, ents):
    r = subprocess.run(["node", os.path.join(here, "closure.mjs"), os.path.join(root, "dist"), *sorted(set(ents.values()))], capture_output=True, text=True)
    return {d["entry"]: d.get("gz") for d in (json.loads(l) for l in r.stdout.split("\n") if l.strip())} if r.stdout else {}
roots = sys.argv[1:4]
ents = entries(roots[2])
s = [sizes(r, ents) for r in roots]
rows = []
for k, f in ents.items():
    a, b, c = (x.get(f) for x in s)
    rows.append((k, f, a, b, c, (c or 0) - (b or 0)))
rows.sort(key=lambda r: -abs(r[5]))
print(f"entries {len(rows)}")
for k, f, a, b, c, d in rows:
    print(f"{k:34s} {f:34s} 11.0.2={a} 11.1.0={b} tip={c} delta={d:+d}")

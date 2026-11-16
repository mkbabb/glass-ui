# Critic 1: every title's verdict in the four cells, v11.1.0 against the tip.
#   matrix.py > matrix.txt     R/G red on v11.1.0 and green on the tip; G/G green on both;
#   - skipped; other pairs are written v11.1.0/tip.
import json
cells = ["chromium-phone", "chromium-desktop", "webkit-phone", "webkit-desktop"]
def load(p):
    out = {}
    def walk(s):
        for sp in s.get("specs", []):
            for t in sp["tests"]:
                out[sp["title"]] = t["results"][-1]["status"] if t["results"] else "none"
        for c in s.get("suites", []): walk(c)
    for s in json.load(open(p))["suites"]: walk(s)
    return out
short = {"passed": "G", "failed": "R", "skipped": "-", "timedOut": "T"}
rows = {}; order = []
for c in cells:
    g = load(f"logs/wit-branch-{c}.json"); r = load(f"logs/wit-red-{c}.json")
    for k in g:
        if k not in rows: rows[k] = {}; order.append(k)
        a, b = short.get(r.get(k, "none"), "?"), short.get(g[k], "?")
        rows[k][c] = "-" if a == "-" and b == "-" else f"{a}/{b}"
print("title".ljust(84), " ".join(c.replace("chromium", "c").replace("webkit", "wk").ljust(10) for c in cells))
tally = {}
for k in order:
    v = [rows[k].get(c, "?") for c in cells]
    fam = k.split(" · ")[0]
    for x in v: tally.setdefault(fam, {}).setdefault(x, 0); tally[fam][x] += 1
    print(k[:84].ljust(84), " ".join(x.ljust(10) for x in v))
print()
for fam, t in tally.items(): print(fam.ljust(10), t)

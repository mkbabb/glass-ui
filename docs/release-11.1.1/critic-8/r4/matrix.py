# Critic 6 (after critic 3's): each witness cell on v11.1.0 and on the tip, per project, and why each v11.1.0
# cell failed (the first line of its error).   matrix.py [why]
import json, sys, re, os
L = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "logs")
P = ["chromium-phone", "chromium-desktop", "webkit-phone", "webkit-desktop"]
def read(tree, part, p):
    out = {}
    f = f"{L}/{tree}-{p}-{part}.json"
    if tree == "tip" and os.path.exists(f"{L}/{tree}-{p}-{part}b.json"): f = f"{L}/{tree}-{p}-{part}b.json"
    if not os.path.exists(f): return out
    def walk(s):
        for sp in s.get("specs", []):
            for t in sp["tests"]:
                res = t["results"][-1] if t["results"] else None
                st = res["status"] if res else "none"
                err = ""
                if res and res.get("errors"):
                    err = re.sub(r"\x1b\[[0-9;]*m", "", res["errors"][0].get("message", "")).split("\n")[0][:150]
                out[sp["title"]] = (st, err)
        for c in s.get("suites", []): walk(c)
    for s in json.load(open(f))["suites"]: walk(s)
    return out
code = {"passed": "G", "failed": "R", "skipped": "-", "timedOut": "T", "none": "?", "interrupted": "I"}
rows = {}
for p in P:
    for part in "0123":
        tip, red = read("tip", part, p), read("red", part, p)
        for title in tip:
            r = red.get(title, ("none", ""))
            rows.setdefault(title, {})[p] = (code.get(r[0], "?") + "/" + code.get(tip[title][0], "?"), r[1])
tally = {}
for title, cells in rows.items():
    line = " ".join(cells.get(p, ("   ", ""))[0].ljust(3) for p in P)
    print(line, "|", title)
    for p in P:
        c = cells.get(p)
        if c: tally[c[0]] = tally.get(c[0], 0) + 1
        if c and len(sys.argv) > 1 and c[0].startswith("R"): print("        ", p.ljust(17), c[1])
print(tally)

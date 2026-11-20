# Compare the e2e JSON reports: counts per tree and engine, and the failed title sets
# between the branch and v11.0.0.   python3 e2e-compare.py
import json, os
def load(p):
    if not os.path.exists(p): return None
    d = json.load(open(p)); out = {}
    def walk(s, path):
        for sp in s.get("specs", []):
            for t in sp.get("tests", []):
                st = t.get("status") or (t["results"][-1]["status"] if t.get("results") else "?")
                out[" > ".join(path + [sp["title"]])] = st
        for c in s.get("suites", []): walk(c, path + [c["title"]])
    for s in d.get("suites", []): walk(s, [])
    return out
for E in ["chromium", "webkit"]:
    b, v = load(f"e2e/{E}-branch.json"), load(f"e2e/{E}-v1100.json")
    for n, r in [("branch", b), ("v11.0.0", v)]:
        if r is None: print(E, n, "no report"); continue
        c = {}
        for s in r.values(): c[s] = c.get(s, 0) + 1
        print(E, n, len(r), "tests", c)
    if b and v:
        fb = {k for k, s in b.items() if s == "unexpected"}; fv = {k for k, s in v.items() if s == "unexpected"}
        print(E, "failed title sets identical:", fb == fv, "| only on branch:", sorted(fb - fv), "| only on v11.0.0:", sorted(fv - fb))
        print(E, "handmark:", {n: sum(1 for k, s in r.items() if "handmark" in k.lower() and s == "expected") for n, r in [("branch", b), ("v11.0.0", v)]})

# Side-by-side of the two trees' readings: python3 show.py <engine>
import json, sys
e = sys.argv[1]
g = {(c["item"], c["cell"]): c["detail"] for c in json.load(open(f"out/green-{e}.json"))["cells"]}
r = {(c["item"], c["cell"]): c["detail"] for c in json.load(open(f"out/red-{e}.json"))["cells"]}
for k in g:
    same = json.dumps(g[k], sort_keys=True) == json.dumps(r.get(k), sort_keys=True)
    print(("SAME " if same else "DIFF ") + " | ".join(k))
    if same: print("   both:", json.dumps(g[k])[:900])
    else:
        print("   branch :", json.dumps(g[k])[:1100]); print("   v11.0.0:", json.dumps(r.get(k))[:1100])

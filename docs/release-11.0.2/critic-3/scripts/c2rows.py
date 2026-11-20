# Prints, for a pixel-reader report, the status tally and every frame more than 1.5 px
# off a round end: cell, frame index, ms, scale, main and cross extent (CSS px), worst.
#   python3 c2rows.py <report.json>...
import json, sys
for f in sys.argv[1:]:
    d = json.load(open(f)); out = []; st = {}
    def walk(s):
        for sp in s.get("specs", []):
            for t in sp["tests"]:
                for r in t["results"]:
                    st[r["status"]] = st.get(r["status"], 0) + 1
                    for o in r.get("stdout", []):
                        tx = o.get("text", "")
                        if not tx.startswith("c2 "): continue
                        try: j = json.loads(tx[3:])
                        except ValueError: continue
                        for row in j.get("rows", []):
                            if isinstance(row.get("worst"), (int, float)) and abs(row["worst"]) > 1.5:
                                out.append((j["cell"], row["i"], row["t"], row["scale"], round(row["main"], 1), round(row["cross"], 1), row["worst"]))
        for c in s.get("suites", []): walk(c)
    for s in d["suites"]: walk(s)
    print(f, st)
    for o in out: print("   ", o)

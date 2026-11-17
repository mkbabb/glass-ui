# Fix seat 6: the first (unread) film and the read film of every turn cell in a report,
# side by side: the cadence of each (median and largest gap between samples).
#   unread.py <report>
import json, base64, sys, statistics
r = json.load(open(sys.argv[1]))
def walk(s, out):
    for sp in s.get("specs", []):
        for t in sp["tests"]:
            for res in t["results"]:
                atts = [(a["name"], json.loads(base64.b64decode(a["body"]))) for a in res.get("attachments", []) if "body" in a and a["name"] in ("unread", "turn")]
                if atts: out.append((sp["title"], t["projectName"] if "projectName" in t else "", res["status"], atts))
    for c in s.get("suites", []): walk(c, out)
rows = []
for s in r["suites"]: walk(s, rows)
def cad(fr):
    g = [fr[i + 1][0] - fr[i][0] for i in range(len(fr) - 1)]
    mv = [fr[i + 1][0] - fr[i][0] for i in range(len(fr) - 1) if fr[i + 1][1] != fr[i][1]]
    return f"all {statistics.median(g):.0f}/{max(g)} moving {statistics.median(mv) if mv else 0:.0f}/{max(mv) if mv else 0}"
for title, proj, st, atts in rows:
    if "reverse" not in title: continue
    print(f"{st:6s} {proj:16s} {title[:60]:60s} " + " || ".join(f"{n}: hole {a['hole']} {cad(a['frames'])}" for n, a in atts))

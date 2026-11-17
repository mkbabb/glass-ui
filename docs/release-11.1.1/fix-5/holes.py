import json, sys, base64
# holes.py <report.json>: for every turn/unread film, the longest gap from the turn frame to arrival
def walk(s, out):
    for sp in s.get("specs", []):
        for t in sp["tests"]:
            for r in t["results"]:
                for a in r.get("attachments", []):
                    if a["name"] in ("turn", "unread"):
                        b = json.loads(base64.b64decode(a["body"]).decode())
                        out.append((r.get("startTime",""), sp["title"], a["name"], b))
    for c in s.get("suites", []): walk(c, out)
out = []
for s in json.load(open(sys.argv[1]))["suites"]: walk(s, out)
out.sort(key=lambda x: x[0])
for st, title, name, b in out:
    fr = b["frames"]; ends_open = "reopened" in title or "press on a leaving" in title
    arr = next((i for i, (t, v) in enumerate(fr) if (v > 0.95 if ends_open else v < 0.02)), len(fr) - 1)
    gaps = [fr[i+1][0] - fr[i][0] for i in range(arr)]
    if b["hole"] > 33 or name == "unread":
        print(name, title[10:50], "hole(all)", b["hole"], "hole(turn..arrival)", max(gaps) if gaps else 0, "first", fr[:4])

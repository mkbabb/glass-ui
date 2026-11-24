# Critic 6: per run report, every reverse cell's films: how many were set aside as unread
# (a hole of more than two frames), the read film's hole and share, and the status.
#   unread.py <report>...
import json, base64, sys, os
for f in sys.argv[1:]:
    d = json.load(open(f)); rows = []
    def walk(s):
        for sp in s.get("specs", []):
            if not sp["title"].startswith("reverse"): continue
            for t in sp["tests"]:
                for r in t["results"]:
                    un = [json.loads(base64.b64decode(a["body"])) for a in r.get("attachments", []) if a["name"] == "unread" and "body" in a]
                    rd = [json.loads(base64.b64decode(a["body"])) for a in r.get("attachments", []) if a["name"] == "turn" and "body" in a]
                    rows.append((sp["title"][:62], r["status"][:4], len(un), [u["hole"] for u in un], [(x["hole"], x["share"], x["turnedAt"]) for x in rd]))
        for c in s.get("suites", []): walk(c)
    for s in d["suites"]: walk(s)
    held = sum(1 for r in rows if r[2]); print("==", os.path.basename(f), "reverse cells", len(rows), "with an unread film", held)
    for r in rows:
        if r[2] or r[1] != "pass" or "Accordion" in r[0] or "Collapsible" in r[0]: print("  ", r)

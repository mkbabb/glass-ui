#!/usr/bin/env python3
"""Fix seat 4: the form cells' films in short: verdict, exit frames, last frame (ms from
the input), and how many distinct fills, backdrops and forms the exit frames held.
Usage: form.py <report.json>..."""
import base64, json, sys


def walk(s):
    for sp in s.get("specs", []):
        for t in sp["tests"]:
            for r in t["results"]:
                yield sp["title"], t.get("projectName", ""), r
    for c in s.get("suites", []):
        yield from walk(c)


for path in sys.argv[1:]:
    rep = json.load(open(path))
    for s in rep["suites"]:
        for title, proj, r in walk(s):
            if not title.startswith("form · "):
                continue
            line = f"{r['status']:8} {proj:16} {title[7:]}"
            for a in r.get("attachments", []):
                if a["name"] == "film" and a.get("body"):
                    fr = json.loads(base64.b64decode(a["body"]))
                    if fr:
                        n = lambda k: len({f.get(k) for f in fr})
                        line += f" | {len(fr)} frames, last +{fr[-1]['t']} ms, fills {n('bg')}, backdrops {n('bf')}, forms {n('form')}"
            if r["status"] == "failed" and r.get("errors"):
                line += " | " + r["errors"][0].get("message", "").split("\n")[0][:150]
            print(line)

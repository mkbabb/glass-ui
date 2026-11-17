#!/usr/bin/env python3
"""Fix seat 4: each test's verdict and its attached readings from a PI_REPORT json.
Usage: att.py <report.json> [attachment name filter] [max chars per attachment]"""
import base64, json, sys

rep = json.load(open(sys.argv[1]))
want = sys.argv[2] if len(sys.argv) > 2 else ""
cut = int(sys.argv[3]) if len(sys.argv) > 3 else 400


def walk(s):
    for sp in s.get("specs", []):
        for t in sp["tests"]:
            for r in t["results"]:
                yield sp["title"], t.get("projectName", ""), r
    for c in s.get("suites", []):
        yield from walk(c)


for s in rep["suites"]:
    for title, proj, r in walk(s):
        print(f"{r['status']:8} {proj} {title}")
        for a in r.get("attachments", []):
            if want and a["name"] != want:
                continue
            body = a.get("body")
            if body:
                txt = base64.b64decode(body).decode()
                print("   ", a["name"], txt[:cut])
        if r["status"] != "passed" and r.get("errors"):
            print("    ERR", r["errors"][0].get("message", "")[:cut].replace("\n", " "))

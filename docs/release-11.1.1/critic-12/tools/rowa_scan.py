# Critic 10: every recorded run of row A's tap cell in its current form (taps that carry
# `aimed`) under docs/release-11.1.1, with the taps counted as aimed that missed the button.
#   rowa_scan.py <docs/release-11.1.1>
import json, base64, os, sys
root = sys.argv[1]; cells = taps = late = 0; bad = []; runs = []
for d, _, fs in os.walk(root):
    for f in fs:
        if not f.endswith(".json"): continue
        p = os.path.join(d, f)
        try: t = open(p).read()
        except Exception: continue
        if "rises into place at its rung" not in t: continue
        try: r = json.loads(t)
        except Exception: continue
        def walk(s):
            global cells, taps, late
            for sp in s.get("specs", []):
                if "rises into place at its rung" not in sp["title"]: continue
                for tt in sp["tests"]:
                    for res in tt["results"]:
                        for a in res.get("attachments", []):
                            if a.get("name") != "sheet" or "body" not in a: continue
                            ts = json.loads(base64.b64decode(a["body"])).get("taps", [])
                            if not ts or "aimed" not in ts[0]: continue
                            cells += 1; runs.append((os.path.relpath(p, root), tt.get("projectName"), res["status"]))
                            for x in ts:
                                taps += 1
                                if not x["aimed"]: late += 1
                                elif not x["hit"]: bad.append((os.path.relpath(p, root), tt.get("projectName"), res["status"], x))
        for s in r.get("suites", []): walk(s)
print(f"cells {cells}, taps {taps}, late {late}, aimed but missed {len(bad)}")
for x in sorted(runs): print("  run", *x)
for b in bad: print("  missed", *b)

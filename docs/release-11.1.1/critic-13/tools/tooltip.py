# Critic 11: the tooltip probe's films (probe-tip/tooltip.probe.ts): per film, the entrance from
# the first mounted frame to rest and the exit from the first closed frame, as t, state, scale,
# opacity, box.   tooltip.py <report>...
import json, base64, sys, os
for path in sys.argv[1:]:
    r = json.load(open(path))
    def walk(s):
        for sp in s.get("specs", []):
            for t in sp["tests"]:
                for res in t["results"]:
                    for a in res.get("attachments", []):
                        if a.get("name") != "tooltip": continue
                        films = json.loads(base64.b64decode(a["body"]))
                        for k, fr in enumerate(films):
                            m = [f for f in fr if f.get("present", True) and "state" in f]
                            if not m: print(os.path.basename(path), k, "never mounted"); continue
                            ent = m[:14]
                            closed = [f for f in m if f["state"] == "closed"]
                            print(f"== {os.path.basename(path)} film {k}: {len(m)} mounted frames, reveal class {m[0]['cls']}")
                            print("   in :", [(f["t"], f["state"][:7], f["scale"], f["op"], f["w"], f["h"]) for f in ent])
                            print("   out:", [(f["t"], f["scale"], f["op"], f["w"], f["h"]) for f in closed[:12]])
        for c in s.get("suites", []): walk(c)
    for s in r["suites"]: walk(s)

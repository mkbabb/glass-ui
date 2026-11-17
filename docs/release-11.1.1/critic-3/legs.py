# Critic 3: the reduced-motion cells of a run report, one line each: every leg's count of
# fading frames, span in ms, box steps and ends, and the leave event's offset.
#   legs.py <report>...
import json, base64, sys, os

def legs(d, pre=""):
    out = []
    if isinstance(d, dict):
        if "fading" in d and "span" in d:
            out.append(f"{pre}fading={d['fading']} span={d['span']} boxSteps={d.get('boxSteps')} {d.get('from')}->{d.get('to')}" + (f" stepped={d['stepped']}" if d.get("stepped") else ""))
        else:
            for k, v in d.items():
                if isinstance(v, dict): out += legs(v, f"{pre}{k}.")
                elif k in ("leave", "travel", "duration", "clocks", "press", "release"): out.append(f"{pre}{k}={json.dumps(v)}")
    return out

for path in sys.argv[1:]:
    r = json.load(open(path))
    print("==", os.path.basename(path))
    def walk(s):
        for sp in s.get("specs", []):
            for t in sp["tests"]:
                res = t["results"][-1] if t["results"] else None
                st = res["status"] if res else "none"
                body = []
                for a in (res or {}).get("attachments", []):
                    if "body" not in a: continue
                    try: body += legs(json.loads(base64.b64decode(a["body"])))
                    except Exception: pass
                print(f"  {st[:4]} {sp['title'][:58].ljust(58)} " + " | ".join(body)[:520])
        for c in s.get("suites", []): walk(c)
    for s in r["suites"]: walk(s)

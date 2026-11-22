# Fix seat 12: the tooltip cells' readings, per report: each cell's status and first error
# line, and the size cell's attachment (first opacity, frames between, scale and box spread
# on each leg, filters, the first frames as [ms, opacity, scale, transform, w, h]).
#   tools_size.py <report>...
import json, base64, sys, os
for path in sys.argv[1:]:
    r = json.load(open(path))
    def walk(s):
        for sp in s.get("specs", []):
            for t in sp["tests"]:
                for res in t["results"]:
                    err = (res.get("error") or {}).get("message", "").split("\n")[0][:160]
                    print(f"{os.path.basename(path):18s} {res['status']:8s} {sp['title']}" + (f"  ERR {err}" if err else ""))
                    for a in res.get("attachments", []):
                        if a.get("name") != "size": continue
                        d = json.loads(base64.b64decode(a["body"]))
                        print(f"    firstOp {d['firstOp']} between {d['between']} gone {d['gone']}")
                        for leg in ("enter", "exit"):
                            z = d[leg]
                            print(f"    {leg}: frames {z['frames']} scale {z['scale']} box {z['box']} filters {z['filters']}")
                            print(f"      first {z['first'][:3]}")
        for c in s.get("suites", []): walk(c)
    for s in r["suites"]: walk(s)

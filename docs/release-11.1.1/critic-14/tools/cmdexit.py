# Critic 13 (copied by critic 14): the CommandDialog routes cells' exits, one line per film: frames mounted after the
# input, opacity monotone or not and its first and last values, the scale's range, the layout
# box's range, every filter seen, the painted box's top travel, the list mounted on every frame,
# and the largest opacity step between consecutive frames.   cmdexit.py <report>...
import json, sys, base64
for path in sys.argv[1:]:
    r = json.load(open(path))
    def walk(s, proj=None):
        for sp in s.get("specs", []):
            if "CommandDialog" not in sp["title"] or not sp["title"].startswith("routes"): continue
            for t in sp["tests"]:
                res = t["results"][-1]
                for a in res.get("attachments", []):
                    if a["name"] != "routes" or not a.get("body"): continue
                    d = json.loads(base64.b64decode(a["body"]))
                    after = [f for f in d.get("after", []) if f.get("present")]
                    if not after: continue
                    ops = [f["op"] for f in after]
                    mono = all(b <= a_ + 1e-6 for a_, b in zip(ops, ops[1:]))
                    sc = [float(str(f.get("scale", "1")).split()[0]) if f.get("scale") not in (None, "none") else 1.0 for f in after]
                    lh = sorted({f.get("lh") for f in after}); lw = sorted({f.get("lw") for f in after})
                    filt = sorted({f.get("filter") for f in after})
                    ys = [f["y"] for f in after]; y0 = d["rest"].get("y")
                    steps = max(abs(b - a_) for a_, b in zip(ops, ops[1:])) if len(ops) > 1 else 0
                    print(f'{path.split("/")[-1]:32} {sp["title"].split(" by ")[-1]:8} {res["status"]:7} frames {len(after):3} op {ops[0]:.3f}->{ops[-1]:.3f} mono {mono} maxstep {steps:.3f} scale {min(sc):.3f}..{max(sc):.3f} lw {lw} lh {lh} filter {filt} dy {min(ys)-y0:+.1f}..{max(ys)-y0:+.1f} list {all(f.get("also") for f in after)} share {d.get("share")}')
        for c in s.get("suites", []): walk(c)
    for s in r["suites"]: walk(s)

# inkstep.py [log-prefix]: S4's step choice (RU-94 as amended for R8-2, C8-M5, C8-M4, C8-M19), read from part H's ink9 logs
# (logs/m9-ink-h<h>-c<c>.<engine>.json: light level 1, dark 0.7; nav, action-row, canvas-tools, dials). Per step, engine
# and scheme: the words under 4.5 (a word on the warm field in dark is named under question 21's default and not RED when
# it reads no lower than v11.0.2's 3.26 there, C8-M19), the marks under the mark bound 1.2 (v11.0.2's floor beside), the
# hover against the dock (its ring) under 1.1, and hover against current. The current step is the weakest of 10, 12, 14 %
# whose words and marks hold, by the words and the mark bound alone; the hover the weaker of 5 and 6.5 % that reads 1.1
# against the dock (else 6.5 %). Chromium decides; WebKit is printed.
import json, os, sys
L = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "..", "logs")
P = sys.argv[1] if len(sys.argv) > 1 else "m9-ink-"
def load(h, c, e):
    f = os.path.join(L, f"{P}h{h}-c{c}.{e}.json")
    return json.load(open(f)) if os.path.exists(f) else None
def read(d, scheme):
    words, marks, hov, hvc = [], [], [], []
    for c in d["cells"]:
        if c["scheme"] != scheme: continue
        tag = f"{c['page']} {c['ground']} {c.get('posture','?').split(' ')[0]}"
        for w in c.get("all", []):
            if w.get("kind") == "text" and w["cr"] < 4.5:
                ex = c["ground"] == "field" and scheme == "dark" and w["cr"] >= 3.26
                words.append((tag, w["text"], w["cr"], "q21 default, not RED" if ex else "RED"))
        for m in c.get("marks", []):
            if m["mark"] < 1.2: marks.append((tag, m["name"], m["mark"], m.get("floor")))
        for h in c.get("hover", []):
            hv = h.get("hover") or {}
            if "againstGround" in hv:
                if hv["againstGround"] < 1.1: hov.append((tag, hv["name"], hv["againstGround"]))
                hvc.append(hv.get("againstCurrent"))
    return words, marks, hov, [x for x in hvc if x is not None]
for e in ("chromium", "webkit"):
    print(f"== {e}")
    for h, c in (("5", "10"), ("5", "12"), ("5", "14"), ("6.5", "10"), ("8", "10")):
        d = load(h, c, e)
        if not d: continue
        for sch in ("light", "dark"):
            w, m, hv, hc = read(d, sch)
            red = [x for x in w if x[3] == "RED"]
            print(f"  hover {h} current {c} {sch}: words<4.5 RED {len(red)} {red[:3]} named {[x for x in w if x[3] != 'RED'][:2]}; marks<1.2 {len(m)} {m[:4]}; hover<1.1 {len(hv)} {hv[:4]}; hover v current min {min(hc) if hc else None}")

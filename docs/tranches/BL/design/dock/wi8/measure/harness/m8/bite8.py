# bite8.py: MEASURE-8's resume (2026-11-18), each plant's reading against the build's on the same instrument, per engine.
# A plant bites in an engine when a clause its gate reads passes on the build and fails under the plant. Reads only logs:
#   g8-exempt, g8-trigger  m8-trig-plant8-<p>.<e>.json against m8-trig-build.<e>.json (the trigger clause, cell by cell)
#   g11-rest               m8-cost.plant8-g11.<e>.json against m8-cost.build.<e>.json (the rest clause; the trigger frames)
#   g13-tabsvg             m8-census-plant8-tabsvg.<e>.json against m8-census-build.<e>.json (the glyph line)
#   g15-baked, g15-onestep m8-ink-plant8-<p>.<e>.json against m8-ink-build.<e>.json on the plant's pages (nav, dials,
#                          action-row, loose): marks under their floor, hover reads under their bound, words under 4.5
# The seat-set, fade and memory plants are judged where they run (plantrun8.sh's judge, h9read.py).
# Usage: python3 m8/bite8.py [plant ...] > ../logs/m8-bite.txt
import json, os, sys
L = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "logs")
E = ("chromium", "webkit")
def load(n):
    p = os.path.join(L, n)
    return json.load(open(p)) if os.path.exists(p) and os.path.getsize(p) else None
def trig(p):
    for e in E:
        b, x = load(f"m8-trig-build.{e}.json"), load(f"m8-trig-plant8-{p}.{e}.json")
        if not x: print(f"{p} {e}: no reading"); continue
        bit = []
        for k, v in x["cells"].items():
            bv = b["cells"].get(k, {})
            if isinstance(v, dict) and "pass" in v and bv.get("pass") is True and v["pass"] is False:
                bit.append(f"{k} (closed {v.get('closed')}, dock open after {v.get('dockOpen')})")
        same_red = [k for k, v in x["cells"].items() if isinstance(v, dict) and v.get("pass") is False and b["cells"].get(k, {}).get("pass") is False]
        print(f"{p} {e}: {'BITES' if bit else 'does not bite'}: {len(bit)} cells pass on the build and fail under the plant: {'; '.join(bit) or '-'}; red on both: {', '.join(same_red) or '-'}")
def cost(p):
    for e in E:
        b, x = load(f"m8-cost.build.{e}.json"), load(f"m8-cost.plant8-g11.{e}.json")
        if not x: print(f"{p} {e}: no reading"); continue
        rb, rx = b["g11"].get("rest", {}), x["g11"].get("rest", {})
        busy = {k: v for k, v in rx.items() if v.get("rafCalls") or v.get("mutations") or v.get("runningAnimations")}
        calm = [k for k, v in rb.items() if not (v.get("rafCalls") or v.get("mutations") or v.get("runningAnimations"))]
        bit = [f"{k} rAF {v.get('rafCalls')} mutations {v.get('mutations')} animations {v.get('runningAnimations')}" for k, v in busy.items() if k in calm]
        print(f"{p} {e}: {'BITES' if bit else 'does not bite'} the rest clause: {'; '.join(bit) or '-'} (build at rest: {len(calm)} of {len(rb)} cells quiet)")
def census(p):
    for e in E:
        b, x = load(f"m8-census-build.{e}.json"), load(f"m8-census-plant8-tabsvg.{e}.json")
        if not x: print(f"{p} {e}: no reading"); continue
        g = lambda d: [s for s in d["bad"] if ": glyph " in s]
        gb, gx = g(b), g(x)
        vals = sorted({s.split(": ", 1)[1] for s in gx})
        print(f"{p} {e}: {'BITES' if gx and not gb else 'does not bite'} the glyph line: {len(gx)} reads fail under the plant against {len(gb)} on the build ({', '.join(vals)}); seat line {len(x['bad']) - len(gx)} against {len(b['bad']) - len(gb)}")
PAGES = {"nav", "dials", "action-row", "loose"}
def ink(p):
    for e in E:
        b, x = load(f"m8-ink-build.{e}.json"), load(f"m8-ink-plant8-{p}.{e}.json")
        if not x: print(f"{p} {e}: no reading"); continue
        def tally(d):
            t = {"text": [], "mark": [], "hover": [], "loose": []}
            for c in d["cells"]:
                if c["page"] not in PAGES: continue
                for f in c.get("fails", []):
                    if f.get("kind") == "text": t["text"].append(f"{c['page']} {c['scheme']} {f.get('text')} {f.get('cr')}")
                # ink8 prints each cell's failing marks, hovers and loose reads as strings ("mark Lin 1.2 < v11.0.2 1.3")
                for k, key in (("mark", "markFails"), ("hover", "hoverFails"), ("loose", "looseFails")):
                    for s in c.get(key, []) or []:
                        t[k].append(f"{c['page']} {c['ground']} {c['scheme']}: {s}")
            return t
        tb, tx = tally(b), tally(x)
        sb, sx = b.get("summary", {}), x.get("summary", {})
        parts = []
        for k in ("text", "mark", "hover", "loose"):
            parts.append(f"{k} {len(tx[k])} against {len(tb[k])}")
        bites = any(len(tx[k]) > len(tb[k]) for k in ("text", "mark", "hover", "loose"))
        print(f"{p} {e}: {'BITES' if bites else 'does not bite'} on nav, dials, action-row, loose: {'; '.join(parts)}; summary under the plant: {json.dumps({k: sx.get(k) for k in ('markFails', 'minMark', 'hoverFails', 'minHover', 'minText', 'looseFails')})}")
        for k in ("mark", "hover"):
            new = [s for s in tx[k] if s not in tb[k]]
            if new: print(f"   {k} failing under the plant only: {'; '.join(new[:12])}{' …' if len(new) > 12 else ''}")
RUN = {"g8-exempt": trig, "g8-trigger": trig, "g11-rest": cost, "g13-tabsvg": census, "g15-baked": ink, "g15-onestep": ink}
for p in sys.argv[1:] or RUN:
    RUN[p](p)

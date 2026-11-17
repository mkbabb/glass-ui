# ladder_read.py <logs-dir>: MEASURE-7 step 5, RU-57's ladder read from ink7's logs (m7-ink-ladder<rung>[-390].<engine>.json).
# Per rung and engine: G-15's ink (words 4.5:1, glyphs 3:1), the mark clause (each engine's v11.0.2 reading), the hover
# clause (1.2), and the plate against the field on every cell over the field, beside v11.0.2's reading on the same cell
# (m7-ink-base1102.<engine>.json) and level 0.4's (the rung). RU-57 as amended: G-15 excludes rungs; the default is the
# first rung from the glass end GREEN on ink whose plate reading is above v11.0.2's and below level 0.4's on every cell.
import json, sys, os
L = sys.argv[1]
RUNGS = ["today", "1", "085", "07", "055", "04"]
def load(n):
    try: return json.load(open(os.path.join(L, n)))
    except Exception: return None
def plates(d):
    out = {}
    for c in (d or {}).get("cells", []):
        if c.get("ground") != "field": continue
        for p in c.get("plate") or []:
            out[(c["page"], c["scheme"], c.get("posture"), p.get("dock"))] = p.get("plateVsField")
    return out
res = {}
for e in ("chromium", "webkit"):
    base = plates(load(f"m7-ink-base1102.{e}.json"))
    p04 = plates(load(f"m7-ink-ladder04.{e}.json"))
    for r in RUNGS:
        for w in ("", "-390"):
            d = load(f"m7-ink-ladder{r}{w}.{e}.json")
            if not d: print(f"{e} {r}{w}: not read"); continue
            s = d.get("summary", {})
            fails = sorted({f"{c['page']}:{f.get('text')}" for c in d["cells"] for f in c.get("fails", [])})
            marks = [m for c in d["cells"] for m in (c.get("markFails") or [])]
            hov = [m for c in d["cells"] for m in (c.get("hoverFails") or [])]
            pl = plates(d)
            below = [k for k, v in pl.items() if w == "" and k in base and v is not None and base[k] is not None and v <= base[k]]
            above = [k for k, v in pl.items() if w == "" and r != "04" and k in p04 and v is not None and p04[k] is not None and v >= p04[k]]
            dials = {f"{k[1]} {k[2]}": v for k, v in pl.items() if k[0] == "dials"}
            ink_green = s.get("failing", 1) == 0
            res[(e, r, w)] = dict(ink=ink_green, marks=len(marks), hover=len(hov), notAboveV1102=len(below), notBelow04=len(above))
            print(f"{e} {r}{w}: words/glyphs failing {s.get('failing')} (min text {s.get('minText')}, icon {s.get('minIcon')}) {' '.join(fails)[:160]} | mark fails {len(marks)} {marks[:2]} | hover fails {len(hov)} (min {s.get('minHover')}) | plate: dials {dials} | cells not above v11.0.2 {len(below)}, not below 0.4 {len(above)}")
print("\nRU-57's pick, from the glass end (both engines, 1440):")
for r in RUNGS[1:]:
    ok = all(res.get((e, r, ""), {}).get("ink") and res[(e, r, "")]["marks"] == 0 and res[(e, r, "")]["hover"] == 0 and res[(e, r, "")]["notAboveV1102"] == 0 and (r == "04" or res[(e, r, "")]["notBelow04"] == 0) for e in ("chromium", "webkit") if (e, r, "") in res)
    print(f"  level {r}: {'GREEN' if ok else 'excluded'} {[(e, res.get((e, r, ''))) for e in ('chromium', 'webkit')]}")

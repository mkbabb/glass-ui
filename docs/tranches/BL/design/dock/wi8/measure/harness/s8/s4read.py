# s4read.py [suffix | @tag cur hov]: S4's fill union, read (RU-68 as amended for R7-5, R7-3, C7-M3, C7-M4). For each step log
# logs/m8-ink-s8-s4-c<cur>h<hov>[-suffix].<engine>.json: the words on every current or pressed seat (a text run whose
# words are a mark's name in the same cell) against 4.5, every mark against its floor (ink8's markFails: each engine's
# v11.0.2 reading on the cell less 0.02, or 1.2 where the polarity flipped), every other text or icon failure, and the
# hover against its own ground (ink8's floor) and against current (1.2, printed). A mark whose fill reads within 0.01
# of its ground (no fill painted) is listed apart, with its colours. Per scheme, the weakest current step
# whose current words and marks all pass in both engines is printed; the hover is read on the step's runs.
import glob, json, os, re, sys
L = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "logs")
suf = sys.argv[1] if len(sys.argv) > 1 else ""
runs = {}
if suf.startswith("@"):
    # s4read.py @<tag> <cur> <hov>: one run per engine, logs/m8-ink-<tag>.<engine>.json, read as the step <cur>:<hov>.
    for eng in ("chromium", "webkit"):
        f = os.path.join(L, f"m8-ink-{suf[1:]}.{eng}.json")
        if os.path.exists(f):
            runs[(float(sys.argv[2]), float(sys.argv[3]), eng)] = json.load(open(f))
for f in [] if suf.startswith("@") else sorted(glob.glob(os.path.join(L, "m8-ink-s8-s4-c*h*.*.json"))):
    m = re.search(r"m8-ink-s8-s4-c([\d.]+)h([\d.]+)(-[\w-]+)?\.(chromium|webkit)\.json$", f)
    if not m or (m.group(3) or "") != (f"-{suf}" if suf else ""):
        continue
    runs[(float(m.group(1)), float(m.group(2)), m.group(4))] = json.load(open(f))
def read(d):
    r = {s: {"words": [], "marks": [], "other": [], "hoverGround": [], "hoverCurrent": [], "minHoverCur": None} for s in ("light", "dark")}
    for c in d["cells"]:
        s = c.get("scheme")
        if s not in r or "fails" not in c:
            continue
        names = {m["name"] for m in (c.get("marks") or [])}
        for f in c["fails"]:
            if f.get("unsettled") and f.get("steadyOp"):
                continue
            tag = f"{c['page']}/{c['ground']}/{f['text']} {f['cr']}"
            (r[s]["words"] if f["kind"] == "text" and f["text"] in names else r[s]["other"]).append(tag)
        for m in c.get("markFails") or []:
            r[s]["marks"].append(f"{c['page']}/{c['ground']}: {m}")
        for m in c.get("marks") or []:
            if m["mark"] < 1.01:
                r[s].setdefault("unpainted", []).append(f"{c['page']}/{c['ground']}/{m['name']} {m['fill']} on {m['ground']}")
        for h in c.get("hoverFails") or []:
            r[s]["hoverGround"].append(f"{c['page']}/{c['ground']}: {h}")
        for m in c.get("hover") or []:
            hv = m.get("hover")
            if hv and hv.get("againstCurrent") is not None:
                v = hv["againstCurrent"]
                r[s]["minHoverCur"] = v if r[s]["minHoverCur"] is None else min(r[s]["minHoverCur"], v)
                if v < 1.2:
                    r[s]["hoverCurrent"].append(f"{c['page']}/{c['ground']}/{hv['name']} {v}")
    return r
res = {}
for (cur, hov, eng), d in sorted(runs.items()):
    res[(cur, hov, eng)] = read(d)
    print(f"c{cur:g} h{hov:g} {eng}: cells {d['summary']['cells']}")
    for s in ("light", "dark"):
        x = res[(cur, hov, eng)][s]
        print(f"  {s}: current words fail {len(x['words'])} {x['words'][:6]}; marks fail {len(x['marks'])} {[m[:90] for m in x['marks'][:6]]}")
        if x.get("unpainted"): print(f"         no fill painted: {x['unpainted']}")
        print(f"         other fails {len(x['other'])} {x['other'][:6]}; hover/ground fail {len(x['hoverGround'])} {[h[:90] for h in x['hoverGround'][:6]]}; hover/current min {x['minHoverCur']} under 1.2: {x['hoverCurrent'][:6]}")
print()
for s in ("light", "dark"):
    ok = []
    for cur in sorted({k[0] for k in res}):
        engs = [k for k in res if k[0] == cur]
        if len({k[2] for k in engs}) < 2:
            continue
        if all(not res[k][s]["words"] and not res[k][s]["marks"] for k in engs):
            ok.append(cur)
    print(f"{s}: current steps holding words and marks in both engines: {ok or 'none'}; default (weakest): {min(ok) if ok else 'none'}")

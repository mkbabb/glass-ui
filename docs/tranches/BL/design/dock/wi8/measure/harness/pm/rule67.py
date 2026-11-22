# pm/rule67.py (part M: m8/rule67.py over the measure's plate logs, m8-plate-pm-q10*). rule67.py <logs-dir>: MEASURE-8 H6 (RU-67 as amended for C7-M1, C7-M8, C7-M9; ORCH-LINES-7 line 3). Applies RU-67's
# written rule to m8/plate8.mjs's readings (logs/m8-plate-pm-q10*.<engine>.json) and prints the table it reads from.
#   show-through: per dock and posture, the median of three reads (plate8); per rung and scheme, the median of those
#     over every page's docks on the grid ground (and their range);
#   clause 1: dark show-through at the rung, in both engines, no more than the light default's (level 1) on the light
#     grid in the same engine;
#   clause 2: every dark dock's plate against the warm field (median colour, the median of three reads) under 1.70, in
#     both engines (C7-M8: "H6 reads the whole rung again and applies 1.70 to the median");
#   today: if today's dark dock (v11.0.2's build) already meets clause 1 in both engines, the rule cannot see the
#     complaint: the default is the owner's from the strip, 0.7 standing until he picks;
#   else the first rung from the glass end (1, 0.85, 0.7, 0.55, 0.4) meeting both clauses in both engines; if none, the
#     firmest rung under 1.70, and question 10 says so.
import sys, json, glob, os, statistics as st
logs = sys.argv[1]
RUNGS = ["today", "1", "0.85", "0.7", "0.55", "0.4"]
def load(engine):
    rows = []
    for f in glob.glob(f"{logs}/m8-plate-pm-q10*.{engine}.json"):
        d = json.load(open(f))
        for c in d.get("cells", []):
            for r in c.get("docks", []):
                if r.get("posture") in (None, "did not open"): continue
                show = r.get("show")
                # a plate with no grid under it (the composition seats it on a card) is left out of the show-through
                over = None
                if c["ground"] == "grid":
                    au, ab = r.get("ampUnder"), r.get("ampBeside")
                    over = bool(au is not None and ab and au >= 0.5 * ab)
                    if not over: show = None
                rows.append({"page": c["page"], "ground": c["ground"], "scheme": c["scheme"], "rung": c["rung"], "dock": r["key"], "posture": r.get("postureAsked"), "show": show, "overGrid": over, "pvf": r.get("plateVsField"), "pvSpread": r.get("pvSpread"), "showSpread": r.get("showSpread")})
    return rows
out = []
P = lambda *a: out.append(" ".join(str(x) for x in a))
data = {e: load(e) for e in ("chromium", "webkit")}
summary = {}
for e, rows in data.items():
    P(f"## {e}")
    off = sorted({f'{x["page"]} {x["dock"]}' for x in rows if x["ground"] == "grid" and x["overGrid"] is False})
    P(f"left out of the show-through (no grid under the plate with the docks hidden): {', '.join(off) or 'none'}")
    P("show-through on the grid, the median over the docks and postures read at every rung, today's included [min to max] (n):")
    for scheme in ("dark", "light"):
        line = []
        # like with like: only the (page, dock, posture) read over the grid at every rung of this scheme
        keys = None
        for r in RUNGS:
            k = {(x["page"], x["dock"], x["posture"]) for x in rows if x["ground"] == "grid" and x["scheme"] == scheme and x["rung"] == r and x["show"] is not None}
            if k: keys = k if keys is None else keys & k
        keys = keys or set()
        for r in RUNGS:
            xs = [x["show"] for x in rows if x["ground"] == "grid" and x["scheme"] == scheme and x["rung"] == r and x["show"] is not None and (x["page"], x["dock"], x["posture"]) in keys]
            if xs:
                summary[(e, scheme, r, "show")] = st.median(xs)
                line.append(f"{r}: {st.median(xs):.3f} [{min(xs):.3f} to {max(xs):.3f}] ({len(xs)})")
            else:
                line.append(f"{r}: unread")
        P(f"  {scheme}: " + "; ".join(line))
    P("plate against the warm field in dark, each dock's median of three; the largest over every dock [the median] (n):")
    line = []
    for r in RUNGS:
        xs = [x["pvf"] for x in rows if x["ground"] == "field" and x["scheme"] == "dark" and x["rung"] == r and x["pvf"] is not None]
        if xs:
            summary[(e, "dark", r, "pvfmax")] = max(xs)
            worst = max((x for x in rows if x["ground"] == "field" and x["scheme"] == "dark" and x["rung"] == r and x["pvf"] is not None), key=lambda x: x["pvf"])
            line.append(f"{r}: {max(xs):.3f} ({worst['page']} {worst['dock']} {worst['posture']}) [{st.median(xs):.3f}] ({len(xs)})")
        else:
            line.append(f"{r}: unread")
    P("  " + "; ".join(line))
    sp = [x["pvSpread"] for x in rows if x["pvSpread"] is not None]
    ss = [x["showSpread"] for x in rows if x["showSpread"] is not None]
    if sp: P(f"spread of three reads: plate against field up to {max(sp):.3f} (median {st.median(sp):.3f}); show-through up to {max(ss):.3f} (median {st.median(ss):.3f})" if ss else "")
P("")
P("## RU-67's rule")
def get(e, s, r, k): return summary.get((e, s, r, k))
light1 = {e: get(e, "light", "1", "show") for e in data}
P(f"light default (level 1) on the light grid: " + ", ".join(f"{e} {v:.3f}" if v is not None else f"{e} unread" for e, v in light1.items()))
def c1(r): return all(get(e, "dark", r, "show") is not None and light1[e] is not None and get(e, "dark", r, "show") <= light1[e] for e in data)
def c2(r): return all(get(e, "dark", r, "pvfmax") is not None and get(e, "dark", r, "pvfmax") < 1.70 for e in data)
for r in RUNGS:
    P(f"  {r}: dark show-through " + ", ".join(f"{e} {get(e, 'dark', r, 'show'):.3f}" if get(e, 'dark', r, 'show') is not None else f"{e} unread" for e in data) + f" -> clause 1 {'met' if c1(r) else 'not met'}; plate against the warm field (largest) " + ", ".join(f"{e} {get(e, 'dark', r, 'pvfmax'):.3f}" if get(e, 'dark', r, 'pvfmax') is not None else f"{e} unread" for e in data) + f" -> clause 2 {'met' if c2(r) else 'not met'}")
if c1("today"):
    P("RESULT: today's dark dock already meets clause 1 in both engines: the rule cannot see the complaint; the dark default is the owner's from the strip, 0.7 standing until he picks")
    res = ("0.7", "the owner's pick from the strip (today's dock already meets clause 1); 0.7 stands")
else:
    pick = next((r for r in RUNGS[1:] if c1(r) and c2(r)), None)
    if pick:
        P(f"RESULT: the dark default is level {pick}, the first rung from the glass end meeting both clauses in both engines")
        res = (pick, "RU-67's rule on the grid ground (H6)")
    else:
        under = [r for r in RUNGS[1:] if c2(r)]
        firm = under[-1] if under else None
        P(f"RESULT: no rung meets both clauses; the firmest rung under 1.70 in both engines is {firm}; question 10 says so")
        res = (firm, "no rung meets both clauses: the firmest under 1.70")
txt = "\n".join(out)
print(txt)
open(f"{logs}/pm-rule67.txt", "w").write(txt + "\n")
json.dump({"dark": res[0], "why": res[1]}, open(f"{logs}/pm-rule67.json", "w"))

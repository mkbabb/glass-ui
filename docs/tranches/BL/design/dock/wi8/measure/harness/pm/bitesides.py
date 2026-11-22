#!/usr/bin/env python3
"""bitesides.py: MEASURE-8 part M, each side-cell plant's reading against the tip's on the same instrument, per engine.
A plant bites in an engine when a clause its gate reads passes on the tip and fails under the plant there. Reads logs only:
  g1-linger      clock2.pm-g1-linger.<e>.json, cell c (the fold after a visit), against clock2.pm.<e>.json
  g1-lift        m4-cells.pm-g1-lift.<e>.json (finger, tapseat, c390) against m4-cells.pm.<e>.json
  g7-provide     g7-pm-g7-provide.<e>.json against g7-pm.<e>.json, leaf by leaf
  g8-hold        g8-pm-g8-hold.<e>.json and m4-cells.pm-g8-hold.<e>.json (hoveresc, sheetout) against the tip's
  g8-exempt, g8-trigger, touchcure  m8-trig-pm-<p>.<e>.json against m8-trig-pm.<e>.json, cell by cell
  g11-rest       m8-cost.pm-g11-rest.<e>.json against m8-cost.pm.<e>.json (the rest clause)
  g13-box        g13-pm-g13-box.<e>.json against g13-pm.<e>.json, leaf by leaf
  g13-safe       m4-cells.pm-g13-safe.chromium.json (safearea) against the tip's
  g13-tabsvg, iconword  m8-census-pm-<p>.<e>.json against m8-census-pm.<e>.json (bad reads)
  facerule       s8-face-pm-facerule.<e>.json against s8-face-pm.<e>.json
  g13-trigseat, g4-groupframe  m7-adds-pm-<p>.<e>.json against m7-adds-pm.<e>.json (its bad lines)
  g14-fitmemory, g14-fitsibs  m7-fit-pm-<p>.<e>.json against m7-fit-pm.<e>.json (its bad lines)
  (the ink plants, g15-baked and g15-onestep, are not read here: their bites are pm-inkbite.txt's, by M3's reader;
   MEASURE-9 H4, RU-104: this reader's ink lines contradicted it and the tip's own marks)
  dark, fold, mark  s8-level-pm-dark, s8-fold-pm-fold, s8-mark-pm-mark against the tip's
Usage: bitesides.py <logs-dir> [plant ...]"""
import json, os, sys

L = sys.argv[1]
E = ("chromium", "webkit")


def load(n):
    p = os.path.join(L, n)
    try:
        return json.load(open(p)) if os.path.exists(p) and os.path.getsize(p) else None
    except Exception:
        return None


def leaves(x, pre=""):
    if isinstance(x, dict):
        for k, v in x.items():
            yield from leaves(v, f"{pre}.{k}" if pre else str(k))
    elif isinstance(x, list) and len(x) <= 40 and not all(isinstance(v, (int, float)) for v in x):
        for i, v in enumerate(x):
            yield from leaves(v, f"{pre}[{i}]")
    else:
        yield pre, x


SKIP = {"t", "time", "load", "at", "frames", "rows", "tag", "engine", "label", "tDown", "tUp", "visitMs", "renderer"}


def diff(a, b):
    """leaves of b that differ from a (numbers by more than 25, booleans and strings by value)"""
    A = dict(leaves(a or {}))
    out = []
    for k, v in leaves(b or {}):
        last = k.split(".")[-1].split("[")[0]
        if last in SKIP or ".events[" in k or k.startswith("events"):
            continue
        u = A.get(k, "<absent>")
        if isinstance(v, (int, float)) and isinstance(u, (int, float)) and not isinstance(v, bool) and not isinstance(u, bool):
            if abs(v - u) > 25:
                out.append(f"{k} {u} -> {v}")
        elif v != u:
            out.append(f"{k} {json.dumps(u)[:60]} -> {json.dumps(v)[:60]}")
    return out


def say(p, e, bit, detail):
    print(f"{p} {e}: {'BITES' if bit else 'does not bite'}: {detail}")


def leafplant(p, tipname, plantname, keys=None):
    for e in E:
        a, b = load(tipname.format(e=e)), load(plantname.format(e=e))
        if b is None:
            print(f"{p} {e}: no reading")
            continue
        if keys:
            a = {k: (a or {}).get(k) for k in keys}
            b = {k: b.get(k) for k in keys}
        d = diff(a, b)
        say(p, e, bool(d), f"{len(d)} leaves differ from the tip: " + "; ".join(d[:6]))


def allbad(x, field="bad", pre=""):
    """every entry of every list named <field>, at any depth, prefixed with its section"""
    out = []
    if isinstance(x, dict):
        for k, v in x.items():
            if k == field and isinstance(v, list):
                out += [f"{pre}{json.dumps(e) if not isinstance(e, str) else e}" for e in v]
            else:
                out += allbad(v, field, f"{pre}{k}: " if isinstance(v, dict) else pre)
    return out


def badlist(p, tipname, plantname, field="bad"):
    for e in E:
        a, b = load(tipname.format(e=e)), load(plantname.format(e=e))
        if b is None:
            print(f"{p} {e}: no reading")
            continue
        ta = set(allbad(a, field))
        tb = allbad(b, field)
        new = [x for x in tb if x not in ta]
        say(p, e, bool(new), f"{len(new)} bad lines the tip lacks (tip {len(ta)}, plant {len(tb)}): " + "; ".join(x[:110] for x in new[:4]))


def trig(p):
    for e in E:
        a, b = load(f"m8-trig-pm.{e}.json"), load(f"m8-trig-pm-{p}.{e}.json")
        if b is None:
            print(f"{p} {e}: no reading")
            continue
        bit, red = [], []
        for k, v in b.get("cells", {}).items():
            av = (a or {}).get("cells", {}).get(k, {})
            if isinstance(v, dict) and v.get("pass") is False:
                (bit if av.get("pass") is True else red).append(k)
        say(p, e, bool(bit), f"{len(bit)} cells pass on the tip and fail under the plant: {', '.join(bit) or '-'}; red on both: {', '.join(red) or '-'}")


def cost(p):
    for e in E:
        a, b = load(f"m8-cost.pm.{e}.json"), load(f"m8-cost.pm-g11-rest.{e}.json")
        if b is None:
            print(f"{p} {e}: no reading")
            continue
        def rest(x):
            r = ((x or {}).get("g11") or {}).get("rest") or {}
            loud = [f"{k} rAF {v.get('rafCalls')}" for k, v in r.items()
                    if (v.get("rafCalls") or 0) > 0 or (v.get("mutations") or 0) > 0 or (v.get("runningAnimations") or 0) > 0]
            return len(r), loud
        na, la = rest(a)
        nb, lb = rest(b)
        say(p, e, bool(lb) and not la, f"rest cells loud under the plant {len(lb)} of {nb} ({'; '.join(lb[:4])}); on the tip {len(la)} of {na}")


def ink(p):
    pages = {"nav", "rail", "figure-tools", "dials", "canvas-tools", "action-row", "loose"}
    for e in E:
        a, b = load(f"m8-ink-pm.{e}.json"), load(f"m8-ink-pm-{p}.{e}.json")
        if b is None:
            print(f"{p} {e}: no reading")
            continue
        def tally(x):
            marks = hover = words = 0
            for c in (x or {}).get("cells", []):
                if c.get("page") not in pages:
                    continue
                for s in c.get("seats", []) or []:
                    marks += 1 if s.get("markUnder") else 0
                    hover += 1 if s.get("hoverUnder") else 0
                    words += 1 if s.get("wordsUnder") else 0
            return marks, hover, words
        ta, tb = tally(a), tally(b)
        say(p, e, tb[0] > ta[0] or tb[1] > ta[1] or tb[2] > ta[2],
            f"marks under their floor {tb[0]} (tip {ta[0]}), hover under its bound {tb[1]} (tip {ta[1]}), words under 4.5 {tb[2]} (tip {ta[2]})")


R = {
    "g1-linger": lambda p: leafplant(p, "clock2.pm.{e}.json", "clock2.pm-g1-linger.{e}.json", ["c"]),
    "g1-lift": lambda p: leafplant(p, "m4-cells.pm.{e}.json", "m4-cells.pm-g1-lift.{e}.json", ["finger", "tapseat", "c390"]),
    "g7-provide": lambda p: leafplant(p, "g7-pm.{e}.json", "g7-pm-g7-provide.{e}.json"),
    "g8-hold": lambda p: (leafplant(p, "g8-pm.{e}.json", "g8-pm-g8-hold.{e}.json"),
                          leafplant(p + " (cells6)", "m4-cells.pm.{e}.json", "m4-cells.pm-g8-hold.{e}.json", ["hoveresc", "sheetout"])),
    "g8-exempt": trig, "g8-trigger": trig, "touchcure": trig,
    "g11-rest": cost,
    "g13-box": lambda p: leafplant(p, "g13-pm.{e}.json", "g13-pm-g13-box.{e}.json"),
    "g13-safe": lambda p: leafplant(p, "m4-cells.pm.{e}.json", "m4-cells.pm-g13-safe.{e}.json", ["safearea"]),
    "g13-tabsvg": lambda p: badlist(p, "m8-census-pm.{e}.json", "m8-census-pm-g13-tabsvg.{e}.json"),
    "iconword": lambda p: badlist(p, "m8-census-pm.{e}.json", "m8-census-pm-iconword.{e}.json"),
    "facerule": lambda p: badlist(p, "s8-face-pm.{e}.json", "s8-face-pm-facerule.{e}.json", "fails"),
    "g13-trigseat": lambda p: badlist(p, "m7-adds-pm.{e}.json", "m7-adds-pm-g13-trigseat.{e}.json"),
    "g4-groupframe": lambda p: badlist(p, "m7-adds-pm.{e}.json", "m7-adds-pm-g4-groupframe.{e}.json"),
    "g14-fitmemory": lambda p: badlist(p, "m7-fit-pm.{e}.json", "m7-fit-pm-g14-fitmemory.{e}.json"),
    "g14-fitsibs": lambda p: badlist(p, "m7-fit-pm.{e}.json", "m7-fit-pm-g14-fitsibs.{e}.json"),
    "dark": lambda p: badlist(p, "s8-level-pm.{e}.json", "s8-level-pm-dark.{e}.json", "fail"),
    "fold": lambda p: badlist(p, "s8-fold-pm.{e}.json", "s8-fold-pm-fold.{e}.json", "wrong"),
    "mark": lambda p: leafplant(p, "s8-mark-pm.{e}.json", "s8-mark-pm-mark.{e}.json"),
}
for p in sys.argv[2:] or list(R):
    R[p](p)

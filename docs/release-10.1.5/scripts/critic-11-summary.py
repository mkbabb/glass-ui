#!/usr/bin/env python3
# 10.1.5 critic round 11: one line per cell per engine per arm from critic-11/probe/<arm>/<project>/*.json.
#   python3 -I docs/release-10.1.5/scripts/critic-11-summary.py
import json, os, sys
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "critic-11", "probe")
def load(arm, proj, cell):
    p = os.path.join(R, arm, proj, cell + ".json")
    return json.load(open(p)) if os.path.exists(p) else None
for arm in ("branch", "v1014"):
    for proj in sorted(os.listdir(os.path.join(R, arm))):
        print(f"### {arm} / {proj}")
        d = load(arm, proj, "c11a")
        if d: print(" c11a", "uniform", sum(r["uniform"] for r in d), "/", len(d), "radii", sorted({"/".join(r["radii"]) for r in d}), "fullScroll", sorted({r.get("fullScroll") for r in d}, key=str))
        d = load(arm, proj, "c11b")
        if d: print(" c11b rest sw/cw", sorted({(r["rest"]["runs"][0]["sw"], r["rest"]["runs"][0]["cw"], r["rest"]["fits"]) for r in d}), "radii", sorted({"/".join(r["rest"]["radii"]) for r in d}))
        d = load(arm, proj, "c11c")
        if d:
            nat = [r for r in d if r.get("kind") != "fit-edge"]
            print(" c11c natural worst", max((r[k]["worst"] for r in nat for k in ("focus", "focusHover", "afterEscape") if r.get(k)), default=None), "cells", len(nat))
            for r in d:
                if r.get("kind") == "fit-edge":
                    fitting = [s for s in r["sweep"] if s["fits"]]
                    print(f"  edge {r['width']} {'c' if r['coarse'] else 'f'} edge={r['edge']} fitting-cuts first={[(s['firstRing'] or {}).get('worst') for s in fitting][:9]} end={[(s['endRing'] or {}).get('worst') for s in fitting][:9]}")
        d = load(arm, proj, "c11d")
        if d:
            for r in d: print(" c11d", "dark" if r["dark"] else "light", [(a["witness"], a["contrast"]["best"] if a.get("contrast") else None) for a in r["atoms"]])
        d = load(arm, proj, "c11e")
        if d: print(" c11e", sorted({(r["dark"], bool(r["ink"]), r["bg"][:22]) for r in d}))
        d = load(arm, proj, "c11f")
        if d: print(" c11f maxStep", sorted({r["maxStep"] for r in d}))
        d = load(arm, proj, "c11g")
        if d: print(" c11g", [(r["width"], r["read"]["w"]) for r in d])
        d = load(arm, proj, "c11h")
        if d: print(" c11h Ev", d[0].get("Ev"), [(r.get("stageH"), r.get("pad"), r.get("at"), r.get("dS1"), r.get("dPlate")) for r in d[1:]])
        d = load(arm, proj, "c11i")
        if d: print(" c11i", [(r["width"], r["before"]["sl"], r["after"]["sl"], r["after"]["fits"], r["after"]["sw"], r["after"]["cw"]) for r in d])

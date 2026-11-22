# rule67dock.py <logs-dir> <tag>: MEASURE-9 part H, item H6 (RU-93 as amended for C8-M3, R8-6). RU-67's rule read per
# dock from m8/plate8.mjs's grid readings (logs/m8-plate-<tag>.<engine>.json, the grid ground, both schemes, rungs 1 to
# 0.4), each engine printed, Chromium deciding (WebKit 2287 draws the plate without its blur: reported, never decisive):
#   - per dock and posture: the light show-through at level 1 and the dark show-through at each rung (pm/rule67.py's
#     filter: a plate with no grid under it, ampUnder under half ampBeside, is left out);
#   - the floor docks left out: a dock whose dark show-through does not fall as the level firms (at 0.4 no lower than
#     at 1 less 0.005) or whose light reading is at the instrument's floor (0.013 or under), each named with its numbers;
#   - clause 1 per dock: the dark show-through at the rung no more than the dock's own light reading at level 1;
#   - clause 2 per dock: the dark show-through at the rung at least half the dock's own light reading;
#   - beside them the medians over the docks the rule keeps (light, and dark per rung), and the rungs every kept dock meets.
import sys, json, os, statistics as st
L, tag = sys.argv[1], sys.argv[2]
RUNGS = ["1", "0.85", "0.7", "0.55", "0.4"]
for engine in ("chromium", "webkit"):
    f = os.path.join(L, f"m8-plate-{tag}.{engine}.json")
    if not os.path.exists(f): print(f"{engine}: no reading ({f})"); continue
    d = json.load(open(f))
    tab = {}
    for c in d.get("cells", []):
        if c.get("ground") != "grid": continue
        for r in c.get("docks", []):
            if r.get("posture") in (None, "did not open"): continue
            au, ab = r.get("ampUnder"), r.get("ampBeside")
            if not (au is not None and ab and au >= 0.5 * ab): continue
            k = (c["page"], r.get("key"), r.get("postureAsked"))
            tab.setdefault(k, {})[(c["scheme"], str(c["rung"]))] = r.get("show")
    print(f"== {engine} ({'decides' if engine == 'chromium' else 'reported, never decisive'})")
    print("dock, posture | light 1 | " + " | ".join(f"dark {r}" for r in RUNGS) + " | clause 1 at | clause 2 at")
    kept, left = [], []
    for k in sorted(tab):
        v = tab[k]; light = v.get(("light", "1")); dark = [v.get(("dark", r)) for r in RUNGS]
        if light is None or any(x is None for x in dark): left.append((k, "a rung unread", light, dark)); continue
        if light <= 0.013 or dark[-1] >= dark[0] - 0.005: left.append((k, "floor: show-through does not fall as the plate firms" if dark[-1] >= dark[0] - 0.005 else "floor: the light reading is at the instrument's floor", light, dark)); continue
        c1 = [r for r, x in zip(RUNGS, dark) if x <= light]
        c2 = [r for r, x in zip(RUNGS, dark) if x >= 0.5 * light]
        kept.append((k, light, dark, c1, c2))
        print(f"{k[0]} {k[1]} {k[2]} | {light:.3f} | " + " | ".join(f"{x:.3f}" for x in dark) + f" | {','.join(c1) or '-'} | {','.join(c2) or '-'}")
    for k, why, light, dark in left:
        print(f"left out: {k[0]} {k[1]} {k[2]}: {why} (light {light}, dark {dark})")
    if kept:
        print("medians over the kept docks: light 1 " + f"{st.median(x[1] for x in kept):.3f}; " + "; ".join(f"dark {r} {st.median(x[2][i] for x in kept):.3f}" for i, r in enumerate(RUNGS)))
        both = [r for r in RUNGS if all(r in x[3] and r in x[4] for x in kept)]
        c1all = [r for r in RUNGS if all(r in x[3] for x in kept)]
        c2all = [r for r in RUNGS if all(r in x[4] for x in kept)]
        print(f"rungs every kept dock meets: clause 1 {','.join(c1all) or 'none'}; clause 2 {','.join(c2all) or 'none'}; both {','.join(both) or 'none'}")
        for r in ("0.7",):
            i = RUNGS.index(r)
            print(f"at {r}: clause 1 fails on " + (", ".join(f"{x[0][0]} {x[0][2]} ({x[2][i]:.3f} > {x[1]:.3f})" for x in kept if r not in x[3]) or "none") + "; clause 2 fails on " + (", ".join(f"{x[0][0]} {x[0][2]} ({x[2][i]:.3f} < {0.5 * x[1]:.3f})" for x in kept if r not in x[4]) or "none"))

#!/usr/bin/env python3
"""10.1.6 critic 1: read out/critic-<tree>-<engine>.json and print
  1. the forced-colors Slider rows per tree (computed outline, changed pixels, ring ink),
  2. the plain (no forced colors) compare of v10.1.5 against the tip: every computed
     property of every Slider element, and the focused row's pixels,
  3. the other controls' focused diff per tree, flagging any that painted a change on
     v10.1.4 and paints none on the tip.
   python3 docs/release-10.1.6/critic-1/summarize.py <engine> [prefix]   (prefix: critic | controls)"""
import gzip, json, os, sys
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
E = sys.argv[1]
P = sys.argv[2] if len(sys.argv) > 2 else "critic"
T = {}
for t in ("v1014", "v1015", "tip"):
    f = os.path.join(D, f"{P}-{t}-{E}.json")
    T[t] = json.load(gzip.open(f + ".gz", "rt")) if os.path.exists(f + ".gz") else json.load(open(f)) if os.path.exists(f) else {}
print(f"== engine {E}")
for t, d in T.items():
    pe = [v for k, v in d.items() if k.startswith("pageerror")]
    print(f"-- {t}: {len(d)} records, {len(pe)} page errors {pe[:2]}")
print("\n1. forced colors, keyboard-focused Slider")
for t, d in T.items():
    for k, v in d.items():
        if not k.startswith("forced:"): continue
        x = v["diff"]
        print(f"{t:6} {k[7:]:11} {v['orientation']:10} fv={v['focusVisible']} track={v['track']['style']}/{v['track']['width']}/{v['track']['offset']}/{v['track']['color']} "
              f"thumb={v['thumb']['style']}/{v['thumb']['width']}/{v['thumb']['color']} thumbShadow={'none' if v['thumb']['shadow']=='none' else 'set'} trackShadow={'none' if v['track']['shadow']=='none' else 'set'} "
              f"changed={x['changed']} outside={x['outside']} bbox={x['bbox']} ink={x.get('ink')} under={x.get('under')}")
print("\n2. plain: v10.1.5 against the tip")
a, b = T["v1015"], T["tip"]
for k in sorted(k for k in b if k.startswith("plain:")):
    if k not in a: print(f"{k}: missing on v1015"); continue
    props = 0; diffs = []
    for el in sorted(set(a[k]["els"]) | set(b[k]["els"])):
        pa, pb = a[k]["els"].get(el, {}), b[k]["els"].get(el, {})
        for p in sorted(set(pa) | set(pb)):
            props += 1
            if pa.get(p) != pb.get(p): diffs.append((el, p, pa.get(p), pb.get(p)))
    print(f"{k[6:]:11} elements={len(b[k]['els'])} properties={props} differing={len(diffs)} pixels={'equal' if a[k]['png']==b[k]['png'] else 'DIFFER'} focusVisible={b[k]['focusVisible']}")
    for d in diffs[:8]: print("    ", d)
print("\n3. forced colors, other controls (changed pixels with focus)")
bad = 0
for k in sorted(k for k in T["tip"] if k.startswith("control:")):
    row = []
    for t in T:
        v = T[t].get(k)
        row.append(f"{t}={v['diff']['changed'] if v else '-'}({v['outline']['style'] if v else '-'})")
    lost = T["v1014"].get(k, {}).get("diff", {}).get("changed", 0) > 0 and T["tip"][k]["diff"]["changed"] == 0
    bad += lost
    print(f"{k[8:]:18} {' '.join(row)} active={T['tip'][k]['tag']}.{T['tip'][k]['cls'].split(' ')[0]} inRow={T['tip'][k]['inRow']} {'LOST' if lost else ''}")
print(f"controls that lost their mark between v10.1.4 and the tip: {bad}")

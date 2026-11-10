"""summ.py <probe json>: the fold-2 reads in one table: clickhold timing and focus, twocol error and lenses, shade, interrupt2 max step and overlap."""
import json, sys
for p in sys.argv[1:]:
    d = json.load(open(p)); c = d["cells"]; print("==", p.split("/")[-1], d.get("version"))
    for k, v in (c.get("clickhold") or {}).items():
        print(f"  clickhold {k:28} collapsed {v['collapsedAtMs']} ms | focus after click {v['clicked']['active']!r} | tab {v.get('tabbed')} | errs {len(v['errs'])}")
    for k, v in (c.get("twocol") or {}).items():
        print(f"  twocol {k} lenses {v['mount']['lenses']} appErrors {v['mount']['appErrors']} | {[e[:150] for e in v['errs'][:1]]}")
    for k, v in (c.get("shade") or {}).items():
        print(f"  shade {k:28} shadows {[r['name']+':'+str(r['bs']) for r in v['shadows']]} grads {len(v['grads'])} blurs {v['blurs']}")
    for k, v in (c.get("interrupt") or {}).items():
        t = v["tracks"]; s = {n: (t[n]["maxStep"], t[n]["maxStepPctOfTravel"], t[n]["maxStepFrame"]) for n in ("silL", "silR", "dockL", "dockR") if n in t}
        print(f"  interrupt {k:44} {s} overlap {v['shareOverlapMax']} pct/ell/own {v['pct']}/{v['ell']}/{v['ownClipPct']} outVis {v.get('outsideVisMaxPx')} errs {len(v['errs'])}")
    for k in c:
        if k.endswith("-error"): print("  PART ERROR", k, c[k][:200])

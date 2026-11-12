# w3sum.py <json>...: per W3 cell read (controls skipped): the witness verdict, the ruled verdict (an OWNER-BLOCKED cell whose
# only failure is `window` reads PASS when its Q-4 (c) branch holds), every failed check, the stub's first frame (glyph, share,
# edge, offset, ramp), splice/sliver frames, and the worst one-frame leaving drop (R2, bound 0.5) with its seat. Reading only.
import json, sys, os, collections
red = []; agg = collections.defaultdict(collections.Counter); r2 = {}
for f in sys.argv[1:]:
    try: cs = json.load(open(f))["cells"]
    except Exception as e: print("unreadable", f, e); continue
    tag = os.path.basename(f)[:-5]
    for c in cs:
        if "control" in c["cell"]: continue
        fl = c.get("failed") or []
        ruled = c["pass"] or (c.get("ownerBlocked") and set(fl) <= {"window"} and (c.get("window") or {}).get("q4c", {}).get("ok"))
        k = (tag.rsplit("-r", 1)[0], c["cell"]); a = agg[k]; a["reads"] += 1; a["ruledPASS" if ruled else "ruledFAIL"] += 1
        st = c.get("stub") or {}; sp = c.get("splice") or {}
        if st.get("stubFrames"): a["stub"] += 1
        if sp.get("spliceFrames"): a["splice"] += 1
        if sp.get("sliverFrames"): a["sliver"] += 1
        w = max(((r.get("vanish") or {}).get("drop") or 0, r["seat"]) for r in (c.get("leaving") or {}).get("rows", []) or [(0, 0)]) if (c.get("leaving") or {}).get("rows") else (0, None)
        if k not in r2 or w[0] > r2[k][0]: r2[k] = (w[0], w[1], c.get("load"), tag)
        if fl and not ruled or st.get("stubFrames") or sp.get("spliceFrames"):
            red.append((tag, c["cell"], "PASS" if c["pass"] else ("OB" if c.get("ownerBlocked") else "FAIL"), fl, c.get("load"), st.get("first"), st.get("rampPx"), sp.get("firstSplice")))
for k in sorted(agg): print(k, dict(agg[k]), "worst leaving drop %s seat %s load %s (%s)" % r2[k])
for x in red: print("  RED", x)

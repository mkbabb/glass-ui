# sum14.py <records dir>: the pass-14 re-measure's readings beside the rows (REGISTRY §P13-7.3 item 3). Reading only.
#   nb     the near-bound classes at A/B rate: per column, build and check, the reads red on that check / the reads, and every
#          red check's own `why` (its margin to its bound), with the cell's load
#   r2     the worst one-frame leaving drop (vanish, bound 0.5) per column, build and seat, over r2 / r2y / nb / ab: swap-long
#          seats 1 and 2, retarget·80 seat 1, and the column's worst; with the loads
#   swp    `swrev` in paint: splice frames per build and column, and at every splice frame the glyphs between the two edges
#          and across them with their painted shares
#   si     the display-frame probe: runs with an empty frame, the least ink
#   fmab   FM warm-expand / first-expand: reads with a hole or a stub
#   reds   every red check of every red W3 cell in every queue (controls skipped), with its why
import glob, json, re, sys, os, collections
R = sys.argv[1]; sec = set(sys.argv[2:]) or {"nb", "r2", "swp", "si", "fmab", "reds"}
def cells(f):
    try: return json.load(open(f))["cells"]
    except Exception: return None
def tag(f):
    m = re.search(r"-(chromium|webkit)-(light|dark)-(bp\d+)-r(\d+)\.json$", f); return m.groups() if m else None
def ruled(c):
    fl = c.get("failed") or []
    return c.get("pass") or (c.get("ownerBlocked") and set(fl) <= {"window"} and (c.get("window") or {}).get("q4c", {}).get("ok"))
if "nb" in sec:
    print("== nb: near-bound classes at A/B rate (reads red on the check / reads), bp13 vs bp12")
    agg = collections.defaultdict(collections.Counter); why = []
    for f in sorted(glob.glob(R + "/nb/w3nb-*.json")):
        k = tag(f); cs = cells(f)
        if not k or cs is None: print("unreadable", f); continue
        e, t, b, r = k
        for c in cs:
            if "control" in c["cell"]: continue
            a = agg[(e, t, c["cell"], b)]; a["reads"] += 1
            for x in c.get("failed") or []:
                a[x] += 1; why.append((e, t, b, r, c["cell"], x, c.get("load"), ((c.get(x) or {}).get("why") or "")[:260]))
    for k in sorted(agg): print(k, dict(agg[k]))
    for w in why: print("   ", w)
if "r2" in sec:
    print("== r2: worst leaving drop (vanish), bound 0.5")
    best = {}
    for d in ("r2", "r2y", "nb", "ab", "fe"):
        for f in sorted(glob.glob(R + "/%s/*.json" % d)):
            k = tag(f); cs = cells(f)
            if not k or cs is None: continue
            e, t, b, r = k
            for c in cs:
                if "control" in c["cell"]: continue
                for row in (c.get("leaving") or {}).get("rows") or []:
                    v = (row.get("vanish") or {}).get("drop") or 0
                    for kk in ((e, t, b, c["cell"], row["seat"]), (e, t, b, "ANY", None)):
                        n = best.setdefault(kk, [0, None, 0, []]); n[2] += 1; n[3].append(c.get("load"))
                        if v > n[0]: best[kk][0:2] = [v, (d, r, c["cell"], row["seat"], c.get("load"))]
    for kk in sorted(best, key=str):
        if kk[3] == "ANY" or (kk[3] == "swap-long" and kk[4] in (1, 2)) or (kk[3] == "retarget·80" and kk[4] == 1):
            v, at, n, ls = best[kk]; ls = [x for x in ls if x is not None]
            print(kk, "worst %.3f margin %.3f" % (v, 0.5 - v), "at", at, "n", n, "loads %s-%s" % (min(ls) if ls else "-", max(ls) if ls else "-"))
if "swp" in sec:
    print("== swp: swrev in paint (F2's arguments), splice frames and the glyph share between the facing edges")
    agg = collections.defaultdict(collections.Counter)
    for f in sorted(glob.glob(R + "/swp/*.json")):
        m = re.search(r"/(bp\d+)-(\w+)-(\w+)-r(\d+)\.json$", f)
        if not m: continue
        b, e, t, r = m.groups()
        try: j = json.load(open(f))
        except Exception: print("unreadable", f); continue
        for x in j["runs"]:
            a = agg[(e, t, b)]; a["reads"] += 1
            if x["splice"]["n"]: a["splice reads"] += 1
            a["splice frames"] += x["splice"]["n"]
            if x["splice"]["sliver"]: a["sliver"] += 1
            if x.get("stub") and x["stub"].get("n"): a["stub"] += 1; print("   STUB", (e, t, b, r), x["then"], x["stub"]["first"])
            for s in x["spliceFrames"]:
                btw = [g for g in s["glyphs"] if g["between"]]; acr = [g for g in s["glyphs"] if not g["between"]]
                cut = [g for g in s["glyphs"] if g["share"] is not None and 0.1 < g["share"] < 0.9 and g["op"] > 0.5]
                if any((g["share"] or 0) > 0.1 for g in btw): a["ink between"] += 1
                if cut: a["frames with a glyph 10-90 %"] += 1
                print("   SPLICE", (e, t, b, r), "then", x["then"], "run", x["run"], "load", x["load"], "+%s ms" % s["atMs"], "|".join(s["units"]), "gap", s["gapPx"], "edges", s["edgeA"], s["edgeB"], "dt", s["edgeFrameDtMs"],
                      "between:", ",".join('"%s"(%s)=%s' % (g["ch"], g["text"], g["share"]) for g in btw) or "none", "· across:", ",".join('"%s"(%s)=%s op %s' % (g["ch"], g["text"], g["share"], g["op"]) for g in acr) or "none")
    for k in sorted(agg): print(k, dict(agg[k]))
if "si" in sec:
    print("== si: display-frame probe")
    agg = collections.defaultdict(lambda: [0, 0, 9, None])
    for f in sorted(glob.glob(R + "/si/*.json")):
        m = re.search(r"/(bp\d+)-(\w+)-(\w+)-r(\d+)\.json$", f)
        if not m: continue
        b, e, t, r = m.groups()
        try: xs = json.load(open(f))
        except Exception: print("unreadable", f); continue
        for x in xs:
            a = agg[(e, t, b)]; a[0] += 1; a[1] += 1 if x.get("holeFrames") else 0
            if x.get("minInk") is not None and x["minInk"] < a[2]: a[2] = x["minInk"]; a[3] = (x["seq"], x.get("minAt"), x.get("load"))
    for k in sorted(agg): print(k, "runs %d with an empty frame %d least ink %s at %s" % tuple(agg[k]))
if "fmab" in sec:
    print("== fmab: FM warm-expand / first-expand")
    agg = collections.defaultdict(collections.Counter)
    for f in sorted(glob.glob(R + "/fmab/fm-*.json")):
        k = tag(f); cs = cells(f)
        if not k or cs is None: print("unreadable", f); continue
        e, t, b, r = k
        for c in cs:
            a = agg[(e, t, b)]; a["reads"] += 1
            if (c.get("hole") or {}).get("holeFrames"): a["hole"] += 1
            if (c.get("stub") or {}).get("stubFrames"): a["stub"] += 1
            if not c.get("pass"): a["red"] += 1; print("   RED", k, c["cell"], c.get("failed"), c.get("load"))
    for k in sorted(agg): print(k, dict(agg[k]))
if "reds" in sec:
    obw = collections.Counter()
    print("== reds: every red check of every red W3 cell in the queues (ruled = PASS when the only red is [window] and Q-4 (c) holds)")
    for d in ("rev", "ab", "cr", "nb", "r2", "r2y", "fe"):
        for f in sorted(glob.glob(R + "/%s/*.json" % d)):
            k = tag(f); cs = cells(f)
            if not k or cs is None: continue
            for c in cs:
                if "control" in c["cell"] or not c.get("failed"): continue
                if ruled(c): obw[(d, k[0], k[1], k[2])] += 1; continue
                print("  ", d, k, c["cell"], "ruled PASS" if ruled(c) else ("OWNER-BLOCKED" if c.get("ownerBlocked") else "FAIL"), c["failed"], "load", c.get("load"))
                for x in c["failed"]: print("       [%s] %s" % (x, ((c.get(x) or {}).get("why") or "")[:300]))
    print("   OWNER-BLOCKED on [window] alone, Q-4 (c) PASS (ruled PASS), per queue/column/build:"); [print("     ", k, obw[k]) for k in sorted(obw)]

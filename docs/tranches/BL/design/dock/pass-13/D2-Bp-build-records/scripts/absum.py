# absum.py <records dir>: the A/B readings of §P12c-7.3 item 5, bp13 against bp12 (rules (a)-(d); swrev beside the rows).
#   ab     W3 retarget·40/80/120: splice / sliver / stub reads per build and column; every failed check of every red cell
#   cr     W3 content-remove: every gap (ms from the extent's landing to the flag's close), late = gap > 2F + 0.5, verdicts
#   rev    W3 reversal: every stub read with its glyph, edge, offset and ramp width; every failed check
#   swrev  swrev.mjs --at 40 --then 0,16,32,64: splice reads with units, gap and offset
# Reading only. Each W3 JSON is the witness's own (w3-morph.mjs), copied by the queue line.
import glob, json, re, sys, os, collections
R = sys.argv[1]
def P(*a): print(*a)
def cells(f):
    try: return json.load(open(f))["cells"]
    except Exception as e: return None
def key(f, pre):
    m = re.search(pre + r"-(\w+)-(\w+)-(bp\d+)-r(\d+)\.json$", f); return m.groups() if m else None
def load(c): return c.get("load")
P("== ab: retarget·40/80/120 (rules (a), (b))")
agg = collections.defaultdict(lambda: collections.Counter()); reds = []
for f in sorted(glob.glob(R + "/ab/w3rt-*.json")):
    k = key(f, "w3rt"); cs = cells(f)
    if not k or cs is None: P("unreadable", f); continue
    e, t, b, r = k
    for c in cs:
        if not c["cell"].startswith("retarget·") or "control" in c["cell"]: continue
        a = agg[(e, t, b)]; a["reads"] += 1
        sp = c.get("splice") or {}; st = c.get("stub") or {}
        a["splice"] += 1 if sp.get("spliceFrames") else 0; a["sliver"] += 1 if sp.get("sliverFrames") else 0; a["stub"] += 1 if st.get("stubFrames") else 0
        if not c.get("pass"): reds.append((e, t, b, r, c["cell"], c.get("failed"), (st.get("first") or {}), sp.get("firstSplice")))
for k in sorted(agg): P(k, dict(agg[k]))
for x in reds: P("   red", x)
P("== cr: content-remove (rule (c)); every gap")
for f in sorted(glob.glob(R + "/cr/w3cr-*.json")):
    k = key(f, "w3cr"); cs = cells(f)
    if not k or cs is None: P("unreadable", f); continue
    for c in cs:
        if c["cell"] != "content-remove": continue
        w = c.get("window") or {}; gap = None if w.get("close") is None or w.get("land") is None else round(w["close"] - w["land"], 1)
        F = w.get("frameMs"); late = gap is not None and F is not None and gap > 2 * F + 0.5
        P(k, "gap", gap, "F", F, "LATE" if late else "", "verdict", "PASS" if c.get("pass") else ("OWNER-BLOCKED" if c.get("ownerBlocked") else "FAIL"), "failed", c.get("failed"))
P("== rev: reversal (rule (d)); every stub read")
agg = collections.defaultdict(lambda: collections.Counter())
for f in sorted(glob.glob(R + "/rev/w3rev-*.json")):
    k = key(f, "w3rev"); cs = cells(f)
    if not k or cs is None: P("unreadable", f); continue
    e, t, b, r = k
    for c in cs:
        if c["cell"] != "reversal": continue
        st = c.get("stub") or {}; a = agg[(e, t, b)]; a["reads"] += 1
        if st.get("stubFrames"): a["stub"] += 1; fs = st.get("first") or {}; P("   STUB", k, "frames", st["stubFrames"], '"%s"' % fs.get("ch"), fs.get("label"), "painted", fs.get("frac"), "edge", fs.get("edgePx"), "px at +%s ms" % fs.get("atMs"), "ramp width", fs.get("edgeWidthPx"))
        if c.get("failed"): a["red:" + ",".join(c["failed"])] += 1
for k in sorted(agg): P(k, dict(agg[k]))
P("== swrev (beside the rows)")
agg = collections.defaultdict(lambda: collections.Counter())
for f in sorted(glob.glob(R + "/swrev/*.json")):
    m = re.search(r"/(bp\d+)-(\w+)-(\w+)-r(\d+)\.json$", f)
    if not m: continue
    b, e, t, r = m.groups()
    try: xs = json.load(open(f))
    except Exception: P("unreadable", f); continue
    for x in xs:
        a = agg[(e, t, b)]; a["reads"] += 1
        if x.get("error"): a["error"] += 1; continue
        sp = x.get("splice") or {}
        if sp.get("n"): a["splice"] += 1; P("   SPLICE", (e, t, b, r), "at", x["after"], "then", x["then"], sp.get("first"), "load", x.get("load"))
        if sp.get("sliver"): a["sliver"] += 1
        if x.get("stub") and not x["stub"].get("ok", True): a["stub"] += 1
        if x.get("blank") and not x["blank"].get("ok", True): a["blank"] += 1
for k in sorted(agg): P(k, dict(agg[k]))

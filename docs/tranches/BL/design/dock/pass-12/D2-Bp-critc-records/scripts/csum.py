# csum.py <records dir>: the completion critic's readings beside the rows (none a row). Sections:
#   si    the display-frame probe (pass-8 critic's slotink-crit.mjs): runs with an empty frame, lowest minInk, per build
#   fs    the constructed far side (slotink-axis.mjs): hole frames per build and sequence, with where
#   heir  heirprobe.mjs / fsheir.mjs: per sequence, armed, tied units and whether enter is taken or gated
#   cases CASES case·rotated / ·control verdicts per build
#   fmab  FM film·warm-expand / first-expand A/B: reads with a hole frame, runs > 1, per build (after fmxsum.py)
#   r2    W3 whole: the worst one-frame leaving drop (R2, bound 0.5) per run with its cell and seat; seat 8 warm-expand drop
# Reading only.
import glob, json, re, sys, os, collections
R = sys.argv[1]
def P(*a): print(*a)

P("== si: display-frame probe")
tot = collections.defaultdict(lambda: [0, 0]); low = {}
for f in sorted(glob.glob(R + "/si/*.json")):
    b, e, t = os.path.basename(f)[:-5].split("-")[:3]
    for x in json.load(open(f)):
        k = (b, e, t); tot[k][0] += 1; tot[k][1] += 1 if x.get("worstRun", 0) > 0 else 0
        if x.get("minInk") is not None and (k not in low or x["minInk"] < low[k][0]): low[k] = (x["minInk"], x["seq"], x["minAt"], x["load"])
for k in sorted(tot): P(k, "runs with an empty frame %d/%d" % (tot[k][1], tot[k][0]), "lowest minInk", low.get(k))

P("== fs: constructed far side")
for f in sorted(glob.glob(R + "/fs/*.json")):
    for x in json.load(open(f)):
        P(os.path.basename(f), x["seq"], "holeFrames", x["holeFrames"], "worstRun", x["worstRun"], "worstAt", x["worstAt"], "minInk", x["minInk"], "load", x["load"])

P("== heir")
for f in sorted(glob.glob(R + "/heir/*.json")):
    for x in json.load(open(f)):
        P(os.path.basename(f), x["seq"].ljust(22), "armed", x.get("armed"), "tied", [(a["m"], a["tied"], "enter" if a["enter"] else "-", "gated" if a["gated"] else "-", "de", a["de"]) for a in x.get("tied", []) if a.get("tied")])

P("== cases")
for f in sorted(glob.glob(R + "/cases/*.log")):
    for l in open(f, encoding="utf8"):
        m = re.match(r"^(PASS|FAIL|NOT-REPRODUCED|OWNER-BLOCKED)  CASES  [A-Za-z ]+  (case·[\w·]+) .*?largest one-frame seat move after the window closed ([\d.]+) px.*?\[load ([\d.]+)\]", l)
        if m: P(os.path.basename(f), m.group(2).ljust(22), m.group(1), "snap", m.group(3), "load", m.group(4))
        elif re.match(r"^(PASS|FAIL)  CASES  [A-Za-z ]+  case", l): P(os.path.basename(f), l[:200].rstrip())

P("== fmab: FM A/B")
agg = collections.defaultdict(list)
for f in sorted(glob.glob(R + "/fmab/fm-*.log")):
    e, t, b, k = re.search(r"fm-(\w+)-(\w+)-(bp\d+)-r(\d+)\.log", f).groups()
    for l in open(f, encoding="utf8"):
        m = re.match(r"^(PASS|FAIL|NOT-REPRODUCED)  FM  [A-Za-z ]+  (film·[\w-]+) ", l)
        if not m: continue
        h = re.search(r"(\d+) frame\(s\) with a hole, longest (\d+) consecutive", l); sm = re.search(r"seat (\d+) at ink ([\d.]+) at \+(\d+) ms", l)
        st = re.search(r"stub (\d+) stub frame", l); ld = re.search(r"\[load ([\d.]+)\]", l)
        hf = int(h.group(1)) if h else 0
        agg[(e, t, b, m.group(2))].append((int(k), m.group(1), hf, int(h.group(2)) if h else 0, sm.groups() if sm and hf else None, int(st.group(1)) if st else 0, float(ld.group(1)) if ld else None))
for key in sorted(agg):
    rs = sorted(agg[key]); hh = [r for r in rs if r[2] > 0]
    P(key, "reads", len(rs), "with a hole frame", len(hh), "run > 1", sum(1 for r in rs if r[3] > 1), "stub reads", sum(1 for r in rs if r[5]), "load", min(r[6] for r in rs), "-", max(r[6] for r in rs))
    for r in hh: P("   r%d" % r[0], r[1], "hole frames", r[2], "longest", r[3], "seat/ink/at", r[4], "load", r[6])

P("== r2: W3 whole, worst leaving drop per run")
for d in ("r2", "r2x"):
    for f in sorted(glob.glob(R + "/%s/w3-*.log" % d)):
        worst = None; s8 = []
        for l in open(f, encoding="utf8"):
            m = re.match(r"^(PASS|FAIL|NOT-REPRODUCED|OWNER-BLOCKED)  W3  [A-Za-z ]+  ([\w·-]+) ", l)
            v = re.search(r"vanish worst one-frame drop beyond the closing edge ([\d.]+) \(seat (\d+) [\d.]+ → [\d.]+ at \+([\d.]+) ms\)", l)
            ld = re.search(r"\[load ([\d.]+)\]", l)
            if not (m and v): continue
            x = (float(v.group(1)), m.group(2), int(v.group(2)), v.group(3), float(ld.group(1)) if ld else None)
            if worst is None or x[0] > worst[0]: worst = x
            if m.group(2) == "warm-expand" and x[2] == 8: s8.append(x[0])
        reds = [l[:160].rstrip() for l in open(f, encoding="utf8") if l.startswith("FAIL  W3  ") and "cells pass" not in l]
        P(d, os.path.basename(f), "worst", worst, "margin %.3f" % (0.5 - worst[0]) if worst else "", "seat8 warm-expand", s8, "reds", len(reds))
        for l in reds: P("    ", l)

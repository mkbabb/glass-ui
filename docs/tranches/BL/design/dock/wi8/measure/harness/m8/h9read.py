# h9read.py <logs-dir>: MEASURE-8 H9 (RU-80). RU-54's memory against its plant on cost8's 4x runs (five each, the dev
# server, the GPU lane): per cell, the run's Layout count and summed layout time, their spread over the five runs without
# the plant, and the plant's runs against that spread. "If layout counts and summed layout time match within run-to-run
# spread, the memory goes (S2)". Prints and writes logs/m8-h9.txt.
import sys, json, statistics as st
L = sys.argv[1]
a = json.load(open(f"{L}/m8-cost.h9-build.chromium.json"))
b = json.load(open(f"{L}/m8-cost.h9-fitmemory.chromium.json"))
out = []
cells = sorted({k.split("@")[0] for k in a if "@4x" in k})
verdicts = []
for c in cells:
    ra = [v for k, v in a.items() if k.startswith(c + "@4x")]
    rb = [v for k, v in b.items() if k.startswith(c + "@4x")]
    ca, cb = [r.get("layoutCount") for r in ra], [r.get("layoutCount") for r in rb]
    ta, tb = [r.get("layoutMsSum") for r in ra], [r.get("layoutMsSum") for r in rb]
    if None in ca + cb or None in ta + tb or not ca or not cb:
        out.append(f"{c}: unread (layoutCount or layoutMsSum missing)"); verdicts.append(None); continue
    # within the spread: the plant's median differs from the build's by no more than the build's own range over five runs
    within_c = abs(st.median(cb) - st.median(ca)) <= max(ca) - min(ca)
    within_t = abs(st.median(tb) - st.median(ta)) <= max(ta) - min(ta)
    trig_a = [sum(f["layouts"] for f in r.get("triggerFrames", [])) for r in ra]
    trig_b = [sum(f["layouts"] for f in r.get("triggerFrames", [])) for r in rb]
    out.append(f"{c}: Layout count without the memory's removal {sorted(ca)} (spread {max(ca) - min(ca)}), with it {sorted(cb)}; summed layout ms {sorted(ta)} (spread {max(ta) - min(ta):.3f}), with it {sorted(tb)}; trigger-frame layouts {sorted(trig_a)} against {sorted(trig_b)} -> count {'within' if within_c else 'OUTSIDE'} the spread, time {'within' if within_t else 'OUTSIDE'} it")
    verdicts.append(within_c and within_t)
res = "every cell within the spread: no layout saved by the memory; the memory goes (S2)" if verdicts and all(v is True for v in verdicts) else ("a cell outside the spread: the memory saves layouts there; it stays" if any(v is False for v in verdicts) else "unread")
out.append("RESULT: " + res)
txt = "\n".join(out); print(txt); open(f"{L}/m8-h9.txt", "w").write(txt + "\n")

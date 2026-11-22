#!/usr/bin/env python3
"""bitem.py: MEASURE-8 part M, each plant's judged lines per engine, from logs/pm-plant-<plant>.txt.
Counts the judge's lines (judge8, read6, seat4, g6c, g9b: every line after "-- judge" naming an engine) that FAIL and pass
per engine, and prints the first failing reason. The side cells' JSON lines (clock2, cells6, trig8, census8, ink8, cost8,
fit7, adds7, face8, level8, fold8b, mark8) are compared with the tip's reading by pm/bitesides.py; the unit lines are
printed as they are. Usage: bitem.py <logs-dir> [plant ...]"""
import glob, os, re, sys

logs = sys.argv[1]
names = sys.argv[2:] or sorted(os.path.basename(p)[9:-4] for p in glob.glob(os.path.join(logs, "pm-plant-*.txt")))
for p in names:
    f = os.path.join(logs, f"pm-plant-{p}.txt")
    if not os.path.exists(f):
        print(f"{p}: not read")
        continue
    t = open(f, errors="replace").read().split("\n")
    head = t[0]
    load = re.search(r"load \{ ([\d.]+)", head)
    flags = [s for s in t if re.search(r"site not on the tip|apply failed|TREE NOT CLEAN", s)]
    out = [f"{p} (load {load.group(1) if load else '?'})" + (f" [{'; '.join(flags)}]" if flags else "")]
    unit = [s.strip() for s in t if re.match(r"\s*(Tests |unit rc=)", s)]
    if unit:
        out.append("   unit: " + " | ".join(unit))
    if "-- judge" in t:
        j = t[t.index("-- judge") + 1:]
        for e in ("chromium", "webkit"):
            rows = [s for s in j if re.search(rf"\b{e}\b", s) and ("FAIL" in s or re.search(r"\bpass\b", s))]
            bad = [s for s in rows if "FAIL" in s]
            first = ""
            if bad:
                m = re.search(r"FAIL:?\s*(.*)", bad[0])
                first = (bad[0].split(" | ")[0] + ": " + (m.group(1) if m else ""))[:170]
            out.append(f"   {e}: {len(bad)} of {len(rows)} judged lines FAIL" + (f"; first {first}" if first else ""))
    print("\n".join(out))

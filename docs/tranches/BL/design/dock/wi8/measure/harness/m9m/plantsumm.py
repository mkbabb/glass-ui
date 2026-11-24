# plantsumm.py <logs-dir>: MEASURE-9 part M3. Prints each plant's reading per engine from the plant runners' logs
# (logs/m9m-plant-<p>.txt for the Chromium pass and the unit, logs/m9m-plant-<p>.webkit.txt for the WebKit pass;
# logs/m9m-g14plant-<p>.log and .webkit.log for the G-14 plants), so M3's table is written from one listing. For a
# plant log it keeps the applied line, the unit's summary and failures, each cell's JSON line (cut), and each judge
# line that says pass or FAIL; for a G-14 plant log, playwright's counts and its failing tests. It decides nothing:
# whether a plant bites is read against the tip's reading of the same clause, by hand, in M3.
import glob, os, re, sys
L = sys.argv[1]
def plant_lines(f):
    out = []
    for l in open(f, errors="replace"):
        l = l.rstrip()
        if not l: continue
        if l.startswith(("applied ", "-- ", "== ", "OK ", "reverted", "tree clean")) and not l.startswith("-- judge"):
            if l.startswith(("applied ", "-- judge")): out.append(l[:200])
            continue
        if re.search(r"Tests |✓|×|FAIL|pass|\"pass\"|rc=|bites|largest|op60|turn|outside|worst", l):
            out.append(l[:260])
    return out
def g14_lines(f):
    out = []
    for l in open(f, errors="replace"):
        l = l.rstrip()
        if re.search(r"^\s+\d+ (passed|failed|flaky|skipped)|✘|rc=", l): out.append(l.strip()[:220])
    return out
names = sorted({re.sub(r"\.webkit$", "", os.path.basename(f)[len("m9m-plant-"):-len(".txt")])
                for f in glob.glob(f"{L}/m9m-plant-*.txt")})
for p in names:
    print(f"=== {p}")
    for eng, f in (("chromium", f"{L}/m9m-plant-{p}.txt"), ("webkit", f"{L}/m9m-plant-{p}.webkit.txt")):
        if os.path.exists(f):
            print(f"  [{eng}]")
            for l in plant_lines(f): print("    " + l)
for f in sorted(glob.glob(f"{L}/m9m-g14plant-*.log")):
    print(f"=== {os.path.basename(f)}")
    for l in g14_lines(f): print("    " + l)

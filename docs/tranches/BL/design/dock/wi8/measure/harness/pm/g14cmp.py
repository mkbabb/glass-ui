# pm/g14cmp.py <logs-dir>: part M's G-14 (RU-66). m6/g14cmp.py's reading over part M's logs: the list reporter's lines
# from logs/pm-g14-{tip,master}-{chromium,webkit}-<spec>.log (the tip's archive tree against master's re-taken
# snapshot, aeb6f3ee7's tree), per project (chromium-headless-new, coarse-touch, webkit 2287): the tests that fail on
# the tip and pass on master (new), fail on both, pass only on the tip, and are not on master; then every new failure
# by spec, line and title. A retry that passes after a failure is flaky. The run-mark unit (master's tree and the tip's)
# is printed from its logs beside.
import re, sys, glob, os, collections
d = sys.argv[1]
LINE = re.compile(r"^\s+([✓✘-])\s+\d+\s+\[([^\]]+)\]\s+›\s+(\S+?):(\d+):\d+\s+›\s+(.*?)(?:\s+\(\d+(?:\.\d+)?m?s\))?\s*$")
def read(tag):
    out, line = {}, {}
    for f in sorted(glob.glob(f"{d}/pm-g14-{tag}-*-*.log")):
        if f.endswith("runmark.log"): continue
        for l in open(f, encoding="utf-8", errors="replace"):
            m = LINE.match(l)
            if not m: continue
            st, proj, fn, ln, title = m.groups()
            key = (proj, fn.split("/")[-1], title)
            prev = out.get(key)
            out[key] = "flaky" if prev == "fail" and st == "✓" else ("pass" if st == "✓" else "fail" if st == "✘" else "skip")
            line[key] = ln
    return out, line
t, tl = read("tip"); m, _ = read("master")
for f in sorted(glob.glob(f"{d}/pm-g14-*-*.log")):
    if f.endswith("runmark.log"): continue
    rc = [l.strip() for l in open(f, errors="replace") if l.startswith("rc=")]
    summ = [l.strip() for l in open(f, errors="replace") if re.match(r"^\s+\d+ (passed|failed|flaky|skipped|did not run)", l)]
    print(f"{os.path.basename(f)}: {' '.join(rc)}  {'; '.join(summ)}")
print()
for eng in ("chromium-headless-new", "coarse-touch", "webkit"):
    keys = [k for k in t if k[0] == eng]
    new = [k for k in keys if t[k] == "fail" and m.get(k) == "pass"]
    both = [k for k in keys if t[k] == "fail" and m.get(k) == "fail"]
    fixed = [k for k in keys if t[k] == "pass" and m.get(k) == "fail"]
    flaky = [k for k in keys if t[k] == "flaky"]
    unmatched = [k for k in keys if k not in m]
    print(f"{eng}: {len(keys)} tests on the tip ({sum(1 for k in m if k[0]==eng)} on master); new failures {len(new)}, failing on both {len(both)}, "
          f"passing only on the tip {len(fixed)}, flaky on the tip {len(flaky)}, not on master {len(unmatched)}")
    for k in sorted(new): print(f"    NEW  {k[1]}:{tl[k]}  {k[2][:150]}")
    for k in sorted(both): print(f"    both {k[1]}:{tl[k]}  {k[2][:150]}")
    for k in sorted(unmatched): print(f"    tip-only {t[k]} {k[1]}:{tl[k]}  {k[2][:120]}")
for f in sorted(glob.glob(f"{d}/pm-g14-*runmark*.log")) + sorted(glob.glob(f"{d}/pm-units*.log")):
    s = [l.strip() for l in open(f, errors="replace") if re.search(r"Tests\s+\d|Test Files|run-mark|rc=", l)]
    print(os.path.basename(f), " | ".join(s[:6]))

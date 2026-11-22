# g14cmp.py <s9 log> [<base log> ...]: the failures in an S item's G-14 log (playwright list reporter) against master's
# re-taken snapshot (logs/pm-g14-master-*.log) and the eighth tip's (logs/pm-g14-tip-*.log): each failure in the item's
# log is listed with whether master's and the tip's logs fail the same test in the same project.
import re, sys, glob, os
L = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "..", "logs")
pat = re.compile(r"^\s*(✘|✓|-)\s+\d+\s+\[([^\]]+)\]\s+›\s+(\S+?):(\d+):\d+\s+›\s+(.*?)(?:\s+\(\d[\d.]*m?s\))?\s*$")
def read(f):
    out = {}
    for ln in open(f, errors="replace"):
        m = pat.match(ln)
        if m:
            st, proj, spec, line, title = m.groups()
            key = (proj, os.path.basename(spec), title.strip())
            out[key] = "fail" if st == "✘" else ("pass" if st == "✓" else "skip")
    return out
item = read(sys.argv[1])
bases = sys.argv[2:] or sorted(glob.glob(os.path.join(L, "pm-g14-master-*.log")) + glob.glob(os.path.join(L, "pm-g14-tip-*.log")))
base = {}
for b in bases:
    tag = "master" if "master" in b else "tip8"
    for k, v in read(b).items():
        base.setdefault(k, {})[tag] = v
fails = [k for k, v in item.items() if v == "fail"]
print(f"{os.path.basename(sys.argv[1])}: {len(item)} results, {sum(v == 'pass' for v in item.values())} pass, {len(fails)} fail, {sum(v == 'skip' for v in item.values())} skip")
for k in fails:
    b = base.get(k, {})
    print(f"  FAIL {k[0]} {k[1]} {k[2][:110]} | master {b.get('master', '-')} tip8 {b.get('tip8', '-')}")

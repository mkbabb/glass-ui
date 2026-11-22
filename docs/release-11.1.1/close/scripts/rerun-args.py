# The 11.1.1 close: from a branch-only list (file<TAB>title per line), the spec files and one
# --grep regex matching each title's last segment, for one Playwright process per tree.
#   python3 -I rerun-args.py <list> files|grep
import re, sys
rows = [l.rstrip("\n").split("\t") for l in open(sys.argv[1]) if l.strip()]
if sys.argv[2] == "files":
    print("\n".join(sorted({f for f, _ in rows})))
else:
    leaves = sorted({t.split(" > ")[-1] for _, t in rows})
    print("|".join(re.escape(x).replace("/", "\\/") for x in leaves))

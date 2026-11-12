# 10.1.5 release close: branch failures against v10.1.4, by title set, per project.
#   python3 -I docs/release-10.1.5/scripts/close-compare.py <project> <branch-glob> <base-glob>
# Prints, for the spec files the v10.1.4 reports cover: SHARED (fails on both), BRANCH-ONLY
# (fails on the branch, passes or skips at v10.1.4), NO-TITLE (the title is not in v10.1.4's run).
import glob
import sys

sys.path.insert(0, __import__("os").path.dirname(__file__))
from importlib import util

spec = util.spec_from_file_location("cs", __import__("os").path.join(sys.path[0], "close-summary.py"))
proj, bglob, vglob = sys.argv[1:4]
src = open(spec.origin).read().split("mode, paths")[0]
ns = {}
exec(src, ns)
rows = ns["rows"]
b = [r for r in rows(sorted(glob.glob(bglob))) if r[0] == proj]
v = [r for r in rows(sorted(glob.glob(vglob))) if r[0] == proj]
vfiles = {r[1] for r in v}
vstat = {}
for r in v:
    vstat.setdefault((r[1], r[2]), set()).add(r[3])
bad = ("unexpected", "flaky")
bf = sorted({(r[1], r[2]) for r in b if r[3] in bad and r[1] in vfiles})
shared = [k for k in bf if k in vstat and vstat[k] & set(bad)]
only = [k for k in bf if k in vstat and not (vstat[k] & set(bad))]
none = [k for k in bf if k not in vstat]
print(f"{proj}: branch fails in covered files {len(bf)}, shared {len(shared)}, branch-only {len(only)}, no-title {len(none)}")
for k in only:
    print("BRANCH-ONLY\t" + "\t".join(k) + "\tv10.1.4=" + ",".join(sorted(vstat[k])))
for k in none:
    print("NO-TITLE\t" + "\t".join(k))

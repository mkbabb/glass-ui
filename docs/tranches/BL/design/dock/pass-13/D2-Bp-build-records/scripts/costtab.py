# costtab.py <cost dir>: pass-12's cost table: per 4x row, each build's rounds as over25/dtMax (mainTaskMsPerFrame; load)
import json, glob, re, sys, collections
D = sys.argv[1]; rows = collections.defaultdict(lambda: collections.defaultdict(list)); over = collections.Counter()
for f in sorted(glob.glob(D + "/cost-*-chromium-r*.json")):
    b, r = re.search(r"cost-(\w+)-chromium-r(\d+)\.json", f).groups()
    for c in json.load(open(f))["cells"]:
        if c.get("throttle") != 4: continue
        k = "4x %s %s" % (c["seats"], c["mode"])
        rows[k][b].append("r%s %d/%s (%s; %s)" % (r, c["over25ms"], c["dtMax"], c["trace"]["mainTaskMsPerFrame"], c.get("load")))
        if c["seats"] in (20, 40): over[b] += c["over25ms"]
for k in sorted(rows, key=lambda s: (s.split()[2], int(s.split()[1]))):
    print(k)
    for b in ("bp12", "bp13", "fv5"):
        if b in rows[k]: print("  %-5s" % b, " · ".join(rows[k][b]))
print("frames over 25 ms, the 4x 20/40 rows:", json.dumps(dict(over)))

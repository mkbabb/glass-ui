# Fix seat 6: per Playwright WebKit process in a sample file, when it was first and last
# seen, its CPU while alive, against each test's start and end from the report and
# whether that test's films stalled.   procs.py <sample> <report>
import json, base64, sys, datetime, collections
samples = collections.defaultdict(list)
for line in open(sys.argv[1]):
    t, pid, ppid, cpu, et, path = line.split(None, 5)
    if "webkit" not in path.lower() and "Playwright" not in path: continue
    samples[(pid, path.strip().rsplit("/", 1)[-1])].append((float(t), float(cpu)))
r = json.load(open(sys.argv[2]))
tests = []
def walk(s):
    for sp in s.get("specs", []):
        for t in sp["tests"]:
            for res in t["results"]:
                st = datetime.datetime.fromisoformat(res["startTime"].replace("Z", "+00:00")).timestamp()
                films = [json.loads(base64.b64decode(a["body"])) for a in res.get("attachments", []) if "body" in a and a["name"] in ("unread", "turn")]
                tests.append((st, st + res["duration"] / 1000, sp["title"][10:50], max((f["hole"] for f in films), default=0)))
    for c in s.get("suites", []): walk(c)
for s in r["suites"]: walk(s)
tests.sort()
t0 = tests[0][0]
print("tests:")
for a, b, n, h in tests: print(f"  {a - t0:7.1f} {b - t0:7.1f} hole={h:3d} {n}")
print("processes:")
for (pid, name), v in sorted(samples.items(), key=lambda kv: kv[1][0][0]):
    busy = [round(t - t0) for t, c in v if c > 20]
    print(f"  {pid:>6} {name[:36]:36s} {v[0][0] - t0:7.1f} {v[-1][0] - t0:7.1f} maxcpu={max(c for _, c in v):5.1f} busy-at={busy[:12]}")

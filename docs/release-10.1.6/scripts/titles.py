# 10.1.6 close: every title that fails in a branch report, set against the v10.1.5 close's
# title sets (the re-close reports for the release specs, the suite reports and
# branch-fails.tsv for the rest). A failing title that passed on v10.1.5 is a regression.
#   python3 -I docs/release-10.1.6/scripts/titles.py <report.json>...
import glob, gzip, json, os, sys

WT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
C = os.path.join(WT, "docs/release-10.1.5/close")


def load(p):
    with (gzip.open(p, "rt") if p.endswith(".gz") else open(p)) as f:
        return json.load(f)


def rows(report):
    out = []

    def walk(s, path):
        t = path + ([s["title"]] if s.get("title") and not s["title"].endswith(".spec.ts") else [])
        for sp in s.get("specs", []):
            for te in sp["tests"]:
                st = [r["status"] for r in te["results"]]
                ok = te["status"] in ("expected", "flaky") or (st and st[-1] == "passed")
                skip = te["status"] == "skipped"
                out.append((te["projectName"], os.path.basename(sp["file"]), " > ".join(t + [sp["title"]]),
                            "skip" if skip else ("pass" if ok else "fail")))
        for c in s.get("suites", []):
            walk(c, t)

    for s in report["suites"]:
        walk(s, [])
    return out


base = {}
for p in glob.glob(f"{C}/reclose/*.json.gz") + glob.glob(f"{C}/suite/branch-*.json.gz"):
    try:
        for proj, f, t, s in rows(load(p)):
            k = (proj, f, t)
            if s == "pass" or k not in base:
                base[k] = s
    except Exception as e:
        print("skip", p, e, file=sys.stderr)
fails15 = set()
for line in open(f"{C}/suite/branch-fails.tsv"):
    p = line.rstrip("\n").split("\t")
    if len(p) >= 3:
        fails15.add((p[0], p[1], p[2]))

total = {"pass": 0, "fail": 0, "skip": 0}
reg = []
for rp in sys.argv[1:]:
    for proj, f, t, s in rows(load(rp)):
        total[s] += 1
        if s != "fail":
            continue
        k = (proj, f, t)
        was = base.get(k, "fail" if k in fails15 else "absent")
        if k in fails15 and was != "pass":
            was = "fail"
        print(f"{os.path.basename(rp)}\t{proj}\t{f}\t{t}\tv10.1.5={was}")
        if was != "fail":
            reg.append(k)
print(f"# totals {total}; failing titles that did not fail on v10.1.5: {len(reg)}")

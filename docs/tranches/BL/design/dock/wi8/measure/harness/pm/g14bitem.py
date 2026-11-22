#!/usr/bin/env python3
"""g14bitem.py: MEASURE-8 part M, G-14's restated groups in each of the three projects. Reads each group's plant log
(logs/pm-g14plant-<group>.log, pm/g14plantrun.sh) against the tip's own G-14 run of the same specs
(logs/pm-g14-tip-*.log). A test is keyed by project, spec, line and title; it passes when any attempt passed. A group bites
in a project when a test of its sites fails under the plant and passes on the tip. Writes logs/pm-g14bite.txt."""
import glob, os, re

H = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
L = os.path.join(H, "..", "logs")
ROW = re.compile(r"^\s+(✓|✘|-)\s+\d+\s+\[([\w-]+)\]\s+›\s+tests-visual/([\w.-]+\.spec\.ts):(\d+):\d+\s+›\s+(.*?)(?:\s+\((?:retry #\d+\)\s*\()?[\d.]+m?s\))?\s*$")
PROJ = ("chromium-headless-new", "coarse-touch", "webkit")


def read(paths):
    out = {}
    for p in paths:
        for line in open(p, encoding="utf-8", errors="replace"):
            m = ROW.match(line)
            if not m:
                continue
            mark, proj, spec, ln, title = m.groups()
            title = re.sub(r"\s+\(retry #\d+\)$", "", title)
            k = (proj, spec, int(ln), title)
            st = {"✓": "pass", "✘": "fail", "-": "skip"}[mark]
            if out.get(k) == "pass":
                continue
            out[k] = st if st != "skip" or k not in out else out[k]
    return out


tip = read(sorted(glob.glob(os.path.join(L, "pm-g14-tip-*.log"))))
lines = [f"G-14's restated groups on the tip 575084358, three projects: each plant's sites against the tip's own G-14 run ({len(tip)} tests read there)"]
table = {}
for g in ["corner", "clock", "lane", "reserve", "touch", "press", "cap", "fits", "zoom"]:
    p = os.path.join(L, f"pm-g14plant-{g}.log")
    if not os.path.exists(p):
        lines.append(f"{g}: not run")
        continue
    txt = open(p, encoding="utf-8", errors="replace").read()
    plant = read([p])
    note = []
    if re.search(r"^\[guarded\] REFUSED", txt, re.M):
        note.append("guarded refused a run")
    if "TREE NOT CLEAN" in txt:
        note.append("TREE NOT CLEAN")
    if "apply failed" in txt:
        note.append("the plant did not apply")
    for pr in PROJ:
        mine = {k: v for k, v in plant.items() if k[0] == pr}
        fail = [k for k, v in mine.items() if v == "fail"]
        bites = [k for k in fail if tip.get(k) == "pass"]
        both = [k for k in fail if tip.get(k) == "fail"]
        unread = [k for k in fail if k not in tip]
        verdict = "bites" if bites else ("does not bite" if mine else "no test read")
        table[(g, pr)] = (verdict, len(bites), len(mine), len(both))
        lines.append(f"{g} [{pr}]: {verdict}: {len(mine)} tests, {len(fail)} fail under the plant ({len(bites)} pass on the tip, {len(both)} fail on the tip too, {len(unread)} not in the tip's run)" + (f"; {'; '.join(note)}" if note else ""))
        for k in bites[:3]:
            lines.append(f"    bites  {k[1]}:{k[2]} {k[3][:100]}")
lines.append("")
for pr in PROJ:
    b = [g for (g, q), v in table.items() if q == pr and v[0] == "bites"]
    lines.append(f"{pr}: {len(b)} of 9 groups bite ({', '.join(b)})")
open(os.path.join(L, "pm-g14bite.txt"), "w").write("\n".join(lines) + "\n")
print("\n".join(lines))

# g14bite8.py: MEASURE-8 H4 (RU-81), G-14's restated groups in WebKit 2287. Reads each group's plant log
# (logs/m8-g14plant-<group>.log, m8/g14plantrun8.sh) against the build's own WebKit run of the same specs on 943fe6e9d
# (logs/m5-g14-m7p-webkit-{a,b}-release-*.log). A test is keyed by spec, line and title; it passes when any attempt
# passed. A group bites in WebKit when a test of its sites fails under the plant and passes on the build.
# Writes logs/m8-g14bite.txt.
import glob, os, re
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
L = os.path.join(H, "..", "logs")
ROW = re.compile(r"^\s+(✓|✘|-)\s+\d+\s+\[webkit\]\s+›\s+tests-visual/([\w.-]+\.spec\.ts):(\d+):\d+\s+›\s+(.*?)(?:\s+\((?:retry #\d+\)\s*\()?[\d.]+m?s\))?\s*$")

def read(paths):
    out = {}
    for p in paths:
        for line in open(p, encoding="utf-8", errors="replace"):
            m = ROW.match(line)
            if not m: continue
            mark, spec, ln, title = m.groups()
            title = re.sub(r"\s+\(retry #\d+\)$", "", title)
            k = (spec, int(ln), title)
            st = {"✓": "pass", "✘": "fail", "-": "skip"}[mark]
            if out.get(k) == "pass": continue
            out[k] = st if st != "skip" or k not in out else out[k]
    return out

build = read(sorted(glob.glob(os.path.join(L, "m5-g14-m7p-webkit-[ab]-release-*.log"))))
lines = [f"G-14's restated groups in WebKit 2287: each plant's sites against the build's WebKit run on 943fe6e9d ({len(build)} tests read there, {sum(v == 'fail' for v in build.values())} failing)"]
bit = []
for g in ["corner", "clock", "lane", "reserve", "touch", "press", "cap", "fits", "zoom"]:
    p = os.path.join(L, f"m8-g14plant-{g}.log")
    if not os.path.exists(p):
        lines.append(f"{g}: not run"); continue
    txt = open(p, encoding="utf-8", errors="replace").read()
    plant = read([p])
    fail = [k for k, v in plant.items() if v == "fail"]
    bites = [k for k in fail if build.get(k) == "pass"]
    both = [k for k in fail if build.get(k) == "fail"]
    unread = [k for k in fail if k not in build]
    passed = [k for k, v in plant.items() if v == "pass"]
    note = []
    if "refus" in txt.lower(): note.append("guarded refused a run")
    if "SOURCE NOT CLEAN" in txt: note.append("SOURCE NOT CLEAN")
    if "apply failed" in txt: note.append("the plant did not apply")
    verdict = "bites" if bites else ("does not bite" if plant else "no test read")
    if bites: bit.append(g)
    lines.append(f"{g}: {verdict} in WebKit: {len(plant)} tests, {len(fail)} fail under the plant ({len(bites)} of them pass on the build, {len(both)} fail on the build too, {len(unread)} not in the build's run), {len(passed)} pass" + (f"; {'; '.join(note)}" if note else ""))
    for k in bites[:6]:
        lines.append(f"    bites  {k[0]}:{k[1]} {k[2][:110]}")
    for k in both[:4]:
        lines.append(f"    both   {k[0]}:{k[1]} {k[2][:110]}")
lines.append(f"groups that bite in WebKit: {len(bit)} of 9 ({', '.join(bit)})")
open(os.path.join(L, "m8-g14bite.txt"), "w").write("\n".join(lines) + "\n")
print("\n".join(lines))

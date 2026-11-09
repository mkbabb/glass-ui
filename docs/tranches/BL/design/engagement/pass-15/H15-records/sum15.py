#!/usr/bin/env python3
# H15 · E-15's self-test on builds: one table per engine (cell × build: P pass, F fail, U unmeasured, R report), then each cell's
# expectation from S15 (as folded) and the registry (§P14c-5, §S15-FOLD): `ref` builds must PASS, `plant` builds must FAIL, `read` means
# no build is named yet (the reference is named cell by cell from this read, §P14c-4 class 4). OK = every stated expectation met.
#   python3 -I sum15.py <logs-dir> <engine> [--md]
import re, sys, glob, os
D, ENG = sys.argv[1], sys.argv[2]
BUILDS = ["cand14", "cand13", "cand12", "head"]
# (pattern on the cell name, ref builds, plant builds, note)
EXP = [
  (r"^M28 under G's zoom", [], [], "REPORT: S15-b (i)'s limit"),
  (r"^M28 a 2 px .* (of the card|above the card) .* C: translate sine", ["cand12"], ["cand14"], "B2's cells: reference cand12 (0 glides); plant paintabove = cand14"),
  (r"^M28 .* (of the card|above the card)", ["cand12"], [], "S15-a's reference cand12; cand14 read"),
  (r"^M28 .* inside the card", ["cand14", "cand12"], [], "control: a level below the transformed link"),
  (r"^F5 .*\(control\)", ["cand14", "cand13", "cand12"], [], "control: the step inside the card"),
  (r"^F5 ", [], [], "glideonce is a build of S15 (part B); no build is named: read"),
  (r"^F3 .*\(control", ["cand14"], [], "control: no 3D context"),
  (r"^F3 ", [], [], "plant flat3d is a build of S15 (part B); read"),
  (r"^F10 a train of .* every frame", ["cand12", "cand13"], ["cand14"], "B1: cand12, cand13 superpose; cand14 (no ceiling) the plant"),
  (r"^F10 a train of .* every second frame", ["cand14", "cand13", "cand12"], [], "every second frame: exact on every stage"),
  (r"^F10 a 2 px a frame margin ramp", ["cand14", "cand12"], [], "the carried control"),
  (r"^F10 a Disclosure", [], [], "REPORT"),
  (r"^M22 the root's own zoom 1 → (1\.5|0\.75) \(B3\)", ["cand12"], ["cand14"], "B3: cand12 the reference, cand14 the plant"),
  (r"^M22 the root's own zoom 1 → 1\.25 \(A5", ["cand12"], ["cand14"], "A5's host cell on its edge (class 3): cand12 0.15, cand14 2.65"),
  (r"^M22 the root's own height", ["cand14", "cand12"], [], "B3's control"),
  (r"^M22 the root's own zoom 1 → 1\.5 under C", [], ["cand14"], "F-8: pointcentre = cand14's centre step"),
  (r"^M22 the root's own zoom 1 → 2", [], [], "read"),
  (r"^M22 G's zoom", ["cand14", "cand13"], ["cand12"], "A5's G cells: cand14 the reference, cand12 the plant of record"),
  (r"^M22 X8", [], [], "X8's grid: read (zoomchain is a build of S15)"),
  (r"^M9 ", ["cand14"], [], "S15-c: the after-step read decides; cand14 the reference"),
  (r"^M16b", [], [], "REPORT"),
  (r"^D8 .*4cqi", ["cand14"], ["cand13"], "row 2: the root read passes; hostgutter = cand13's host read"),
  (r"^D8 .*2rem \(the library", ["cand14", "cand13", "cand12"], [], "the library's default"),
  (r"^D8 .*2em on :root, host 14", [], ["cand13"], "row 1: CK-21's open question (root read −1.20); hostgutter = cand13"),
  (r"^D8 ", [], [], "read"),
  (r"^A1 .*\(control", ["cand14", "cand13"], [], "control: below the transform"),
  (r"^A1 .*starts after the hold", [], [], "the closed carrier after the hold: read"),
  (r"^A1 ", ["cand13"], ["cand14"], "ca14 A1: cand13 the reference, cand14 the plant (noflat / nodetect)"),
  (r"^A2 .*\(control\)", ["cand14", "cand13"], [], "controls"),
  (r"^A2 .*translate(Y)?\(-50%(, -50%)?\), origin (0 0|top center)", ["cand13"], ["cand14"], "ca14 A2: cand13 the reference, cand14 the plant (inlinepct)"),
  (r"^A2 ", [], [], "read"),
  (r"^A3 .*block in flow \(start\), a 10 px", ["cand14", "cand12"], [], "control: outside the band"),
  (r"^A3 .* a 20 px insert .* · block in flow \(start\)$", ["cand12"], ["cand14"], "ca14 A3: cand12 the reference, cand14 the plant (leastmoved)"),
  (r"^A3 ", [], [], "X5's rows and the unread forms: read"),
  (r"^A12 .*absolute", [], [], "REPORT: a level change"),
  (r"^A12 ", ["cand12", "cand13"], ["cand14"], "ca14 A12: cand12, cand13 the references, cand14 the plant (insetlevel)"),
  (r"^EXIT .*0\.21s", ["cand14", "cand13", "cand12"], [], "control: the library's settle"),
  (r"^EXIT .*0\.08s", [], ["cand14"], "dockexit = cand14"),
  (r"^COST", [], [], "REPORT"),
]
def latest(b):
  fs = sorted(glob.glob(os.path.join(D, f"{b}-e15-{ENG}*.log")), key=os.path.getmtime)
  # whole-battery reads only: the header's argument field is empty (a stage with arguments, e.g. --only, is a development read)
  fs = [f for f in fs if re.match(r"^# H15 \S+ \S+ · .* · harness [0-9a-f]{12} · $", open(f, encoding="utf8").readline().rstrip("\n"))]
  return fs[-1] if fs else None
rows, order, src = {}, [], {}
for b in BUILDS:
  f = latest(b); src[b] = os.path.basename(f) if f else "—"
  if not f: continue
  for l in open(f, encoding="utf8"):
    m = re.match(r"^\s+(PASS|FAIL|UNMEASURED|REPORT)\s+(.*?) · ", l)
    if not m: continue
    v, name = m.group(1), m.group(2)
    # the cell name is the text up to the first grade clause; keep the leading descriptor (the part before " · the " / " · glides")
    key = re.split(r" · (the act on|glides \d|the root's|the train's|the card moved|rest \d|width |moved |on the insert|engaged |top: |the engine keeps)", l.split(v, 1)[1].strip())[0]
    key = re.sub(r" · drive [^·]*", "", key); key = re.split(r" · (NOT DRIVEN|NOT READ|read \d repeated)", key)[0].strip()
    if key not in rows: rows[key] = {}; order.append(key)
    rows[key][b] = v[0]
bad, ok, n = [], 0, 0
out = []
for k in order:
  e = next((x for x in EXP if re.search(x[0], k)), None); r = rows[k]
  exp = "" if not e else ("ref " + ",".join(e[1]) if e[1] else "") + (" · plant " + ",".join(e[2]) if e[2] else "") or "read"
  miss = []
  if e:
    for b in e[1]:
      if r.get(b) != "P": miss.append(f"ref {b} {r.get(b, 'absent')}")
    for b in e[2]:
      if r.get(b) != "F": miss.append(f"plant {b} {r.get(b, 'absent')}")
    if e[1] or e[2]: n += 1; ok += 0 if miss else 1
  if miss: bad.append((k, miss))
  out.append(f"| {k[:150]} | " + " | ".join(r.get(b, "·") for b in BUILDS) + f" | {exp or 'read'} | {'OK' if not miss else 'NOT MET: ' + '; '.join(miss)} |")
print(f"# E-15 {ENG} · logs: " + ", ".join(f"{b} {src[b]}" for b in BUILDS))
print("| cell | " + " | ".join(BUILDS) + " | expectation | self-test |"); print("|---|" + "---|" * (len(BUILDS) + 2))
print("\n".join(out))
tot = {b: {c: sum(1 for k in order if rows[k].get(b) == c) for c in "PFUR"} for b in BUILDS}
print("\n" + " · ".join(f"{b} {t['P']}/{t['F']}/{t['U']} R{t['R']}" for b, t in tot.items()))
print(f"cells with a stated expectation: {n}; met {ok}; not met {n - ok}")
for k, m in bad: print(f"  NOT MET · {k[:140]} · {'; '.join(m)}")

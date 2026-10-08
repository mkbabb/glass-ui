#!/usr/bin/env python3
# Reads logs/selftest-<id>.log and prints, per witness and engine, the clean tally and every plant's tally
# (gating cells passed / measured on the fixture), the verdict (OK or BROKEN) and the load at start and end.
#   python3 -I selftest-table.py [--first]    (--first also prints each H3 plant's first planted FAIL line)
import re, sys, pathlib
here = pathlib.Path(__file__).parent / "logs"
H3 = {"stall", "navcap", "t8-migrated", "t2-stack", "t2-cut", "t2-named", "t2-mountonly", "canon-a", "canon-s", "canon-h",
      "t6-faint", "t6-rung", "t6-prt", "t3-cv", "t4-forced", "t6-calm", "t5-retired", "t3-migstate", "t5-consumer"}
first = "--first" in sys.argv
rows, firsts = [], []
for wid in ["T-1", "T-2", "T-3", "T-4", "T-5", "T-6", "T-7", "T-8", "W-A", "W-B", "W-C", "W-D", "W-E", "CANON"]:
    f = here / f"selftest-{wid}.log"
    if not f.exists():
        rows.append(f"| {wid} | — | not run | | |"); continue
    lines = f.read_text().splitlines()
    loads = [re.search(r"load \{ ([\d. ]+) \}", l).group(1).split()[0] for l in lines if re.search(r"load \{", l)]
    per = {}
    last = None
    for l in lines:
        m = re.match(r"^(OK|BROKEN)\s+\S+\s+(\w+)\s+(clean|fault|control)\s*([\w-]*)", l)
        if m:
            ok, eng, kind, name = m.groups()
            name = "clean" if kind == "clean" else name
            t = re.search(r"· \S+ (PASS|FAIL) · (\d+/\d+) gating", l)
            err = "HARNESS ERROR" in l
            tally = t.group(2) if t else ("exit 2, named" if err else "?")
            mark = "" if ok == "OK" else " **BROKEN**"
            per.setdefault(eng, []).append(f"{'`' + name + '`' if name != 'clean' else 'clean'}{' (H3)' if name in H3 else ''} {tally}{mark}")
            last = (eng, name)
        elif first and last and last[1] in H3 and l.strip().startswith("first planted FAIL:"):
            firsts.append(f"- {wid} {last[0]} `{last[1]}`: {l.strip()[len('first planted FAIL: '):][:260]}")
    verdict = next((l for l in lines if l.startswith("selftest:")), "selftest: (no summary)")
    for eng, cells in per.items():
        rows.append(f"| {wid} | {'Playwright WebKit' if eng == 'webkit' else 'Chromium' if eng == 'chromium' else 'both (one run)'} | {'; '.join(cells)} | {verdict.replace('selftest: ', '')} | {loads[0] if loads else '?'} → {loads[-1] if loads else '?'} |")
print("| witness | engine | clean and plants (gating cells pass / measured) | log verdict | 1-min load start → end |")
print("|---|---|---|---|---|")
print("\n".join(rows))
if first:
    print()
    print("\n".join(firsts))
